module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#1976d2',
      secondary: '#9c27b0',
      error: '#d32f2f',
      warning: '#ED6C02',
      info: '#0288d1',
      success: '#2e7d32'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
