import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0F766E", // Teal-700
          light: "#14B8A6",   // Teal-500
          dark: "#0F766E",
          hover: "#0D9488",   // Teal-600
        },
        secondary: {
          DEFAULT: "#F59E0B", // Amber-500
          light: "#FBBF24",   // Amber-400
          dark: "#D97706",    // Amber-600
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(15, 118, 110, 0.15)",
        glass: "0 8px 32px 0 rgba(15, 118, 110, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
