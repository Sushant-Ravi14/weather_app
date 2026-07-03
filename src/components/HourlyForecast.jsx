import WeatherIcon from './WeatherIcon'
import { useUnits } from '../context/UnitsContext'

export default function HourlyForecast({ hours }) {
  const { tempUnit } = useUnits()

  // Slice to the next 24 hours starting from the current hour
  const now = new Date()
  const upcoming = hours.filter((h) => new Date(h.time) >= new Date(now.setMinutes(0, 0, 0))).slice(0, 24)

  return (
    <section className="glass-card px-4 py-5">
      <h2 className="mb-3 px-2 font-display text-sm font-semibold text-slate-soft">24-Hour Forecast</h2>
      <div className="scroll-thin flex gap-4 overflow-x-auto px-2 pb-1">
        {upcoming.map((hour) => {
          const time = new Date(hour.time)
          const temp = tempUnit === 'C' ? Math.round(hour.temp_c) : Math.round(hour.temp_f)
          return (
            <div key={hour.time} className="flex min-w-[64px] flex-col items-center gap-2">
              <span className="text-xs text-slate-soft">
                {time.toLocaleTimeString([], { hour: 'numeric' })}
              </span>
              <WeatherIcon code={hour.condition.code} isDay={hour.is_day} className="text-3xl" />
              <span className="font-mono text-sm">{temp}°</span>
              {hour.chance_of_rain > 0 && (
                <span className="text-[10px] text-sky-soft">{hour.chance_of_rain}%</span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
