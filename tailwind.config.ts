import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effdf5",
          100: "#d8fbe7",
          200: "#b4f5cf",
          500: "#009b4d",
          600: "#007d3d",
          700: "#006331",
        },
        ink: "#1d2b24",
        paper: "#f4f8f4",
      },
      boxShadow: { soft: "0 8px 30px rgba(22,51,37,.07)" },
    },
  },
  plugins: [],
};
export default config;
