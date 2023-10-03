/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        // sm: "1rem",
        // lg: "4rem",
        // xl: "5rem",
        // "2xl": "6rem",
      },
    },
    screens: {
      xs: "376px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1366px",
    },
    fontFamily: {
      sans: ["var(--font-open-sans)", ...defaultTheme.fontFamily.sans],
    },
    // The SilverSneakers color pallette, with selective Tailwind colors, is available at https://www.figma.com/file/0mNynYMtKUNq85fViOFopX/Comp-Sheet?type=design&node-id=65-1141&mode=dev
    // The other colors below are custom to SilverSneakers.
    extend: {
      borderWidth: {
        DEFAULT: "1px",
        2: "2px",
        3: "3px",
        6: "6px",
      },
      colors: {
        transparent: "transparent",
        background: "#FFFFFF",
        foreground: "#11181C",
        primary: {
          DEFAULT: "#0076CA",
          light: "#93C5FD",
          dark: "#0064AC",
        },
        secondary: {
          DEFAULT: "#F97316",
        },
        default: {
          DEFAULT: "#9CA3AF",
          light: "#F9FAFB",
          dark: "#374151",
          hover: "#F3F4F6",
        },
        success: {
          DEFAULT: "#34D399",
          light: "#ECFDF5",
          dark: "#047857",
          hover: "#A7F3D0",
        },
        warning: {
          DEFAULT: "#FBBF24",
          light: "#FFFBEB",
          dark: "#B45309",
          hover: "#FDE68A",
        },
        danger: {
          DEFAULT: "#F87171",
          light: "#FEF2F2",
          dark: "#B91C1C",
          hover: "#FECACA",
        },
        info: {
          DEFAULT: "#60A5FA",
          light: "#EFF6FF",
          dark: "#1D4ED8",
          hover: "#BFDBFE",
        },
        link: {
          DEFAULT: "#2563EB",
          hover: "#1E40AF",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
