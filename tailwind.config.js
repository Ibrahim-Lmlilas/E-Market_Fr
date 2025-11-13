/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
        muted: "#64748B",
        surface: "#FFFFFF",
        border: "#000000",
      },
    },
  },
  plugins: [],
};

