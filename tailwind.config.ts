import { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        'calendar-fragment': '150px',
        calendar: '1390px',
      },
      width: {
        '4/10': '40%',
      },
      maxWidth: {
        calendar: '200px',
      },
      borderColor: {
        event: '#6e9ecf',
      },
      backgroundColor: {
        event: '#e2ecf5',
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
}

export default config
