/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'tech-dark': '#0a0a0a',
        'tech-navy': '#1a1a2e',
        'tech-blue': '#00d4ff',
        'tech-purple': '#7c3aed',
        'tech-green': '#00ff88',
        'tech-indigo': '#312e81',
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        'glow-gradient': 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
        'grid-pattern': 'linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%, transparent)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' },
          '50%': { opacity: '1', textShadow: '0 0 30px rgba(0, 212, 255, 1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-md': '0 0 40px rgba(0, 212, 255, 0.5)',
        'glow-lg': '0 0 60px rgba(0, 212, 255, 0.7)',
        'glow-purple': '0 0 40px rgba(124, 58, 237, 0.5)',
        'neon': '0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 20px rgba(0, 255, 136, 0.1)',
      },
    },
  },
  plugins: [],
};
