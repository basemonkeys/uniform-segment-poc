const { nextui } = require("@nextui-org/react");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)", ...defaultTheme.fontFamily.sans],
      },
      // all Tailwind default colors are available as usual. https://tailwindcss.com/docs/customizing-colors.
      // The SilverSneakers color pallette, with selective Tailwind colors, is available at https://www.figma.com/file/0mNynYMtKUNq85fViOFopX/Comp-Sheet?type=design&node-id=65-1141&mode=dev
      // The other colors below are custom to SilverSneakers... they are not the NextUI Semantic colors
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
          hover: "#E5E7EB",
        },
        success: {
          DEFAULT: "#34D399",
          light: "#ECFDF5",
          dark: "#047857",
          hover: "#A7F3D0",
        },
        danger: {
          DEFAULT: "#F87171",
          light: "#FEF2F2",
          dark: "#B91C1C",
          hover: "#FECACA",
        },
        warning: {
          DEFAULT: "#FBBF24",
          light: "#FFFBEB",
          dark: "#B45309",
          hover: "#FDE68A",
        },
        info: {
          DEFAULT: "#60A5FA",
          light: "#EFF6FF",
          dark: "#1D4ED8",
          hover: "#BFDBFE",
        },
        link: {
          DEFAULT: "#0076CA",
          hover: "#0064AC",
        },
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
    fontSize: {
      // ['font-size', 'line-height']
      // defaults 1rem/16px unless specified
      xs: "0.75rem" /*12px*/,
      sm: ["0.875rem", "1.25rem"] /*14px 20px*/,
      base: ["1rem", "1.5rem"] /*16px 24px*/,
      lg: ["1.125rem", "1.75rem"] /*18px 28px*/,
      xl: ["1.25rem", "1.75rem"] /*20px 28px*/,
      "2xl": ["1.5rem", "2rem"] /*24px 32px*/,
      "3xl": ["1.875rem", "2.25rem"] /*30px 36px*/,
      "4xl": ["2.25rem", "2.5rem"] /*36px 40px*/,
      "5xl": "3rem" /*48px*/,
      "6xl": "3.75rem" /*60px*/,
      "7xl": "4.5rem" /*72px*/,
      "8xl": "6rem" /*96px*/,
      "9xl": "8rem" /*128px*/,
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    nextui({
      // this allows the use of Tailwind's default colors with NextUI's theme. https://tailwindcss.com/docs/customizing-colors
      // addCommonColors: true,
      defaultTheme: "light",
      themes: {
        light: {
          // We are not currently using NextUI's semantic colors. See custom colors above.
          colors: {},
        },
      },
      layout: {
        radius: {
          small: "2px",
          base: "4px",
          medium: "6px",
          large: "8px",
          xl: "12px",
          "2xl": "16px",
          "3xl": "24px",
          full: "50%",
        },
        borderWidth: {
          0: "0",
          DEFAULT: "1px",
          2: "2px",
          3: "3px",
          4: "4px",
          6: "6px",
          8: "8px",
        },
      },
    }),
  ],
};
