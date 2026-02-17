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
        // Kolory podstawowe
        primary: {
          DEFAULT: "#dfbb68",
          dark: "#d4a847",
          light: "#e8cc8a",
        },
        // Kolory tła
        background: {
          dark: "#1a1a1a",
          light: "#fafaf9",
          pattern: "#f0f0ee",
          cream: "#f5f5f3",
          beige: "#efebe7",
        },
        surface: {
          dark: "#4a4a4a",
          light: "#ffffff",
        },
        // Kolory tekstu
        text: {
          primary: "#1a1a1a",
          dark: "#1a1a1a",
          secondary: "#9ca3af", // Improved contrast for dark backgrounds (was #6b7280)
          muted: "#a3a3a3",
        },
        // Kolory obramowań
        border: {
          light: "#e5e5e5",
          dark: "#27272a",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Funnel Sans", "sans-serif"],
      },
      fontSize: {
        // Skala typograficzna — Dwellis Design System
        "hero": ["3.5rem", { lineHeight: "1.1", fontWeight: "600" }],    // h1: 56px
        "display": ["2.5rem", { lineHeight: "1.15", fontWeight: "600" }], // h2: 40px
        "h2": ["2.5rem", { lineHeight: "1.15", fontWeight: "600" }],      // h2: 40px
        "h3": ["2rem", { lineHeight: "1.2", fontWeight: "600" }],         // h3: 32px
        "h4": ["1.75rem", { lineHeight: "1.2", fontWeight: "600" }],      // h4: 28px
        "h5": ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],      // h5: 20px
        "h6": ["1.125rem", { lineHeight: "1.3", fontWeight: "500" }],     // h6: 18px
        "body-lg": ["1.25rem", { lineHeight: "1.5", fontWeight: "400" }], // 20px
        "body-md": ["1rem", { lineHeight: "1.5", fontWeight: "400" }],    // 16px
        "body-sm": ["0.95rem", { lineHeight: "1.5", fontWeight: "400" }], // ~15px
        "body-xs": ["0.755rem", { lineHeight: "1.4", fontWeight: "400" }],// ~12px
        "label": ["0.875rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.05em" }],
      },
      borderRadius: {
        "sm": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px",
      },
      boxShadow: {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      spacing: {
        // Dodatkowe wartości spacing jeśli potrzeba
      },
    },
  },
  plugins: [],
};

export default config;

