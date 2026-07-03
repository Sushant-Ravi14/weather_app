import { WiStrongWind, WiHumidity, WiBarometer, WiSunrise, WiSunset, WiThermometer } from 'react-icons/wi'
import { FiEye } from 'react-icons/fi'
import { useUnits } from '../context/UnitsContext'

export default function DetailsGrid({ current, astro }) {
  const { windUnit } = useUnits()
  const wind = windUnit === 'kmh' ? `${Math.round(current.wind_kph)} km/h` : `${Math.round(current.wind_mph)} mph`

  const items = [
    { Icon: WiStrongWind, label: 'Wind', value: `${wind} ${current.wind_dir}` },
    { Icon: WiHumidity, label: 'Humidity', value: `${current.humidity}%` },
    { Icon: WiThermometer, label: 'UV Index', value: current.uv },
    { Icon: WiBarometer, label: 'Pressure', value: `${current.pressure_mb} hPa` },
    { Icon: FiEye, label: 'Visibility', value: `${current.vis_km} km` },
    { Icon: WiSunrise, label: 'Sunrise', value: astro?.sunrise },
    { Icon: WiSunset, label: 'Sunset', value: astro?.sunset }
  ].filter((item) => item.value !== undefined)

  return (
    <section className="glass-card grid grid-cols-2 gap-4 px-5 py-5 sm:grid-cols-3">
      {items.map(({ Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3">
          <Icon className="text-3xl text-sky-soft" aria-hidden="true" />
          <div>
            <div className="text-[11px] text-slate-soft">{label}</div>
            <div className="font-mono text-sm">{value}</div>
          </div>
        </div>
      ))}
    </section>
  )
}
