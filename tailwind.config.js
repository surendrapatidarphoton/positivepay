/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: "#3490dc",
      white: "#fff",
      gray: "#808080",
      lightgray: "#D3D3D3",
    },
    extend: {
      tableLayout: ["hover", "focus"],
    },
  },
  plugins: [],
};
