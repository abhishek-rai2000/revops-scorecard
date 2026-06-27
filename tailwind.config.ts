import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#FBF8F1",
          100: "#F7F4ED",
          200: "#EFE9DD",
          300: "#E3D9C4",
        },
        ink: {
          900: "#15140F",
          800: "#26241D",
          700: "#3A372E",
          600: "#5C5749",
          500: "#7E7867",
          400: "#A39C88",
        },
        ember: {
          50: "#FDF4EC",
          100: "#FAE3CD",
          400: "#E8814A",
          500: "#D86727",
          600: "#C2410C",
          700: "#9C3308",
          800: "#7C2A09",
        },
        moss: {
          400: "#7BA05B",
          600: "#4D6B36",
          700: "#3B5128",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"General Sans"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        prose: "65ch",
        narrow: "42rem",
        canvas: "72rem",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;


