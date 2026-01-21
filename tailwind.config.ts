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
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Skala typograficzna
        "hero": ["5.5rem", { lineHeight: "1.1", fontWeight: "800" }],
        "display": ["4rem", { lineHeight: "1.2", fontWeight: "700" }],
        "h2": ["2.5rem", { lineHeight: "1.3", fontWeight: "700" }],
        "h3": ["1.6rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "label": ["0.75rem", { lineHeight: "1.4", fontWeight: "700", letterSpacing: "0.1em" }],
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

