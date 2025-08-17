/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb" // blue-600
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
