// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherContent = document.getElementById("weatherContent");
const errorMessage = document.getElementById("errorMessage");
const loadingSpinner = document.getElementById("loadingSpinner");

// Event Listeners
searchBtn.addEventListener("click", searchCity);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchCity();
});

// Search City and Fetch Weather
async function searchCity() {
  const city = searchInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  showLoading(true);
  hideError();

  try {
    // Get coordinates from city name
    const coordinates = await getCoordinates(city);

    if (!coordinates) {
      showError("City not found. Please try another city.");
      showLoading(false);
      return;
    }

    // Fetch weather data
    const weatherData = await getWeatherData(
      coordinates.lat,
      coordinates.lon,
      city,
    );
    displayWeather(weatherData, coordinates);
    updateBackground(weatherData);
  } catch (error) {
    showError("Error fetching weather data. Please try again.");
    console.error("Error:", error);
  } finally {
    showLoading(false);
  }
}

// Get coordinates from city name using Nominatim API
async function getCoordinates(city) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`,
    );
    const data = await response.json();

    if (data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      name: data[0].display_name.split(",")[0],
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

// Get weather data from Open-Meteo API
async function getWeatherData(lat, lon, city) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&timezone=auto`,
    );
    const data = await response.json();

    return {
      city: city,
      current: data.current,
      timezone: data.timezone,
    };
  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
}

// Convert WMO weather code to description and icon
function getWeatherInfo(weatherCode) {
  const weatherCodes = {
    0: { desc: "Clear Sky", icon: "☀️", code: "clear-day" },
    1: { desc: "Mainly Clear", icon: "🌤️", code: "clear-day" },
    2: { desc: "Partly Cloudy", icon: "⛅", code: "cloudy-day" },
    3: { desc: "Overcast", icon: "☁️", code: "cloudy-day" },
    45: { desc: "Foggy", icon: "🌫️", code: "cloudy-day" },
    48: { desc: "Foggy", icon: "🌫️", code: "cloudy-day" },
    51: { desc: "Light Drizzle", icon: "🌧️", code: "rainy-day" },
    53: { desc: "Moderate Drizzle", icon: "🌧️", code: "rainy-day" },
    55: { desc: "Dense Drizzle", icon: "🌧️", code: "rainy-day" },
    61: { desc: "Slight Rain", icon: "🌧️", code: "rainy-day" },
    63: { desc: "Moderate Rain", icon: "🌧️", code: "rainy-day" },
    65: { desc: "Heavy Rain", icon: "⛈️", code: "stormy" },
    71: { desc: "Slight Snow", icon: "❄️", code: "snowy-day" },
    73: { desc: "Moderate Snow", icon: "❄️", code: "snowy-day" },
    75: { desc: "Heavy Snow", icon: "❄️", code: "snowy-day" },
    77: { desc: "Snow Grains", icon: "❄️", code: "snowy-day" },
    80: { desc: "Slight Rain Showers", icon: "🌧️", code: "rainy-day" },
    81: { desc: "Moderate Rain Showers", icon: "🌧️", code: "rainy-day" },
    82: { desc: "Violent Rain Showers", icon: "⛈️", code: "stormy" },
    85: { desc: "Slight Snow Showers", icon: "❄️", code: "snowy-day" },
    86: { desc: "Heavy Snow Showers", icon: "❄️", code: "snowy-day" },
    95: { desc: "Thunderstorm", icon: "⛈️", code: "stormy" },
    96: { desc: "Thunderstorm with Hail", icon: "⛈️", code: "stormy" },
    99: { desc: "Thunderstorm with Hail", icon: "⛈️", code: "stormy" },
  };

  return (
    weatherCodes[weatherCode] || {
      desc: "Unknown",
      icon: "🌤️",
      code: "clear-day",
    }
  );
}

// Display weather information
function displayWeather(weatherData, coordinates) {
  const current = weatherData.current;
  const weatherInfo = getWeatherInfo(current.weather_code);

  // City name and date
  document.getElementById("cityName").textContent = weatherData.city;
  document.getElementById("date").textContent = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  // Weather icon (using SVG)
  const iconContainer = document.getElementById("weatherIcon");
  iconContainer.innerHTML = getWeatherIcon(current.weather_code);

  // Temperature
  document.getElementById("temperature").textContent =
    `${Math.round(current.temperature_2m)}°C`;
  document.getElementById("weatherDescription").textContent = weatherInfo.desc;

  // Details
  document.getElementById("humidity").textContent =
    `${current.relative_humidity_2m}%`;
  document.getElementById("feelsLike").textContent =
    `${Math.round(current.apparent_temperature)}°C`;
  document.getElementById("windSpeed").textContent =
    `${Math.round(current.wind_speed_10m)} km/h`;
  document.getElementById("pressure").textContent =
    `${Math.round(current.pressure_msl)} mb`;

  // Show content, hide error
  weatherContent.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

// Update background based on weather
function updateBackground(weatherData) {
  const current = weatherData.current;
  const weatherInfo = getWeatherInfo(current.weather_code);
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 18;

  let backgroundClass = weatherInfo.code;

  // Adjust for night time
  if (backgroundClass === "clear-day" && isNight) {
    backgroundClass = "clear-night";
  } else if (backgroundClass === "cloudy-day" && isNight) {
    backgroundClass = "cloudy-night";
  } else if (backgroundClass === "rainy-day" && isNight) {
    backgroundClass = "rainy-night";
  }

  // Remove all background classes
  document.body.classList.remove(
    "clear-day",
    "clear-night",
    "cloudy-day",
    "cloudy-night",
    "rainy-day",
    "rainy-night",
    "snowy-day",
    "snowy-night",
    "stormy",
  );

  // Add new background class
  document.body.classList.add(backgroundClass);
}

// Show/hide loading spinner
function showLoading(show) {
  if (show) {
    loadingSpinner.classList.remove("hidden");
    weatherContent.classList.add("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  weatherContent.classList.add("hidden");
}

// Hide error message
function hideError() {
  errorMessage.classList.add("hidden");
}

// Load default city on page load
window.addEventListener("load", () => {
  searchInput.value = "London";
  searchCity();
});
