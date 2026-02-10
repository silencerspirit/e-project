import type { PluginAPI } from 'tailwindcss/types/config';

export const designMap = {
  large: {
    'media-space': {
      '4xs': '2px',
      '3xs': '4px',
      xxs: '8px',
      xs: '12px',
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px',
      xxl: '40px',
      '3xl': '56px',
      '4xl': '80px',
      '5xl': '120px',
    },
    'media-font-size': {
      xl: '21px',
      lg: '18px',
      md: '16px',
      sm: '14px',
      xs: '12px',
      xxs: '11px',
    },
    'media-line-height': {
      lg: '26px',
      md: '24px',
      sm: '20px',
      xs: '18px',
      xxs: '16px',
    },
  },
  sizing: {
    '4': '4px',
    '6': '6px',
    '8': '8px',
    '10': '10px',
    '12': '12px',
    '14': '14px',
    '16': '16px',
    '18': '18px',
    '20': '20px',
    '24': '24px',
    '28': '28px',
    '32': '32px',
    '36': '36px',
    '40': '40px',
    '44': '44px',
    '48': '48px',
    '56': '56px',
    '64': '64px',
    '72': '72px',
    '80': '80px',
  },
} as const;

type Space = Exclude<keyof typeof designMap, 'sizing'>;
type MediaKey = keyof (typeof designMap)[Space];
type SizeKey = keyof (typeof designMap)[Space][MediaKey];

function createCSSValues<L1 extends Space, L2 extends MediaKey>(
  name: string,
  space: L1,
  spaceKey: L2,
): Record<string, string> {
  return Object.keys(designMap[space][spaceKey]).reduce(
    (acc, key) => {
      const value = designMap[space][spaceKey][key as SizeKey];
      acc[`--${name}-${key}`] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export const getRoot = () => ({
  ...createCSSValues('space', 'large', 'media-space'),
  ...createCSSValues('font', 'large', 'media-font-size'),
  ...createCSSValues('lh', 'large', 'media-line-height'),
});

function createTailwindSpacing() {
  const padSpace = {
    'pad-3xs': 'var(--space-3xs)',
    'pad-xxs': 'var(--space-xxs)',
    'pad-xs': 'var(--space-xs)',
    'pad-sm': 'var(--space-sm)',
    'pad-md': 'var(--space-md)',
    'pad-lg': 'var(--space-lg)',
    'pad-xl': 'var(--space-xl)',
    'pad-2xl': 'var(--space-xxl)',
    'pad-3xl': 'var(--space-3xl)',
    'pad-4xl': 'var(--space-4xl)',
    'pad-5xl': 'var(--space-5xl)',
  };

  const gridSpace = {
    'grid-3xs': 'var(--space-3xs)',
    'grid-xxs': 'var(--space-xxs)',
    'grid-xs': 'var(--space-xs)',
    'grid-sm': 'var(--space-sm)',
    'grid-md': 'var(--space-md)',
    'grid-lg': 'var(--space-lg)',
    'grid-xl': 'var(--space-xl)',
    'grid-2xl': 'var(--space-xxl)',
  };

  const sizing = Object.keys(designMap.sizing).reduce(
    (acc, key) => {
      acc[`sz-${key}`] = designMap.sizing[key as keyof typeof designMap.sizing];
      return acc;
    },
    {} as Record<string, string>,
  );

  return Object.assign({}, padSpace, gridSpace, sizing, {
    inherit: 'inherit',
  }) as Record<string, string>;
}

export const spacing = createTailwindSpacing();

export const letterSpacing = {
  normal: 'normal',
  xs: '0.2px',
  sm: '0.6px',
  md: '1px',
  lg: '1.2px',
};

export const colors = {
  red: '#a01d29',
  blue: '#1d4d5f',
  black: '#353434',
  grey: '#808080',
  'grey-light': '#f4f4f4',
  'grey-soft': '#b2b2b2',
  'grey-dark': '#666464',
  green: '#576e75',
};

export const getFontComponents = (): Record<string, unknown> => ({
  '.h1': {
    fontSize: 'var(--font-xl)',
    lineHeight: 'var(--lh-lg)',
  },
  '.h2': {
    fontSize: 'var(--font-lg)',
    lineHeight: 'var(--lh-md)',
  },
  '.h3': {
    fontSize: 'var(--font-md)',
    lineHeight: 'var(--lh-md)',
  },
  '.h4': {
    fontSize: 'var(--font-sm)',
    lineHeight: 'var(--lh-sm)',
  },
  '.h5': {
    fontSize: 'var(--font-xs)',
    lineHeight: 'var(--lh-xs)',
  },
  '.h6': {
    fontSize: 'var(--font-xxs)',
    lineHeight: 'var(--lh-xxs)',
  },
});

export const getCustomComponents = (theme: PluginAPI['theme']): Record<string, unknown> => ({
  '.ui-container': {
    maxWidth: '1140px',
    margin: '0 auto',
    paddingInline: theme('spacing.pad-sm'),
  },
  '.negative-x-margin': {
    marginInline: 'calc(var(--space-sm) * -1)',
  },
  '.custom-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    gap: theme('spacing.grid-md'),
  },
});
