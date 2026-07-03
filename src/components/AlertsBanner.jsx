import { FiAlertTriangle } from 'react-icons/fi'

export default function AlertsBanner({ alerts }) {
  const list = alerts?.alert || []
  if (list.length === 0) return null

  return (
    <section className="flex flex-col gap-3">
      {list.map((alert, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-2xl border border-amber/30 bg-amber/10 px-4 py-3 text-amber"
        >
          <FiAlertTriangle className="mt-0.5 shrink-0 text-lg" aria-hidden="true" />
          <div>
            <p className="font-display text-sm font-semibold">{alert.headline || alert.event}</p>
            <p className="mt-0.5 text-xs text-amber/80">{alert.desc?.slice(0, 160) || 'Check local authorities for details.'}…</p>
          </div>
        </div>
      ))}
    </section>
  )
}
