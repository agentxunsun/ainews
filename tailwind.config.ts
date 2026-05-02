import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        signal: {
          bg: "#0a0a0b",
          panel: "#111216",
          card: "#15171d",
          line: "#252934",
          text: "#f3f5f7",
          muted: "#9aa3af",
          green: "#7cf7bf",
          blue: "#78a7ff",
          amber: "#ffd37a",
          red: "#ff8b8b"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124, 247, 191, 0.08), 0 20px 80px rgba(0, 0, 0, 0.38)"
      }
    }
  },
  plugins: []
};

export default config;
