const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '376px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
    },
    fontFamily: {
      sans: ['Open Sans', 'system-ui', 'ui-sans-serif'],
    },
    fontSize: {
      // ['font-size', 'line-height']
      // defaults 1rem/16px unless specified
      xs: '0.75rem', /*12px*/
      sm: ['0.875rem', '1.25rem'], /*14px 20px*/
      base: ['1rem', '1.5rem'], /*16px 24px*/
      lg: ['1.125rem', '1.75rem'], /*18px 28px*/
      xl: ['1.25rem', '1.75rem'], /*20px 28px*/
      '2xl': ['1.5rem','2rem'], /*24px 32px*/
      '3xl': ['1.875rem', '2.25rem'], /*30px 36px*/
      '4xl': ['2.25rem', '2.5rem'], /*36px 40px*/
      '5xl': '3rem', /*48px*/
      '6xl': '3.75rem', /*60px*/
      '7xl': '4.5rem', /*72px*/
      '8xl': '6rem', /*96px*/
      '9xl': '8rem', /*128px*/
    },
    fontWeight: {
      light: '300',
      normal: '400',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    borderWidth: {
      '0': '0',
      DEFAULT: '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  darkMode: "class",
  plugins: [nextui({
    layout: {
      radius: {
        'small': '2px',
        'base': '4px',
        'medium': '6px',
        'large': '8px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        'full': '50%',
      }
    },
    themes: {
      light: {
        colors: {},
      },
      dark: {
        colors: {},
      },
      'sstheme': {
        // extend: 'dark',
        colors: {
          background: "#EFEFEF",
          foreground: "##2A2A2A",
          primary: {
            DEFAULT: '#0076CA',
            'light': '#93C5FD',
            'dark': '#0064AC'
          },
          secondary: {
            DEFAULT: '#FFFFFF',
            'light': 'blue',
            'dark': 'red'
          },
          tertiary: {
            DEFAULT: '#F97316',
          },
          success: {
            DEFAULT: '#34D399',
            'light': '#ECFDF5',
            'dark': '#047857',
          },
          warning: {
            DEFAULT: '#FBBF24',
            'light': '#FFFBEB',
            'dark': '#B45309',
          },
          danger: {
            DEFAULT: '#F87171',
            'light': '#FEF2F2',
            'dark': '#B91C1C',
          },
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
          red: {
            50: '#FEF2F2',
            100: '#F9E3E2',
            200: '#FECACA',
            300: '#FCA5A5',
            400: '#F87171',
            500: '#EF4444',
            600: '#DC2626',
            700: '#B91C1C',
            800: '#991B1B',
            900: '#7F1D1D',
          },
          yellow: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
          },
          orange: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#F97316',
            600: '#EA580C',
            700: '#C2410C',
            800: '#9A3412',
            900: '#7C2D12',
          },
          green: {
            50: '#ECFDF5',
            100: '#D1FAE5',
            200: '#A7F3D0',
            300: '#6EE7B7',
            400: '#34D399',
            500: '#10B981',
            600: '#059669',
            700: '#047857',
            800: '#065F46',
            900: '#064E3B',
          },
          blue: {
            50: '#EFF6FF',
            100: '#DBEAFE',
            200: '#BFDBFE',
            300: '#93C5FD',
            400: '#60A5FA',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#1D4ED8',
            800: '#1E40AF',
            900: '#1E3A8A',
          },
          indigo: {
            50: '#EEF2FF',
            100: '#E0E7FF',
            200: '#C7D2FE',
            300: '#A5B4FC',
            400: '#818CF8',
            500: '#6366F1',
            600: '#4F46E5',
            700: '#4338CA',
            800: '#352E9C',
            900: '#312E81',
          },
          purple: {
            50: '#F5F3FF',
            100: '#EDE9FE',
            200: '#DDD6FE',
            300: '#C4B5FD',
            400: '#A78BFA',
            500: '#8B5CF6',
            600: '#7C3AED',
            700: '#6D28D9',
            800: '#5B21B6',
            900: '#4C1D95',
          },
          pink: {
            50: '#FDF2F8',
            100: '#FCE7F3',
            200: '#FBCFE8',
            300: '#F9A8D4',
            400: '#F472B6',
            500: '#EC4899',
            600: '#DB2777',
            700: '#BE185D',
            800: '#9D174D',
            900: '#831843',
          },
        },
      },
    },
  })]
}