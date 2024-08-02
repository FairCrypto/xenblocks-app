import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
      // "light",
      // "dark",
      // "cupcake",
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "synthwave",
      // "retro",
      // "cyberpunk",
      // "valentine",
      // "halloween",
      // "garden",
      // "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      // "fantasy",
      // "wireframe",
      // "black",
      // "luxury",
      // "dracula",
      // "cmyk",
      // "autumn",
      // "business",
      // "acid",
      // "lemonade",
      // "night",
      // "coffee",
      // "winter",
      // "dim",
      // "nord",
      // "sunset",
      {
        xenblocks: {
          "primary": "#19FF14",
          "primary-focus": "#19FF14", // You can adjust this to make it slightly darker for the focus state
          "primary-content": "#000000", // Text color on primary background
          "secondary": "#334143", // Secondary color, adjust as needed
          "secondary-focus": "#445759", // Focus state for secondary color
          "secondary-content": "#000000", // Text color on secondary background
          "accent": "#ffffff", // Accent color, adjust as needed
          "accent-focus": "#2ba59b", // Focus state for accent color
          "accent-content": "#000000", // Text color on accent background
          "neutral": "#3d4451", // Neutral color, adjust as needed
          "neutral-focus": "#2a2e37", // Focus state for neutral color
          "neutral-content": "#B1B1B1", // Text color on neutral background
          "base-100": "#161616", // Base color for backgrounds
          "base-200": "#070C0D", // Base color for slightly darker backgrounds
          "base-300": "#444444", // Base color for even darker backgrounds
          "base-content": "#B1B1B1", // Base text color
          "info": "#2094f3", // Info color
          "success": "#009485", // Success color
          "warning": "#ff9900", // Warning color
          "error": "#FF1414", // Error color
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
            "border": "2px dashed",
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
