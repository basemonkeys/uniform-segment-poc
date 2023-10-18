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
    extend: {
      // The SilverSneakers color pallette, with selective Tailwind colors, is available at https://www.figma.com/file/0mNynYMtKUNq85fViOFopX/Comp-Sheet?type=design&node-id=65-1141&mode=dev. The other colors below are custom to SilverSneakers.
      colors: {
        transparent: "transparent",
        background: "#FFFFFF",
        foreground: "#111827",
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
      // this typography object customizes the default typography that is customizable via prose. Use the `prose` class in the markup then add customizations here. See https://tailwindcss.com/docs/typography-plugin#customizing-the-default-styles
      typography: {
        DEFAULT: {
          css: {
            // prose css variable colors
            "--tw-prose-body": "#111827",
            "--tw-prose-links": "#2563EB",
            "--tw-prose-bullets": "#111827",
            "--tw-prose-invert-bullets": "#111827",
            a: {
              textDecoration: "none",
              "&:hover": {
                color: "#1E40AF",
              },
            },
            h1: {
              marginTop: "none",
            },
            h2: {
              marginTop: "none",
            },
            h3: {
              marginTop: "none",
            },
            h4: {
              marginTop: "none",
            },
            p: {
              marginBottom: "1.5rem",
            },
            table: {
              "& td": {
                width: "340px",
                padding: "1rem",
                borderWidth: "1px",
              },
              "& tr:nth-child(odd)": {
                backgroundColor: "#f3f4f6",
              },
            },
            ul: {
              "& li ul li": {
                listStyleType: "circle",
              },
            },
          },
        },
      },
      borderWidth: {
        DEFAULT: "1px",
        2: "2px",
        3: "3px",
        6: "6px",
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
