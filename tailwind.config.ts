import type { Config } from 'tailwindcss';

export default {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {}
  }
} satisfies Config;
