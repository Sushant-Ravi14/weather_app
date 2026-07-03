import { createContext, useContext, useState } from 'react'

const LocationContext = createContext(null)

export function LocationProvider({ children }) {
  const [query, setQueryState] = useState('auto')
  const [label, setLabel] = useState('Current location')

  const setQuery = (newQuery, newLabel) => {
    setQueryState(newQuery)
    setLabel(newLabel || newQuery)
  }

  return (
    <LocationContext.Provider value={{ query, label, setQuery }}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => useContext(LocationContext)
