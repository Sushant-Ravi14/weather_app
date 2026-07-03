import { motion } from 'framer-motion'
import { FiMapPin, FiPlus, FiCheck } from 'react-icons/fi'
import WeatherIcon from './WeatherIcon'
import { useUnits } from '../context/UnitsContext'

export default function WeatherCard({ location, current }) {
  const { tempUnit, favorites, addFavorite, removeFavorite } = useUnits()
  const temp = tempUnit === 'C' ? Math.round(current.temp_c) : Math.round(current.temp_f)
  const feelsLike = tempUnit === 'C' ? Math.round(current.feelslike_c) : Math.round(current.feelslike_f)
  const isFavorite = favorites.includes(location.name)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card flex flex-col items-center gap-2 px-8 py-10 text-center"
    >
      <div className="flex items-center gap-2 text-slate-soft">
        <FiMapPin aria-hidden="true" />
        <span className="font-body text-sm">
          {location.name}, {location.country}
        </span>
        <button
          onClick={() => (isFavorite ? removeFavorite(location.name) : addFavorite(location.name))}
          aria-label={isFavorite ? `Remove ${location.name} from favorites` : `Add ${location.name} to favorites`}
          className="ml-1 rounded-full p-1 text-slate-soft transition-colors hover:text-amber"
        >
          {isFavorite ? <FiCheck className="text-amber" /> : <FiPlus />}
        </button>
      </div>

      <WeatherIcon code={current.condition.code} isDay={current.is_day} className="text-8xl drop-shadow-lg" />

      <div className="font-mono text-7xl font-medium tracking-tight">
        {temp}°{tempUnit}
      </div>
      <p className="font-display text-lg text-cloud/90">{current.condition.text}</p>
      <p className="text-sm text-slate-soft">Feels like {feelsLike}°{tempUnit}</p>
    </motion.div>
  )
}
