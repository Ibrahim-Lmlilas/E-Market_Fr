/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#059669",
          foreground: "#FFFFFF",
        },
        muted: "#64748B",
        surface: "#F8FAFC",
        border: "#E2E8F0",
      },
    },
  },
  plugins: [],
};

