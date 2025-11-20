/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
        colors: {
            primary: {
                DEFAULT: '#1e3a8a',
                light: '#3b82f6',
                dark: '#1e40af',
            }
        }
    }
  },
  plugins: [],
}

