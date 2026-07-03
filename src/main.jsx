import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { UnitsProvider } from './context/UnitsContext.jsx'
import { LocationProvider } from './context/LocationContext.jsx'
import './index.css'

// auto-updates the service worker in the background so users
// always get the latest build without manually reinstalling
registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UnitsProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </UnitsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
