import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cyber-blue": "#00ffff",
        "cyber-purple": "#8b5cf6",
        "cyber-pink": "#ec4899",
        "dark-bg": "#0a0a0a",
        "dark-surface": "#1a1a1a",
      },
      fontFamily: {
        mono: ["Geist Mono", "monospace"],
        sans: ["Geist", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00ffff" },
          "100%": { boxShadow: "0 0 20px #00ffff, 0 0 30px #00ffff" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
