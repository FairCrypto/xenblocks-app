import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      accent: "bg-accent",
      primary: "bg-accent",
    },
  },
  safelist: [
    {
      pattern: /^(bg-|border-|text-)/,
      variants: ["hover", "active"],
    },
  ],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  darkMode: 'media',
  daisyui: {
    themes: [
      {
        xenblocks: {
          "primary": "#19FF14",
          "primary-focus": "#19FF14",
          "primary-content": "#000000",
          "secondary": "#334143",
          "secondary-focus": "#445759",
          "secondary-content": "#000000",
          "accent": "#ffffff",
          "accent-focus": "#2ba59b",
          "accent-content": "#000000",
          "neutral": "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#B1B1B1",
          "base-100": "#161616",
          "base-200": "#070C0D",
          "base-300": "#444444",
          "base-content": "#B1B1B1",
          "info": "#2094f3",
          "success": "#009485",
          "warning": "#ff9900",
          "error": "#FF1414",
          "--rounded-box": "0",
          "--rounded-btn": "0",
          "--rounded-badge": "0",
          "--tab-radius": "0",
          "fontFamily":
            "PT Mono",
          "body": {
            "fontFamily":
              "ProtoMono",
         },
          "h1": {
            "fontFamily": "ProtoMono",
          },
          "h2": {
            "fontFamily": "ProtoMono",
          },
          "h3": {
            "fontFamily": "ProtoMono",
          },
          "h4": {
            "fontFamily": "ProtoMono",
          },
          ".btn": {
            "fontFamily": "ProtoMono",
          },
          ".tab": {
            "fontFamily": "ProtoMono",
          },
          ".alert": {
            "border": "2px",
            "fontFamily": "ProtoMono",
          },
          ".btn-lg": {
            "height": "3rem",
            "minHeight": "3rem",
          },
        }
      }
    ]
  },
};

export default config;
