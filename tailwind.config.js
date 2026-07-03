/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B1120',
        dusk: '#141B2E',
        cloud: 'rgb(var(--c-cloud) / <alpha-value>)',
        sky: {
          DEFAULT: '#38BDF8',
          soft: '#7DD3FC'
        },
        storm: '#7C6FF0',
        amber: '#FBBE4A',
        slate: {
          soft: 'rgb(var(--c-slate-soft) / <alpha-value>)'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'sky-clear-day': 'linear-gradient(160deg, #2E9BE6 0%, #6FC3F7 45%, #BFE6FF 100%)',
        'sky-clear-night': 'linear-gradient(160deg, #060B18 0%, #131C36 55%, #241B4D 100%)',
        'sky-cloudy': 'linear-gradient(160deg, #3A4459 0%, #5B667E 55%, #8B96AC 100%)',
        'sky-rain': 'linear-gradient(160deg, #1B2436 0%, #2E3A52 55%, #46536E 100%)',
        'sky-storm': 'linear-gradient(160deg, #12101F 0%, #241F45 55%, #423876 100%)',
        'sky-snow': 'linear-gradient(160deg, #4A5674 0%, #8291AC 55%, #D9E4F0 100%)'
      },
      borderRadius: {
        card: '1.75rem'
      }
    }
  },
  plugins: []
}
