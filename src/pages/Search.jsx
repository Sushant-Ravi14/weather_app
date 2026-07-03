import { useNavigate } from 'react-router-dom'
import { FiMapPin, FiX, FiCrosshair } from 'react-icons/fi'
import SearchBar from '../components/SearchBar'
import { useLocation } from '../context/LocationContext'
import { useUnits } from '../context/UnitsContext'

export default function SearchPage() {
  const navigate = useNavigate()
  const { setQuery } = useLocation()
  const { favorites, removeFavorite } = useUnits()

  const goHomeWith = (query, label) => {
    setQuery(query, label)
    navigate('/')
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-4 pb-28 pt-8">
      <h1 className="font-display text-2xl font-semibold">Search</h1>

      <SearchBar onSelectCity={goHomeWith} />

      <button
        onClick={() => goHomeWith('auto', 'Current location')}
        className="glass-card flex items-center gap-3 px-4 py-3 text-sm text-cloud/90 transition-colors hover:bg-white/10"
      >
        <FiCrosshair className="text-lg text-sky" aria-hidden="true" />
        Use current location
      </button>

      <div>
        <h2 className="mb-2 px-1 font-display text-sm font-semibold text-slate-soft">Favorite Cities</h2>
        {favorites.length === 0 ? (
          <p className="px-1 text-sm text-slate-soft">
            Cities you star from the home screen will show up here for quick access.
          </p>
        ) : (
          <ul className="glass-card divide-y divide-white/5">
            {favorites.map((city) => (
              <li key={city} className="flex items-center justify-between px-4 py-3">
                <button
                  onClick={() => goHomeWith(city, city)}
                  className="flex items-center gap-2 text-sm text-cloud/90"
                >
                  <FiMapPin className="text-sky-soft" aria-hidden="true" />
                  {city}
                </button>
                <button
                  onClick={() => removeFavorite(city)}
                  aria-label={`Remove ${city} from favorites`}
                  className="text-slate-soft hover:text-cloud"
                >
                  <FiX />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
