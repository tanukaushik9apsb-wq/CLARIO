/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unfold: {
          blue: '#172F91',
          navy: '#101A3A',
          cream: '#FFF2D8',
          white: '#F8F8FC',
          sky: '#8CB7FF',
          green: '#27866B',
          muted: '#A8B3D4',
          surface: '#0d152e',
          card: '#142147',
          border: 'rgba(255, 242, 216, 0.15)',
          creamBorder: 'rgba(255, 242, 216, 0.3)',
          creamMuted: '#e8dcbf',
          creamDark: '#362b1a',
        },
        bento: {
          canvas: '#E5E7EB',
          canvasLight: '#ECEEF2',
          card: '#FFFFFF',
          lilac: '#DEE5FC',
          peach: '#FCD7B6',
          lime: '#DDF587',
          dark: '#111827',
          muted: '#64748B',
          border: '#E2E4EA',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grain-pattern': "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 100%)",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
