import { createContext, useContext, useEffect, useState } from 'react'

const UnitsContext = createContext(null)

export function UnitsProvider({ children }) {
  const [tempUnit, setTempUnit] = useState(() => localStorage.getItem('skyline-temp-unit') || 'C')
  const [windUnit, setWindUnit] = useState(() => localStorage.getItem('skyline-wind-unit') || 'kmh')
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('skyline-favorites')) || []
    } catch {
      return []
    }
  })

  useEffect(() => localStorage.setItem('skyline-temp-unit', tempUnit), [tempUnit])
  useEffect(() => localStorage.setItem('skyline-wind-unit', windUnit), [windUnit])
  useEffect(() => localStorage.setItem('skyline-favorites', JSON.stringify(favorites)), [favorites])

  const addFavorite = (city) => {
    setFavorites((prev) => (prev.includes(city) ? prev : [...prev, city]))
  }
  const removeFavorite = (city) => {
    setFavorites((prev) => prev.filter((c) => c !== city))
  }

  return (
    <UnitsContext.Provider
      value={{ tempUnit, setTempUnit, windUnit, setWindUnit, favorites, addFavorite, removeFavorite }}
    >
      {children}
    </UnitsContext.Provider>
  )
}

export const useUnits = () => useContext(UnitsContext)
