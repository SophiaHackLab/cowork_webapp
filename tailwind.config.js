/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#FFFFFF',
        'bg-secondary': '#f9fbfc',
        'bg-third': '#FCFBFC',
        'bg-fourth': '#F3F3F3',
        'bg-fifth': '#dcdcdc',

        'fg-main': '#2A2A2A',
        'fg-secondary': '#8E8D94',
        'fg-light': '#FFFFFF',

        'border-card': '#F0F0F0',
        'border-main': '#E5E5E5'
      }
    }
  },
  plugins: []
}
