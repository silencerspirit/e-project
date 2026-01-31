import type { Config } from 'tailwindcss';

export default {
  content: ['./frontend/src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
