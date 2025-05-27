/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC', // Deep ocean blue
        secondary: '#3B82F6', // Ocean blue
        accent: '#06B6D4', // Aqua blue
        background: '#F1F5F9', // Light blue-gray
        'ocean-light': '#60A5FA', // Light ocean blue
        'ocean-dark': '#1E40AF', // Dark ocean blue
        'ocean-teal': '#0891B2', // Ocean teal
      },
    },
    screens: {
      xs: '331px',
      sm: '480px',
      md: '768px',
      lg: '1124px',
      xl: '1440px',
    },
  },
  plugins: [],
};
