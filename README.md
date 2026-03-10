# Weather App

A simple weather application that shows real-time weather data when you enter a city name. It now uses the **MET Norway weather API** (free, no key required) plus Nominatim geocoding, while still demonstrating environment-variable loading with `dotenv`.

## Features

- Search weather by city name
- Displays temperature, humidity, wind speed, pressure, and feels-like temperature
- Dynamic background changes based on weather conditions
- Custom SVG weather icons
- Error handling for invalid cities, API errors, and network issues

## Project Structure

```
weather-app/
├── public/            # Frontend files served by Express
│   ├── index.html     # Main HTML page
│   ├── styles.css     # Styling with dynamic weather backgrounds
│   ├── script.js      # Frontend logic (API calls, DOM updates)
│   └── icons.js       # Custom SVG weather icons
├── server.js          # Express server with API proxy
├── .env               # API key (NOT committed to git)
├── .env.example       # Template showing required env variables
├── .gitignore         # Ignores .env and node_modules
├── package.json       # Node.js dependencies
└── README.md          # This file
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)

## Setup & Run

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd weather-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create your `.env` file (optional — app works without it):**

   ```bash
   cp .env.example .env
   ```

   You can configure the port or store an API key for future use.

4. **Start the server:**

   ```bash
   npm start
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works

1. The frontend sends a city name to the backend endpoint `/api/weather?city=London`
2. The Express server loads environment variables from `.env` using `dotenv`
3. The server geocodes the city via Nominatim, then fetches current conditions from MET Norway (free, no key needed)
4. Weather data is returned to the frontend and displayed with dynamic icons and backgrounds

## Environment Variables

| Variable          | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `WEATHER_API_KEY` | API key (stored for demo, not required by the current setup) |
| `PORT`            | Server port (default: 3000)                                  |

## Error Handling

- **Invalid city name** → "City not found" message
- **Missing API key** → Server refuses to start with a clear error
- **API errors** → Descriptive error messages shown to the user
- **Network errors** → Friendly "check your connection" message
