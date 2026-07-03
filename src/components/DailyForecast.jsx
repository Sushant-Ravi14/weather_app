import WeatherIcon from './WeatherIcon'
import { useUnits } from '../context/UnitsContext'

export default function DailyForecast({ days }) {
  const { tempUnit } = useUnits()

  return (
    <section className="glass-card px-4 py-5">
      <h2 className="mb-2 px-2 font-display text-sm font-semibold text-slate-soft">7-Day Forecast</h2>
      <ul>
        {days.map((day, i) => {
          const date = new Date(day.date)
          const label = i === 0 ? 'Today' : date.toLocaleDateString([], { weekday: 'short' })
          const max = tempUnit === 'C' ? Math.round(day.day.maxtemp_c) : Math.round(day.day.maxtemp_f)
          const min = tempUnit === 'C' ? Math.round(day.day.mintemp_c) : Math.round(day.day.mintemp_f)
          return (
            <li
              key={day.date}
              className="flex items-center justify-between gap-3 border-b border-white/5 px-2 py-3 last:border-0"
            >
              <span className="w-16 text-sm text-cloud/90">{label}</span>
              <WeatherIcon code={day.day.condition.code} isDay={1} className="text-2xl" />
              <span className="flex-1 truncate px-2 text-xs text-slate-soft">{day.day.condition.text}</span>
              {day.day.daily_chance_of_rain > 0 && (
                <span className="w-10 text-right text-[10px] text-sky-soft">
                  {day.day.daily_chance_of_rain}%
                </span>
              )}
              <span className="w-16 text-right font-mono text-sm">
                {max}° <span className="text-slate-soft">{min}°</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
