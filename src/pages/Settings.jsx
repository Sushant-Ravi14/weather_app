import { useTheme } from '../context/ThemeContext'
import { useUnits } from '../context/UnitsContext'

function ToggleRow({ label, value, options, onChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="text-sm text-cloud/90">{label}</span>
      <div className="flex rounded-full bg-white/5 p-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              value === opt.value ? 'bg-sky text-midnight' : 'text-slate-soft hover:text-cloud'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { tempUnit, setTempUnit, windUnit, setWindUnit } = useUnits()

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-4 pb-28 pt-8">
      <h1 className="font-display text-2xl font-semibold">Settings</h1>

      <div className="glass-card divide-y divide-white/5">
        <ToggleRow
          label="Temperature"
          value={tempUnit}
          onChange={setTempUnit}
          options={[
            { value: 'C', label: '°C' },
            { value: 'F', label: '°F' }
          ]}
        />
        <ToggleRow
          label="Wind speed"
          value={windUnit}
          onChange={setWindUnit}
          options={[
            { value: 'kmh', label: 'km/h' },
            { value: 'mph', label: 'mph' }
          ]}
        />
        {/* <ToggleRow
          label="Appearance"
          value={theme}
          onChange={() => toggleTheme()}
          options={[
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' }
          ]}
        /> */}
      </div>

      <p className="px-1 text-xs text-slate-soft">
        Skyline Weather is installable — use "Add to Home Screen" from your browser menu, or generate an APK
        with Bubblewrap for the Play Store.
      </p>
    </div>
  )
}
