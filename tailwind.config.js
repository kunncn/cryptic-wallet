/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#0052FF",
        secondary: "#E9EBEE",
      },
      screens: {
        "hero-desktop": "950px",
        "hero-tablet": "380px",
        "hero-mobile": "0px",
      },
    },
  },
  plugins: [],
};
