/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"DM Sans"', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
colors: {
        primary: '#60A5FA',
        secondary: '#93C5FD',
        accent: '#DBEAFE',
        success: '#34D399',
        warning: '#FCD34D',
        error: '#F87171',
        info: '#60A5FA',
        surface: '#FFFFFF',
        background: '#FFFFFF',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.05)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.08)',
        'fab': '0 2px 8px rgba(96, 165, 250, 0.2)',
      },
      animation: {
        'confetti': 'confetti 0.8s ease-out',
        'strike-through': 'strike-through 0.4s ease-out',
        'fade-out': 'fade-out 0.8s ease-out 0.4s',
      },
      keyframes: {
        'confetti': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        'strike-through': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}