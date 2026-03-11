/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Modern Indigo
        success: "#22c55e", // Emerald Green
        warning: "#f59e0b", // Amber
      }
    },
  },
  plugins: [],
}