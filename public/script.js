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

// Search City and Fetch Weather via server proxy
async function searchCity() {
  const city = searchInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  showLoading(true);
  hideError();

  try {
    const response = await fetch(
      `/api/weather?city=${encodeURIComponent(city)}`,
    );
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        showError("City not found. Please try another city.");
      } else {
        showError(
          data.error || "Error fetching weather data. Please try again.",
        );
      }
      return;
    }

    displayWeather(data);
    updateBackground(data);
  } catch (error) {
    showError("Network error. Please check your connection and try again.");
    console.error("Error:", error);
  } finally {
    showLoading(false);
  }
}

// Map WMO weather code to background theme and SVG icon key
function getWeatherInfo(weatherCode) {
  const weatherMap = {
    0: { bgCode: "clear-day", iconKey: 0 },
    1: { bgCode: "clear-day", iconKey: 1 },
    2: { bgCode: "cloudy-day", iconKey: 2 },
    3: { bgCode: "cloudy-day", iconKey: 3 },
    45: { bgCode: "cloudy-day", iconKey: 45 },
    48: { bgCode: "cloudy-day", iconKey: 48 },
    51: { bgCode: "rainy-day", iconKey: 51 },
    53: { bgCode: "rainy-day", iconKey: 53 },
    55: { bgCode: "rainy-day", iconKey: 55 },
    61: { bgCode: "rainy-day", iconKey: 61 },
    63: { bgCode: "rainy-day", iconKey: 63 },
    65: { bgCode: "stormy", iconKey: 65 },
    71: { bgCode: "snowy-day", iconKey: 71 },
    73: { bgCode: "snowy-day", iconKey: 73 },
    75: { bgCode: "snowy-day", iconKey: 75 },
    77: { bgCode: "snowy-day", iconKey: 77 },
    80: { bgCode: "rainy-day", iconKey: 80 },
    81: { bgCode: "rainy-day", iconKey: 81 },
    82: { bgCode: "stormy", iconKey: 82 },
    85: { bgCode: "snowy-day", iconKey: 85 },
    86: { bgCode: "snowy-day", iconKey: 86 },
    95: { bgCode: "stormy", iconKey: 95 },
    96: { bgCode: "stormy", iconKey: 96 },
    99: { bgCode: "stormy", iconKey: 99 },
  };
  return weatherMap[weatherCode] || { bgCode: "clear-day", iconKey: 0 };
}

// Display weather information
function displayWeather(data) {
  // City name and date
  document.getElementById("cityName").textContent = data.country
    ? `${data.city}, ${data.country}`
    : data.city;
  document.getElementById("date").textContent = new Date(
    data.observed_at || Date.now(),
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Weather icon (using SVG from icons.js)
  const weatherInfo = getWeatherInfo(data.weather_code);
  const iconContainer = document.getElementById("weatherIcon");
  iconContainer.innerHTML = getWeatherIcon(weatherInfo.iconKey);

  // Temperature
  document.getElementById("temperature").textContent = `${data.temperature}°C`;
  document.getElementById("weatherDescription").textContent = data.description;

  // Details
  document.getElementById("humidity").textContent = `${data.humidity}%`;
  document.getElementById("feelsLike").textContent = `${data.feels_like}°C`;
  document.getElementById("windSpeed").textContent = `${data.wind_speed} km/h`;
  document.getElementById("pressure").textContent = `${data.pressure} mb`;

  // Show content, hide error
  weatherContent.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

// Update background based on weather
function updateBackground(data) {
  const weatherInfo = getWeatherInfo(data.weather_code);
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 18;

  let backgroundClass = weatherInfo.bgCode;

  // Adjust for night time
  if (backgroundClass === "clear-day" && isNight) {
    backgroundClass = "clear-night";
  } else if (backgroundClass === "cloudy-day" && isNight) {
    backgroundClass = "cloudy-night";
  } else if (backgroundClass === "rainy-day" && isNight) {
    backgroundClass = "rainy-night";
  } else if (backgroundClass === "snowy-day" && isNight) {
    backgroundClass = "snowy-night";
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
