/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundImage: {
      "gradient": "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)",
      'overlay-preview': 'linear-gradient(180deg, rgba(13, 3, 26, 0.25) 0%, rgba(13, 3, 26, 0) 18.09%, rgba(13, 3, 26, 0) 81.75%, rgba(13, 3, 26, 0.25) 100%)',
    }
  },
  plugins: [],
}