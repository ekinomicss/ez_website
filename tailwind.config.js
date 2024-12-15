/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'courier': ['Courier New', 'monospace'],
        'robot': ['Roboto Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

