export default{
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#3F3D3D',
        'secondary': '#91959D',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      container: {
        padding: "2rem",
        center: true,
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
};
