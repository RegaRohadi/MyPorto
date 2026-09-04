/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gba: {
          bg: 'var(--gba-bg)',
          fg: 'var(--gba-fg)',
          muted: 'var(--gba-muted)',
          hl: 'var(--gba-hl)',
          accent: 'var(--gba-accent)',
          screen: 'var(--gba-screen)',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderWidth: { bezel: '10px' },
    },
  },
  plugins: [],
}
