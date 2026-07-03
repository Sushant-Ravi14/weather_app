# Project structure

```
weather-app/
  src/
    components/     WeatherCard, HourlyForecast, DailyForecast, AirQuality,
                     DetailsGrid, AlertsBanner, SearchBar, Navbar, SkyBackground,
                     WeatherIcon, Loading
    pages/           Home, Search, Settings
    context/         ThemeContext, UnitsContext, LocationContext
    hooks/           useWeather.js
    services/        weatherApi.js (all WeatherAPI.com calls live here)
  public/icons/      PWA app icons (192, 512, 512 maskable)
  vite.config.js     vite-plugin-pwa config (manifest + offline caching)
  tailwind.config.js design tokens (colors, fonts, sky gradients)
```
