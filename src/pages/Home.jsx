import { useWeather } from '../hooks/useWeather'
import { useLocation } from '../context/LocationContext'
import SkyBackground from '../components/SkyBackground'
import WeatherCard from '../components/WeatherCard'
import HourlyForecast from '../components/HourlyForecast'
import DailyForecast from '../components/DailyForecast'
import AirQuality from '../components/AirQuality'
import DetailsGrid from '../components/DetailsGrid'
import AlertsBanner from '../components/AlertsBanner'
import Loading from '../components/Loading'

export default function Home() {
  const { query } = useLocation()
  const { data, loading, error, reload } = useWeather(query)

  if (loading) return <Loading label="Locating you & checking the sky…" />

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-slate-soft">{error}</p>
        <button
          onClick={reload}
          className="rounded-full bg-sky/20 px-5 py-2 text-sm font-semibold text-sky transition-colors hover:bg-sky/30"
        >
          Try again
        </button>
      </div>
    )
  }

  const { location, current, forecast, alerts } = data
  const hours = forecast.forecastday.flatMap((d) => d.hour)

  return (
    <>
      <SkyBackground code={current.condition.code} isDay={current.is_day} />
      <div className="mx-auto flex max-w-xl flex-col gap-4 px-4 pb-28 pt-8">
        <AlertsBanner alerts={alerts} />
        <WeatherCard location={location} current={current} />
        <HourlyForecast hours={hours} />
        <DailyForecast days={forecast.forecastday} />
        <AirQuality airQuality={current.air_quality} />
        <DetailsGrid current={current} astro={forecast.forecastday[0]?.astro} />
      </div>
    </>
  )
}
