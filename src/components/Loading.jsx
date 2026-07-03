export default function Loading({ label = 'Fetching the sky…' }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-slate-soft">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-sky" />
      <p className="font-body text-sm">{label}</p>
    </div>
  )
}
