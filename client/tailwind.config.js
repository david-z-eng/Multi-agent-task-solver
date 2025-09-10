/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#0a0a0a',
          dark: '#1a1a1a',
          gray: '#2a2a2a',
          light: '#6a6a6a',
          white: '#ffffff',
          green: '#00ff88',
          pink: '#ff0088',
          purple: '#8800ff',
          blue: '#0088ff',
          orange: '#ff8800',
          red: '#ff4444',
        },
        neon: {
          green: '#00ff88',
          pink: '#ff0088',
          purple: '#8800ff',
          blue: '#0088ff',
          orange: '#ff8800',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        glitch: 'glitch 0.3s infinite',
        holographic: 'holographic 3s ease infinite',
        'data-stream': 'data-stream 3s linear infinite',
        'cyber-loading': 'cyber-loading 1s linear infinite',
        'progress-shine': 'progress-shine 2s infinite',
        'pulse-neon': 'pulse-neon 2s infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        holographic: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'data-stream': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'cyber-loading': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'progress-shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px currentColor' },
          '50%': { opacity: '0.7', textShadow: '0 0 20px currentColor' },
        },
      },
      boxShadow: {
        'neon-green': '0 0 20px #00ff88',
        'neon-pink': '0 0 20px #ff0088',
        'neon-purple': '0 0 20px #8800ff',
        'neon-blue': '0 0 20px #0088ff',
        cyber: '0 0 30px rgba(0, 255, 136, 0.3)',
      },
    },
  },
  plugins: [],
};
