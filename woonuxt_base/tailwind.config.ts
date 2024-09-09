import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],

  // theme: {
  //   extend: {
  //     animation: {
  //       blink: 'blink 1.2s infinite steps(1, start)',
  //     },
  //     keyframes: {
  //       blink: {
  //         '0%, 100%': { 'background-color': 'currentColor' },
  //         '50%': { 'background-color': 'transparent' },
  //       },
  //     },
  //   },
  //   container: {
  //     center: true,
     
  //     padding: {
  //       DEFAULT: '1rem',
  //       sm: '2rem',
  //       lg: '4rem',
  //       xl: '5rem',
  //       '2xl': '6rem',
  //     },
  //   },
  // },
  // plugins:  [require("daisyui")],
  // daisyui: {
  //   themes: ["light", "dark", "synthwave"],
  //   darkTheme: "synthwave", 
  // },
  theme: {
    container: {
      center: true,
            padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: {
          light: '#AE7DDD',
          DEFAULT: process.env.PRIMARY_COLOR || '#7F54B2',
          dark: '#754fa3',
        },
      },
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
