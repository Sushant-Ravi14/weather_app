import { aqiLabel } from '../services/weatherApi'

export default function AirQuality({ airQuality }) {
  if (!airQuality) return null
  const epa = airQuality['us-epa-index']
  const { label, color } = aqiLabel(epa)

  const pollutants = [
    { key: 'pm2_5', label: 'PM2.5' },
    { key: 'pm10', label: 'PM10' },
    { key: 'o3', label: 'Ozone' },
    { key: 'no2', label: 'NO₂' }
  ]

  return (
    <section className="glass-card px-5 py-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold text-slate-soft">Air Quality</h2>
        <span className={`font-display text-sm font-semibold ${color}`}>{label}</span>
      </div>
      <div className="grid grid-cols-4 gap-3 text-center">
        {pollutants.map((p) => (
          <div key={p.key}>
            <div className="font-mono text-lg">{Math.round(airQuality[p.key])}</div>
            <div className="text-[10px] text-slate-soft">{p.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
