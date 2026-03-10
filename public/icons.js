// Custom SVG Weather Icons
const weatherIcons = {
  // Clear Sky - Sun
  clear: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="45" fill="#FFD700"/>
    <line x1="100" y1="20" x2="100" y2="40" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>
    <line x1="100" y1="160" x2="100" y2="180" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>
    <line x1="20" y1="100" x2="40" y2="100" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>
    <line x1="160" y1="100" x2="180" y2="100" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>
    <line x1="35" y1="35" x2="50" y2="50" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>
    <line x1="150" y1="150" x2="165" y2="165" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>
    <line x1="165" y1="35" x2="150" y2="50" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>
    <line x1="50" y1="150" x2="35" y2="165" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>
  </svg>`,

  // Cloudy - Single Cloud
  cloudy: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M 80 120 C 50 120 30 100 30 75 C 30 55 42 38 60 35 C 65 22 77 15 92 15 C 110 15 125 25 132 40 C 145 38 157 45 157 60 C 157 80 143 100 120 108 C 200 108 260 130 260 160 C 260 185 240 205 215 205 L 85 205 C 50 205 25 180 25 150 C 25 125 42 105 65 100" fill="#4DD0E1" stroke="none"/>
  </svg>`,

  // Rainy - Cloud with Rain
  rainy: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <path d="M 80 120 C 50 120 30 100 30 75 C 30 55 42 38 60 35 C 65 22 77 15 92 15 C 110 15 125 25 132 40 C 145 38 157 45 157 60 C 157 80 143 100 120 108 C 200 108 260 130 260 160 C 260 185 240 205 215 205 L 85 205 C 50 205 25 180 25 150 C 25 125 42 105 65 100" fill="#4DD0E1" stroke="none"/>
    <line x1="70" y1="230" x2="60" y2="270" stroke="#4DD0E1" stroke-width="6" stroke-linecap="round"/>
    <line x1="130" y1="230" x2="120" y2="270" stroke="#4DD0E1" stroke-width="6" stroke-linecap="round"/>
    <line x1="190" y1="230" x2="180" y2="270" stroke="#4DD0E1" stroke-width="6" stroke-linecap="round"/>
  </svg>`,

  // Snowy - Cloud with Snow
  snowy: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <path d="M 80 120 C 50 120 30 100 30 75 C 30 55 42 38 60 35 C 65 22 77 15 92 15 C 110 15 125 25 132 40 C 145 38 157 45 157 60 C 157 80 143 100 120 108 C 200 108 260 130 260 160 C 260 185 240 205 215 205 L 85 205 C 50 205 25 180 25 150 C 25 125 42 105 65 100" fill="#4DD0E1" stroke="none"/>
    <circle cx="70" cy="250" r="5" fill="#E0F7FA"/>
    <circle cx="100" cy="260" r="5" fill="#E0F7FA"/>
    <circle cx="130" cy="250" r="5" fill="#E0F7FA"/>
    <circle cx="160" cy="265" r="5" fill="#E0F7FA"/>
    <circle cx="190" cy="250" r="5" fill="#E0F7FA"/>
    <circle cx="85" cy="280" r="5" fill="#E0F7FA"/>
    <circle cx="145" cy="285" r="5" fill="#E0F7FA"/>
  </svg>`,

  // Stormy - Dark Cloud with Lightning
  stormy: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <path d="M 80 120 C 50 120 30 100 30 75 C 30 55 42 38 60 35 C 65 22 77 15 92 15 C 110 15 125 25 132 40 C 145 38 157 45 157 60 C 157 80 143 100 120 108 C 200 108 260 130 260 160 C 260 185 240 205 215 205 L 85 205 C 50 205 25 180 25 150 C 25 125 42 105 65 100" fill="#455A64" stroke="none"/>
    <polyline points="180,220 200,260 185,265 210,300 160,270" fill="#FFD700" stroke="#FFD700" stroke-width="2" stroke-linejoin="round"/>
  </svg>`,

  // Mostly Clear - Sun behind small cloud
  partlyCloudy: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="60" r="40" fill="#FFD700"/>
    <path d="M 120 110 C 100 110 85 100 85 85 C 85 72 93 62 105 60 C 108 50 116 45 125 45 C 138 45 150 53 155 65 C 165 64 173 72 173 82 C 173 95 163 110 150 115 C 200 115 250 140 250 175 C 250 195 233 210 212 210 L 100 210 C 70 210 50 190 50 165 C 50 145 63 130 80 125" fill="#4DD0E1" stroke="none"/>
  </svg>`,

  // Fog - Layered clouds
  foggy: `<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="150" cy="60" rx="90" ry="50" fill="#B3E5FC" opacity="0.7"/>
    <ellipse cx="150" cy="110" rx="100" ry="50" fill="#81D4FA" opacity="0.8"/>
    <ellipse cx="150" cy="160" rx="110" ry="50" fill="#4DD0E1" opacity="0.9"/>
  </svg>`,
};

// Function to get SVG icon for weather code
function getWeatherIcon(weatherCode) {
  const iconMap = {
    0: weatherIcons.clear, // Clear Sky
    1: weatherIcons.clear, // Mainly Clear
    2: weatherIcons.partlyCloudy, // Partly Cloudy
    3: weatherIcons.cloudy, // Overcast
    45: weatherIcons.foggy, // Foggy
    48: weatherIcons.foggy, // Foggy (depositing rime)
    51: weatherIcons.rainy, // Light Drizzle
    53: weatherIcons.rainy, // Moderate Drizzle
    55: weatherIcons.rainy, // Dense Drizzle
    61: weatherIcons.rainy, // Slight Rain
    63: weatherIcons.rainy, // Moderate Rain
    65: weatherIcons.stormy, // Heavy Rain
    71: weatherIcons.snowy, // Slight Snow
    73: weatherIcons.snowy, // Moderate Snow
    75: weatherIcons.snowy, // Heavy Snow
    77: weatherIcons.snowy, // Snow Grains
    80: weatherIcons.rainy, // Slight Rain Showers
    81: weatherIcons.rainy, // Moderate Rain Showers
    82: weatherIcons.stormy, // Violent Rain Showers
    85: weatherIcons.snowy, // Slight Snow Showers
    86: weatherIcons.snowy, // Heavy Snow Showers
    95: weatherIcons.stormy, // Thunderstorm
    96: weatherIcons.stormy, // Thunderstorm with Hail
    99: weatherIcons.stormy, // Thunderstorm with Hail
  };

  return iconMap[weatherCode] || weatherIcons.cloudy;
}
