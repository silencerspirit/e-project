import type { Config } from 'tailwindcss';

import plugin from 'tailwindcss/plugin';

import {
  borderRadius,
  boxShadow,
  colors,
  fontFamily,
  getCustomComponents,
  getFontComponents,
  getRoot,
  letterSpacing,
  screens,
  spacing,
} from './design.config';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      spacing,
      colors,
      screens,
      boxShadow,
    },
    fontFamily,
    borderRadius,
    letterSpacing,
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        ':root': getRoot(),
        ...getFontComponents(theme),
        ...getCustomComponents(theme),

        // полезные утилиты под каталог
        '.grid-12': {
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gap: theme('spacing.grid-md'),
        },
        '.aspect-card': {
          aspectRatio: '4 / 3',
          width: '100%',
          height: 'auto',
        },
        '.aspect-hero': {
          aspectRatio: '16 / 7',
          width: '100%',
          height: 'auto',
          minHeight: '240px',
        },
      });
    }),
  ],
  corePlugins: {
    container: false, // мы используем .ui-container
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  safelist: [
    { pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/ },
    { pattern: /gap-(pad|grid)-(3xs|xxs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl)/ },
    { pattern: /min-h-(btn|inp)-(xs|sm|md|lg)/ },
  ],
} satisfies Config;
