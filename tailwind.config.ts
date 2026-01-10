import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          50: '#e8f4f8',
          100: '#d0e9f1',
          200: '#a1d3e3',
          300: '#72bdd5',
          400: '#43a7c7',
          500: '#0a66c2', // LinkedIn brand color
          600: '#08529b',
          700: '#063e74',
          800: '#042a4d',
          900: '#021526',
        },
      },
    },
  },
  plugins: [],
};

export default config;
