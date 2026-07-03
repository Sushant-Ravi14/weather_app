import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

const client = axios.create({ baseURL: BASE_URL })

/**
 * Fetches current weather + N days of forecast (hourly is nested inside
 * each forecast day) + air quality in a single WeatherAPI call.
 * query can be a city name, "lat,lon", or "auto:ip".
 */
export async function getForecast(query, days = 7) {
  const { data } = await client.get('/forecast.json', {
    params: {
      key: API_KEY,
      q: query,
      days,
      aqi: 'yes',
      alerts: 'yes'
    }
  })
  return data
}

/** Autocomplete/search-as-you-type city lookup for the search page. */
export async function searchCities(query) {
  if (!query || query.trim().length < 2) return []
  const { data } = await client.get('/search.json', {
    params: { key: API_KEY, q: query }
  })
  return data
}

/** Resolves the browser's geolocation coordinates to "lat,lon" for the API. */
export function getCurrentCoords() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported on this device'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(`${pos.coords.latitude},${pos.coords.longitude}`),
      (err) => reject(err),
      { timeout: 8000 }
    )
  })
}

/** Maps WeatherAPI's numeric US EPA index to a label + Tailwind color class. */
export function aqiLabel(usEpaIndex) {
  const table = {
    1: { label: 'Good', color: 'text-emerald-400' },
    2: { label: 'Moderate', color: 'text-amber' },
    3: { label: 'Unhealthy (Sensitive)', color: 'text-orange-400' },
    4: { label: 'Unhealthy', color: 'text-red-400' },
    5: { label: 'Very Unhealthy', color: 'text-fuchsia-400' },
    6: { label: 'Hazardous', color: 'text-rose-600' }
  }
  return table[usEpaIndex] || { label: 'Unknown', color: 'text-slate-soft' }
}

/**
 * Buckets a WeatherAPI condition code + is_day flag into one of the app's
 * six background themes, used to drive the dynamic sky gradient.
 */
export function conditionTheme(code, isDay) {
  const rain = [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246]
  const storm = [1087, 1273, 1276, 1279, 1282]
  const snow = [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258]
  const cloudy = [1003, 1006, 1009, 1030, 1135, 1147]

  if (storm.includes(code)) return 'storm'
  if (snow.includes(code)) return 'snow'
  if (rain.includes(code)) return 'rain'
  if (cloudy.includes(code)) return 'cloudy'
  return isDay ? 'clear-day' : 'clear-night'
}
