/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': '#2563eb',
        'medical-light-blue': '#dbeafe',
        'medical-dark-blue': '#1e40af',
        'medical-gray': '#f8fafc',
        'medical-text': '#1e293b',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
