import { NavLink } from 'react-router-dom'
import { WiDaySunny } from 'react-icons/wi'
import { FiSearch, FiSettings } from 'react-icons/fi'

const links = [
  { to: '/', label: 'Today', Icon: WiDaySunny },
  { to: '/search', label: 'Search', Icon: FiSearch },
  { to: '/settings', label: 'Settings', Icon: FiSettings }
]

export default function Navbar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 mx-auto flex max-w-md items-center justify-around
                 border-t border-white/10 bg-midnight/70 px-4 py-2 backdrop-blur-xl
                 sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:rounded-full sm:border sm:px-6"
      aria-label="Primary"
    >
      {links.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-full px-4 py-2 text-xs transition-colors ${
              isActive ? 'text-sky' : 'text-slate-soft hover:text-cloud'
            }`
          }
        >
          <Icon className="text-2xl" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
