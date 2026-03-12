// Custom SVG Weather Icons
const weatherIcons = {
  clear: `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#F7C948" stroke-width="10" stroke-linecap="round">
      <path d="M110 18v24"/>
      <path d="M110 178v24"/>
      <path d="M18 110h24"/>
      <path d="M178 110h24"/>
      <path d="M46 46l17 17"/>
      <path d="M157 157l17 17"/>
      <path d="M174 46l-17 17"/>
      <path d="M63 157l-17 17"/>
    </g>
    <circle cx="110" cy="110" r="52" fill="#FFE27A"/>
    <circle cx="95" cy="94" r="10" fill="#FFF1B8" opacity="0.8"/>
    <circle cx="127" cy="82" r="7" fill="#F7C948" opacity="0.7"/>
    <circle cx="137" cy="121" r="6" fill="#F7C948" opacity="0.5"/>
  </svg>`,

  clearNight: `<svg viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg">
    <circle cx="176" cy="84" r="56" fill="#FFE78A"/>
    <circle cx="202" cy="72" r="52" fill="#6A86D9"/>
    <circle cx="74" cy="54" r="5" fill="#F6F7FF"/>
    <circle cx="103" cy="30" r="4" fill="#DCE6FF"/>
    <circle cx="56" cy="96" r="3.5" fill="#E7EDFF"/>
  </svg>`,

  cloudy: `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="118" cy="118" r="36" fill="#F6F8FF"/>
      <circle cx="168" cy="100" r="44" fill="#F9FBFF"/>
      <circle cx="214" cy="122" r="34" fill="#F2F6FF"/>
      <rect x="86" y="122" width="160" height="44" rx="22" fill="#F7FAFF"/>
      <ellipse cx="154" cy="164" rx="88" ry="12" fill="#9FB3E5" opacity="0.35"/>
      <circle cx="119" cy="92" r="3" fill="#9AB3EB"/>
      <circle cx="97" cy="103" r="3" fill="#9AB3EB"/>
      <circle cx="225" cy="108" r="3" fill="#9AB3EB"/>
      <circle cx="239" cy="124" r="3" fill="#9AB3EB"/>
    </g>
  </svg>`,

  cloudyNight: `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
    <circle cx="208" cy="72" r="54" fill="#FFE78A"/>
    <circle cx="232" cy="60" r="49" fill="#23347A"/>
    <circle cx="112" cy="136" r="36" fill="#F6F8FF"/>
    <circle cx="164" cy="118" r="46" fill="#FAFBFF"/>
    <circle cx="212" cy="138" r="34" fill="#F0F5FF"/>
    <rect x="82" y="138" width="164" height="44" rx="22" fill="#F8FAFF"/>
    <ellipse cx="162" cy="181" rx="92" ry="12" fill="#9FB3E5" opacity="0.32"/>
    <circle cx="90" cy="72" r="4" fill="#EEF3FF"/>
    <circle cx="62" cy="98" r="3" fill="#D9E4FF"/>
  </svg>`,

  rainy: `<svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg">
    <circle cx="116" cy="108" r="36" fill="#F6F8FF"/>
    <circle cx="168" cy="92" r="44" fill="#FAFBFF"/>
    <circle cx="216" cy="114" r="34" fill="#F1F6FF"/>
    <rect x="84" y="114" width="166" height="46" rx="23" fill="#F7FAFF"/>
    <path d="M118 188c0-10 14-25 14-25s14 15 14 25a14 14 0 1 1-28 0Z" fill="#75A9FF"/>
    <path d="M164 212c0-10 14-25 14-25s14 15 14 25a14 14 0 1 1-28 0Z" fill="#75A9FF"/>
    <path d="M210 188c0-10 14-25 14-25s14 15 14 25a14 14 0 1 1-28 0Z" fill="#75A9FF"/>
  </svg>`,

  snowy: `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
    <circle cx="116" cy="108" r="36" fill="#F6F8FF"/>
    <circle cx="168" cy="92" r="44" fill="#FAFBFF"/>
    <circle cx="216" cy="114" r="34" fill="#F1F6FF"/>
    <rect x="84" y="114" width="166" height="46" rx="23" fill="#F7FAFF"/>
    <g stroke="#F8FBFF" stroke-width="5" stroke-linecap="round">
      <path d="M118 188v28"/>
      <path d="M104 202h28"/>
      <path d="M108 192l20 20"/>
      <path d="M128 192l-20 20"/>
      <path d="M170 198v28"/>
      <path d="M156 212h28"/>
      <path d="M160 202l20 20"/>
      <path d="M180 202l-20 20"/>
      <path d="M222 188v28"/>
      <path d="M208 202h28"/>
      <path d="M212 192l20 20"/>
      <path d="M232 192l-20 20"/>
    </g>
    <circle cx="142" cy="236" r="5" fill="#F6FAFF"/>
    <circle cx="198" cy="246" r="5" fill="#F6FAFF"/>
  </svg>`,

  stormy: `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
    <circle cx="116" cy="108" r="36" fill="#DCE3F5"/>
    <circle cx="168" cy="92" r="44" fill="#EEF2FA"/>
    <circle cx="216" cy="114" r="34" fill="#DAE1F0"/>
    <rect x="84" y="114" width="166" height="46" rx="23" fill="#E8EEF9"/>
    <path d="M176 168 142 226h28l-18 56 56-76h-32l18-38Z" fill="#FFD95E"/>
  </svg>`,

  partlyCloudy: `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#F7C948" stroke-width="8" stroke-linecap="round">
      <path d="M98 20v20"/>
      <path d="M98 116v20"/>
      <path d="M50 68h20"/>
      <path d="M126 68h20"/>
      <path d="M64 34l14 14"/>
      <path d="M132 102l14 14"/>
      <path d="M146 34 132 48"/>
      <path d="M78 102 64 116"/>
    </g>
    <circle cx="98" cy="68" r="34" fill="#FFE27A"/>
    <circle cx="134" cy="134" r="32" fill="#F6F8FF"/>
    <circle cx="180" cy="120" r="40" fill="#FAFBFF"/>
    <circle cx="222" cy="138" r="30" fill="#F1F6FF"/>
    <rect x="106" y="138" width="150" height="40" rx="20" fill="#F8FAFF"/>
    <ellipse cx="178" cy="178" rx="82" ry="10" fill="#9FB3E5" opacity="0.3"/>
  </svg>`,

  foggy: `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
    <circle cx="120" cy="96" r="34" fill="#F6F8FF"/>
    <circle cx="170" cy="82" r="42" fill="#FAFBFF"/>
    <circle cx="214" cy="102" r="32" fill="#EFF4FF"/>
    <rect x="88" y="102" width="160" height="42" rx="21" fill="#F7FAFF"/>
    <g fill="#F7FAFF" opacity="0.96">
      <rect x="72" y="162" width="154" height="24" rx="12"/>
      <rect x="92" y="192" width="136" height="22" rx="11"/>
      <rect x="122" y="220" width="90" height="18" rx="9"/>
    </g>
    <circle cx="112" cy="112" r="3" fill="#A4B8EA"/>
    <circle cx="96" cy="96" r="3" fill="#A4B8EA"/>
    <circle cx="228" cy="104" r="3" fill="#A4B8EA"/>
  </svg>`,
};

// Function to get SVG icon for weather code
function getWeatherIcon(weatherCode) {
  const iconMap = {
    0: weatherIcons.clear,
    1: weatherIcons.clear,
    2: weatherIcons.partlyCloudy,
    3: weatherIcons.cloudy,
    45: weatherIcons.foggy,
    48: weatherIcons.foggy,
    51: weatherIcons.rainy,
    53: weatherIcons.rainy,
    55: weatherIcons.rainy,
    61: weatherIcons.rainy,
    63: weatherIcons.rainy,
    65: weatherIcons.stormy,
    71: weatherIcons.snowy,
    73: weatherIcons.snowy,
    75: weatherIcons.snowy,
    77: weatherIcons.snowy,
    80: weatherIcons.rainy,
    81: weatherIcons.rainy,
    82: weatherIcons.stormy,
    85: weatherIcons.snowy,
    86: weatherIcons.snowy,
    95: weatherIcons.stormy,
    96: weatherIcons.stormy,
    99: weatherIcons.stormy,
    "clear-night": weatherIcons.clearNight,
    "cloudy-night": weatherIcons.cloudyNight,
  };

  return iconMap[weatherCode] || weatherIcons.cloudy;
}
