/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "bottom-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "right-shadow": "4px 0 6px -1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
