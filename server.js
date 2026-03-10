const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const WEATHER_APP_USER_AGENT = "WeatherApp/1.0 github.com/example/weather-app";

// Demonstrate loading env variables with dotenv
if (process.env.WEATHER_API_KEY) {
  console.log("WEATHER_API_KEY loaded from .env file successfully.");
} else {
  console.log("No WEATHER_API_KEY found in .env (not required right now).");
}

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Step 1: Geocode city name to coordinates using Nominatim
async function getCoordinates(city) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1&addressdetails=1`;
  const response = await fetch(url, {
    headers: { "User-Agent": WEATHER_APP_USER_AGENT },
  });
  const data = await response.json();

  if (!data || data.length === 0) return null;

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    name: data[0].display_name.split(",")[0],
    country: data[0].address?.country || "",
  };
}

function getClosestTimeseries(timeseries) {
  const now = Date.now();

  return timeseries.reduce((closestEntry, currentEntry) => {
    const currentDistance = Math.abs(
      new Date(currentEntry.time).getTime() - now,
    );
    const closestDistance = Math.abs(
      new Date(closestEntry.time).getTime() - now,
    );

    return currentDistance < closestDistance ? currentEntry : closestEntry;
  }, timeseries[0]);
}

function calculateFeelsLike(tempCelsius, humidity, windSpeedMps) {
  const vaporPressure =
    (humidity / 100) *
    6.105 *
    Math.exp((17.27 * tempCelsius) / (237.7 + tempCelsius));

  return tempCelsius + 0.33 * vaporPressure - 0.7 * windSpeedMps - 4;
}

function getWeatherPresentation(symbolCode = "") {
  const normalized = symbolCode.replace(/_(day|night|polartwilight)$/, "");

  if (normalized.includes("thunder")) {
    return { weather_code: 95, description: "Thunderstorm" };
  }

  if (normalized.includes("heavysnowshowers")) {
    return { weather_code: 86, description: "Heavy snow showers" };
  }

  if (normalized.includes("snowshowers")) {
    return { weather_code: 85, description: "Snow showers" };
  }

  if (normalized.includes("heavyrainshowers")) {
    return { weather_code: 82, description: "Heavy rain showers" };
  }

  if (normalized.includes("rainshowers")) {
    return { weather_code: 80, description: "Rain showers" };
  }

  if (normalized.includes("heavysnow")) {
    return { weather_code: 75, description: "Heavy snow" };
  }

  if (normalized.includes("lightsnow")) {
    return { weather_code: 71, description: "Light snow" };
  }

  if (normalized.includes("snow")) {
    return { weather_code: 73, description: "Snow" };
  }

  if (normalized.includes("heavyrain")) {
    return { weather_code: 65, description: "Heavy rain" };
  }

  if (normalized.includes("lightrain")) {
    return { weather_code: 61, description: "Light rain" };
  }

  if (normalized.includes("rain")) {
    return { weather_code: 63, description: "Rain" };
  }

  if (normalized.includes("sleet")) {
    return { weather_code: 61, description: "Sleet" };
  }

  if (normalized === "fog") {
    return { weather_code: 45, description: "Foggy" };
  }

  if (normalized === "cloudy") {
    return { weather_code: 3, description: "Overcast" };
  }

  if (normalized === "partlycloudy") {
    return { weather_code: 2, description: "Partly cloudy" };
  }

  if (normalized === "fair") {
    return { weather_code: 1, description: "Mainly clear" };
  }

  if (normalized === "clearsky") {
    return { weather_code: 0, description: "Clear sky" };
  }

  return { weather_code: 0, description: "Clear sky" };
}

// API endpoint: get weather by city name
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    // Geocode city to coordinates
    const coords = await getCoordinates(city);
    if (!coords) {
      return res.status(404).json({ error: "City not found" });
    }

    // Fetch weather from MET Norway (free, no API key needed)
    const weatherUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coords.lat}&lon=${coords.lon}`;
    const response = await fetch(weatherUrl, {
      headers: { "User-Agent": WEATHER_APP_USER_AGENT },
    });
    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch weather data" });
    }

    const timeseries = data.properties?.timeseries || [];

    if (timeseries.length === 0) {
      return res.status(502).json({ error: "No weather data available" });
    }

    const currentEntry = getClosestTimeseries(timeseries);
    const current = currentEntry.data.instant.details;
    const summary =
      currentEntry.data.next_1_hours?.summary ||
      currentEntry.data.next_6_hours?.summary ||
      currentEntry.data.next_12_hours?.summary;
    const weather = getWeatherPresentation(summary?.symbol_code);
    const windSpeedMps = current.wind_speed ?? 0;

    // Return clean weather data to the frontend
    res.json({
      city: coords.name,
      country: coords.country,
      temperature: Math.round(current.air_temperature),
      feels_like: Math.round(
        calculateFeelsLike(
          current.air_temperature,
          current.relative_humidity,
          windSpeedMps,
        ),
      ),
      humidity: Math.round(current.relative_humidity),
      pressure: Math.round(current.air_pressure_at_sea_level),
      wind_speed: Math.round(windSpeedMps * 3.6),
      weather_code: weather.weather_code,
      description: weather.description,
      observed_at: currentEntry.time,
    });
  } catch (error) {
    console.error("Weather API error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch weather data. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Weather app server running at http://localhost:${PORT}`);
});
