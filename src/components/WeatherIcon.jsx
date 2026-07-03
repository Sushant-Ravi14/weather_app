import {
  WiDaySunny,
  WiNightClear,
  WiCloudy,
  WiDayCloudyHigh,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiSprinkle
} from 'react-icons/wi'
import { conditionTheme } from '../services/weatherApi'

const ICONS = {
  'clear-day': WiDaySunny,
  'clear-night': WiNightClear,
  cloudy: WiDayCloudyHigh,
  rain: WiRain,
  storm: WiThunderstorm,
  snow: WiSnow,
  fog: WiFog,
  drizzle: WiSprinkle
}

export default function WeatherIcon({ code, isDay, className = 'text-6xl' }) {
  const theme = conditionTheme(code, isDay)
  const Icon = ICONS[theme] || WiCloudy
  return <Icon className={className} aria-hidden="true" />
}
