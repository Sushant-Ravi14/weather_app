import { motion, AnimatePresence } from 'framer-motion'
import { conditionTheme } from '../services/weatherApi'

const GRADIENTS = {
  'clear-day': 'bg-sky-clear-day',
  'clear-night': 'bg-sky-clear-night',
  cloudy: 'bg-sky-cloudy',
  rain: 'bg-sky-rain',
  storm: 'bg-sky-storm',
  snow: 'bg-sky-snow'
}

export default function SkyBackground({ code = 1000, isDay = 1 }) {
  const theme = conditionTheme(code, isDay)
  const gradientClass = GRADIENTS[theme] || GRADIENTS['clear-day']

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-midnight">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className={`absolute inset-0 ${gradientClass}`}
        />
      </AnimatePresence>
      {/* soft drifting light for a living-sky feel; disabled by prefers-reduced-motion via CSS */}
      <motion.div
        className="absolute -top-1/3 left-1/4 h-[60vh] w-[60vh] rounded-full bg-white/10 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-midnight/40" />
    </div>
  )
}
