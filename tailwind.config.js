/** @type {import('tailwindcss').Config} */
// FORCE_REBUILD_CACHE_VITE
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',    // Zinc 950 - very deep but warm black
        surface: '#18181b',       // Zinc 900
        surfaceLight: '#27272a',  // Zinc 800
        primary: '#ffffff',
        accent: '#38bdf8',        // Sky 400 - energetic, youthful, fresh
        muted: '#a1a1aa',         // Zinc 400
      },
      fontFamily: {
        heading: ['Hagrid', 'sans-serif'],
        drama: ['Instrument Serif', 'serif'],
        body: ['Hagrid', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        regular: ['HagridRegular', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(56, 189, 248, 0.5)',
      }
    },
  },
  plugins: [],
}
