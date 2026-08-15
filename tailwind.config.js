/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a0a0c',
          card: 'rgba(18, 18, 22, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
          gold: '#d4af37',
          goldGlow: '#f3e5ab',
          amber: '#e28743',
          rose: '#e056fd',
          emerald: '#00b894',
          oud: '#6c5ce7',
          muted: '#8e8e93',
          cream: '#fbf9f5',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.25)',
        'glow-amber': '0 0 25px rgba(226, 135, 67, 0.25)',
        'glow-rose': '0 0 25px rgba(224, 86, 253, 0.25)',
        'glow-emerald': '0 0 25px rgba(0, 184, 148, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
