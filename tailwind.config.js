/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#F4252F",
          light: "#F75A5A",
          dark: "#B31C1C",
        },
        oro: {
          DEFAULT: "#FFFF4A",
          shadow: "#B7900F",
        },
        plata: {
          DEFAULT: "#90C1DB",
          shadow: "#4D6775",
        },
        rubi: {
          DEFAULT: "#F42630",
          shadow: "#8E161C",
        },
      },
    },
  },
  plugins: [],
};
