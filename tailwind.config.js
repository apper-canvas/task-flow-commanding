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
        primary: '#635BFF',
        secondary: '#7A73FF',
        accent: '#E0DFFE',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#635BFF',
        surface: '#FFFFFF',
        background: '#F7FAFC',
      },
boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
        'fab': '0 4px 12px rgba(99, 91, 255, 0.3)',
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