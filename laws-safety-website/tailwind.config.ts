import type { Config } from 'tailwindcss';

/**
 * Brand tokens, mirrored from the Laws Safety design system
 * (tokens.json). Colours are named as the design system names them so a class
 * in a component reads the same as the token in the brand book.
 */
const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      colors: {
        navy: {
          900: '#070e1c',
          800: '#0a1426',
          700: '#0d1b33',
          600: '#142848',
        },
        gold: {
          DEFAULT: '#d4af37',
          deep: '#c9962b',
          bright: '#f2c75c',
          ink: '#866d1d',
        },
        blue: {
          DEFAULT: '#4171a8',
          bright: '#4c90c7',
          glow: '#428eec',
        },
        ink: {
          DEFAULT: '#232f45',
          muted: '#4a5773',
          // On navy grounds.
          light: '#e6ecf7',
          'light-muted': '#a9b7d0',
          'light-soft': '#dce4f2',
        },
        surface: {
          DEFAULT: '#ffffff',
          raised: '#f4f6fa',
          deep: '#e9edf4',
        },
      },
      fontFamily: {
        sans: ['var(--font-sora)', 'Avenir Next', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.32em',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        emblem: '0 8px 16px rgba(35,47,69,0.16)',
        'emblem-dark': '0 26px 48px rgba(0,0,0,0.62)',
        card: '0 8px 26px rgba(35,47,69,0.10)',
        'card-dark': '0 8px 26px rgba(0,0,0,0.55)',
      },
      maxWidth: {
        site: '80rem', // 1280px
        prose: '42rem',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(ellipse 980px 660px at 50% 42%, #142848 0%, #0d1b33 42%, #070e1c 100%)',
        'hero-grid': 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
        'gold-rule': 'linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.35) 50%, rgba(212,175,55,0) 100%)',
      },
      backgroundSize: {
        grid: '72px 72px',
      },
    },
  },
  plugins: [],
};

export default config;
