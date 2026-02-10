import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { colors, getCustomComponents, getFontComponents, getRoot, letterSpacing, spacing } from './design.config';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      spacing,
      colors,
    },
    fontFamily: {
      sans: ['Overpass', 'system-ui', 'sans-serif'],
    },
    letterSpacing,
    lineHeight: {
      '1': '1',
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        ':root': getRoot(),
        ...getFontComponents(),
        ...getCustomComponents(theme),
      });
    }),
  ],
  corePlugins: {
    container: false,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  safelist: [
    { pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/ },
    { pattern: /gap-(pad|grid)-(3xs|xxs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl)/ },
  ],
} satisfies Config;
