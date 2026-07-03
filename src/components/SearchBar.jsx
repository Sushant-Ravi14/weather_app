import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { searchCities } from '../services/weatherApi'

export default function SearchBar({ onSelectCity }) {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const debounceRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    clearTimeout(debounceRef.current)
    if (term.trim().length < 2) {
      setResults([])
      return
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchCities(term)
        setResults(data)
        setActiveIndex(-1)
        setOpen(true)
      } catch {
        setResults([])
        setActiveIndex(-1)
      }
    }, 350)
    return () => clearTimeout(debounceRef.current)
  }, [term])

  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return
    const activeEl = listRef.current.children[activeIndex]
    activeEl?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const handleSelect = (city) => {
    onSelectCity(`${city.lat},${city.lon}`, `${city.name}, ${city.country}`)
    setTerm('')
    setResults([])
    setActiveIndex(-1)
    setOpen(false)
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'ArrowDown') {
      if (results.length === 0) return
      e.preventDefault()
      setOpen(true)
      setActiveIndex((prev) => (prev + 1) % results.length)
      return
    }

    if (e.key === 'ArrowUp') {
      if (results.length === 0) return
      e.preventDefault()
      setOpen(true)
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1))
      return
    }

    if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      return
    }

    if (e.key !== 'Enter') return
    e.preventDefault()

    if (results.length > 0) {
      // use the arrow-highlighted row if there is one, otherwise the top match
      handleSelect(results[activeIndex >= 0 ? activeIndex : 0])
      return
    }

    // Enter was pressed before the debounced search resolved (or search
    // failed) — do an immediate lookup so the user isn't stuck waiting.
    if (term.trim().length < 2) return
    clearTimeout(debounceRef.current)
    try {
      const data = await searchCities(term)
      if (data.length > 0) {
        handleSelect(data[0])
      }
    } catch {
      // no match — leave the input as-is so the user can adjust it
    }
  }

  return (
    <div className="relative w-full">
      <div className="glass-card flex items-center gap-3 px-4 py-3">
        <FiSearch className="text-lg text-slate-soft" aria-hidden="true" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search a city…"
          aria-label="Search for a city"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="city-results-list"
          aria-activedescendant={activeIndex >= 0 ? `city-result-${activeIndex}` : undefined}
          className="w-full bg-transparent font-body text-sm text-cloud placeholder:text-slate-soft focus:outline-none"
        />
        {term && (
          <button onClick={() => setTerm('')} aria-label="Clear search" className="text-slate-soft hover:text-cloud">
            <FiX />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul
          ref={listRef}
          id="city-results-list"
          role="listbox"
          className="glass-card absolute z-10 mt-2 max-h-72 w-full overflow-y-auto py-2"
        >
          {results.map((city, index) => (
            <li key={city.id} id={`city-result-${index}`} role="option" aria-selected={index === activeIndex}>
              <button
                onClick={() => handleSelect(city)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`w-full px-4 py-2 text-left text-sm text-cloud/90 transition-colors ${
                  index === activeIndex ? 'bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                {city.name}, {city.region ? `${city.region}, ` : ''}
                {city.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}