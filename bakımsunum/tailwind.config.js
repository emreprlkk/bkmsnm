import daisyui from 'daisyui';
import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(56, 189, 248, 0.3)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    daisyui,
    tailwindcssAnimate,
  ],
  daisyui: {
    themes: [
      {
        toroslar: {
          "primary": "#38bdf8",
          "primary-content": "#002233",
          "secondary": "#818cf8",
          "secondary-content": "#0f0f2e",
          "accent": "#34d399",
          "accent-content": "#00291a",
          "neutral": "#1e293b",
          "neutral-content": "#cdd5e0",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          "base-content": "#e2e8f0",
          "info": "#38bdf8",
          "success": "#34d399",
          "warning": "#fbbf24",
          "error": "#f87171",
        },
      },
      "light",
      "dark",
    ],
  },
}
