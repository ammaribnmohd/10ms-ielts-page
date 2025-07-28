/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        bengali: ['var(--font-inter)', 'var(--font-noto-sans-bengali)', 'sans-serif'],
      },
    },
  },
  plugins: [
    typography,
    aspectRatio,
  ],
}