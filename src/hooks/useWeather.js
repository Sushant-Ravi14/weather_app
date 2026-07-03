import { useCallback, useEffect, useState } from 'react'
import { getForecast, getCurrentCoords } from '../services/weatherApi'

/**
 * Loads and holds forecast data for a given query string ("auto" uses the
 * browser's geolocation). Exposes a `reload` fn so the search/settings
 * pages can trigger a refetch after changing city or units.
 */
export function useWeather(initialQuery = 'auto') {
  const [query, setQuery] = useState(initialQuery)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async (q) => {
    setLoading(true)
    setError(null)
    try {
      const resolvedQuery = q === 'auto' ? await getCurrentCoords() : q
      const result = await getForecast(resolvedQuery)
      setData(result)
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          err?.message ||
          'Could not load weather for that location'
      )
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // keep internal query in sync if the caller passes a new initialQuery
  // (e.g. the shared LocationContext value changes after a search)
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    load(query)
  }, [query, load])

  return { data, loading, error, query, setQuery, reload: () => load(query) }
}
