import type { PluginAPI } from 'tailwindcss/types/config';

/**
 * Если у тебя уже есть BREAKPOINTS в проекте — подключи его.
 * Ниже оставляю дефолт, если нужно автономно.
 */
// import { BREAKPOINTS } from './src/constants';

export const BREAKPOINTS = {
  xs: 479,
  sm: 639,
  md: 767,
  lg: 1023,
  xl: 1279,
  '2xl': 1535,
} as const;

/**
 * Палитра по текущему сайту alfa-realting (из скринов) + семантика.
 * Базовые:
 *  - brand (teal): #1F4D5F
 *  - accent (red): #AA2331
 *  - muted/border: #E8E9EA
 *  - mutedText: #A09D97
 *  - warm: #EBCEAF / #BB977F
 */
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
      // Заголовки
      '4xl': '48px', // hero h1 desktop
      '3xl': '36px', // h1
      xxl: '28px', // h2
      xl: '22px', // h3
      lg: '18px', // h4 / lead
      md: '16px', // body
      sm: '14px', // caption
      xs: '12px', // small
      xxs: '11px', // overline / hint
    },
    'media-line-height': {
      // подобрано под читабельность и “премиальный” тон
      '4xl': '56px',
      '3xl': '44px',
      xxl: '36px',
      xl: '30px',
      lg: '26px',
      md: '24px',
      sm: '20px',
      xs: '18px',
      xxs: '16px',
    },
  },
  small: {
    'media-space': {
      '4xs': '2px',
      '3xs': '4px',
      xxs: '8px',
      xs: '10px',
      sm: '14px',
      md: '18px',
      lg: '22px',
      xl: '28px',
      xxl: '36px',
      '3xl': '48px',
      '4xl': '64px',
      '5xl': '96px',
    },
    'media-font-size': {
      '4xl': '34px', // hero h1 mobile
      '3xl': '28px', // h1
      xxl: '22px', // h2
      xl: '20px', // h3
      lg: '16px', // h4 / lead
      md: '15px', // body
      sm: '13px', // caption
      xs: '12px', // small
      xxs: '11px', // overline / hint
    },
    'media-line-height': {
      '4xl': '40px',
      '3xl': '34px',
      xxl: '28px',
      xl: '26px',
      lg: '24px',
      md: '22px',
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

/**
 * Корневые CSS переменные:
 * - space/font/lh меняются на <= xl (можно сдвинуть брейкпоинт)
 * - цвета/радиусы/тени фиксированные и семантические
 */
export const getRoot = () => ({
  ...createCSSValues('space', 'large', 'media-space'),
  ...createCSSValues('font', 'large', 'media-font-size'),
  ...createCSSValues('lh', 'large', 'media-line-height'),

  // Semantic colors as rgb triplets for easy alpha usage
  '--c-brand': '31 77 95', // #1F4D5F
  '--c-accent': '170 35 49', // #AA2331

  '--c-bg': '255 255 255', // page background
  '--c-surface': '255 255 255', // cards
  '--c-muted': '232 233 234', // #E8E9EA borders/section bg
  '--c-mutedText': '160 157 151', // #A09D97 secondary text

  '--c-text': '17 24 39', // slate-900
  '--c-text2': '55 65 81', // slate-700

  '--c-warm': '235 206 175', // #EBCEAF
  '--c-warm2': '187 151 127', // #BB977F

  '--c-success': '16 185 129', // emerald-500-ish
  '--c-error': '239 68 68', // red-500-ish
  '--c-warning': '245 158 11', // amber-500-ish

  // Radii tokens
  '--r-sm': '12px',
  '--r-md': '16px',
  '--r-lg': '20px',
  '--r-xl': '24px',

  // Shadow tokens (soft, modern)
  '--sh-1': '0 1px 2px rgba(0,0,0,.06), 0 6px 18px rgba(0,0,0,.06)',
  '--sh-2': '0 8px 30px rgba(0,0,0,.08)',
  '--sh-3': '0 14px 40px rgba(0,0,0,.10)',

  // Container paddings
  '--container-x': 'var(--space-lg)',

  [`@media (max-width: ${BREAKPOINTS.xl}px)`]: {
    ...createCSSValues('space', 'small', 'media-space'),
    ...createCSSValues('font', 'small', 'media-font-size'),
    ...createCSSValues('lh', 'small', 'media-line-height'),

    '--container-x': 'var(--space-md)',
  },
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

  // CTA “все перечисленное” — нужны удобные высоты
  const button = {
    'btn-xs': designMap.sizing['32'],
    'btn-sm': designMap.sizing['36'],
    'btn-md': designMap.sizing['44'],
    'btn-lg': designMap.sizing['48'],
  };

  const input = {
    'inp-sm': designMap.sizing['40'],
    'inp-md': designMap.sizing['44'],
    'inp-lg': designMap.sizing['48'],
  };

  const icon = {
    'icon-sm': designMap.sizing['16'],
    'icon-md': designMap.sizing['20'],
    'icon-lg': designMap.sizing['24'],
    'icon-xl': designMap.sizing['32'],
  };

  const sizing = Object.keys(designMap.sizing).reduce(
    (acc, key) => {
      acc[`sz-${key}`] = designMap.sizing[key as keyof typeof designMap.sizing];
      return acc;
    },
    {} as Record<string, string>,
  );

  return Object.assign({}, padSpace, gridSpace, button, input, icon, sizing, {
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

export const fontFamily = {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
};

export const colors = {
  // semantic (rgba via rgb triplets)
  brand: 'rgb(var(--c-brand) / <alpha-value>)',
  accent: 'rgb(var(--c-accent) / <alpha-value>)',

  bg: 'rgb(var(--c-bg) / <alpha-value>)',
  surface: 'rgb(var(--c-surface) / <alpha-value>)',
  muted: 'rgb(var(--c-muted) / <alpha-value>)',

  text: 'rgb(var(--c-text) / <alpha-value>)',
  text2: 'rgb(var(--c-text2) / <alpha-value>)',
  mutedText: 'rgb(var(--c-mutedText) / <alpha-value>)',

  warm: 'rgb(var(--c-warm) / <alpha-value>)',
  warm2: 'rgb(var(--c-warm2) / <alpha-value>)',

  success: 'rgb(var(--c-success) / <alpha-value>)',
  error: 'rgb(var(--c-error) / <alpha-value>)',
  warning: 'rgb(var(--c-warning) / <alpha-value>)',

  white: '#FFFFFF',
  black: '#0B1220',
};

export const screens = Object.keys(BREAKPOINTS).reduceRight(
  (acc, key) => {
    const width = BREAKPOINTS[key as keyof typeof BREAKPOINTS];
    // как в твоём примере — max-width медиазапросы
    acc[key] = { raw: `all and (max-width: ${width}px)` };
    return acc;
  },
  {} as Record<string, { raw: string }>,
);

export const borderRadius = {
  none: '0px',
  sm: 'var(--r-sm)',
  md: 'var(--r-md)',
  lg: 'var(--r-lg)',
  xl: 'var(--r-xl)',
  pill: '9999px',
};

export const boxShadow = {
  'soft-1': 'var(--sh-1)',
  'soft-2': 'var(--sh-2)',
  'soft-3': 'var(--sh-3)',
};

export const getFontComponents = (theme: PluginAPI['theme']): Record<string, unknown> => ({
  // Display headings
  '.h1': {
    fontFamily: theme('fontFamily.display'),
    fontWeight: 700,
    lineHeight: 'var(--lh-4xl)',
    fontSize: 'var(--font-4xl)',
    letterSpacing: theme('letterSpacing.xs'),
    color: theme('colors.text'),
  },
  '.h2': {
    fontFamily: theme('fontFamily.display'),
    fontWeight: 700,
    lineHeight: 'var(--lh-3xl)',
    fontSize: 'var(--font-3xl)',
    letterSpacing: theme('letterSpacing.xs'),
    color: theme('colors.text'),
  },
  '.h3': {
    fontFamily: theme('fontFamily.display'),
    fontWeight: 650,
    lineHeight: 'var(--lh-xxl)',
    fontSize: 'var(--font-xxl)',
    letterSpacing: theme('letterSpacing.xs'),
    color: theme('colors.text'),
  },
  '.h4': {
    fontFamily: theme('fontFamily.display'),
    fontWeight: 650,
    lineHeight: 'var(--lh-xl)',
    fontSize: 'var(--font-xl)',
    letterSpacing: theme('letterSpacing.xs'),
    color: theme('colors.text'),
  },

  // Text styles
  '.lead': {
    fontFamily: theme('fontFamily.sans'),
    fontWeight: 500,
    lineHeight: 'var(--lh-lg)',
    fontSize: 'var(--font-lg)',
    color: theme('colors.text2'),
  },
  '.body': {
    fontFamily: theme('fontFamily.sans'),
    fontWeight: 400,
    lineHeight: 'var(--lh-md)',
    fontSize: 'var(--font-md)',
    color: theme('colors.text2'),
  },
  '.caption': {
    fontFamily: theme('fontFamily.sans'),
    fontWeight: 500,
    lineHeight: 'var(--lh-sm)',
    fontSize: 'var(--font-sm)',
    color: theme('colors.mutedText'),
  },
  '.overline': {
    fontFamily: theme('fontFamily.sans'),
    fontWeight: 600,
    lineHeight: 'var(--lh-xxs)',
    fontSize: 'var(--font-xxs)',
    letterSpacing: theme('letterSpacing.md'),
    textTransform: 'uppercase',
    color: theme('colors.mutedText'),
  },

  // UI helpers
  '.ui-card': {
    borderRadius: theme('borderRadius.lg'),
    backgroundColor: theme('colors.surface'),
    boxShadow: theme('boxShadow.soft-1'),
    border: `1px solid ${theme('colors.muted')}`,
  },
  '.ui-container': {
    paddingLeft: 'var(--container-x)',
    paddingRight: 'var(--container-x)',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1280px',
  },
});

export const getCustomComponents = (theme: PluginAPI['theme']): Record<string, unknown> => ({
  // Единый стиль ссылок и фокуса (важно для будущего)
  '.ui-link': {
    color: theme('colors.brand'),
    textDecoration: 'none',
  },
  '.ui-link:hover': {
    textDecoration: 'underline',
  },

  '.ui-focus': {
    outline: 'none',
    boxShadow: `0 0 0 4px rgb(var(--c-brand) / 0.18)`,
  },

  // Кнопки — можно расширять дальше (primary/secondary/ghost)
  '.btn': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-xxs)',
    borderRadius: theme('borderRadius.md'),
    paddingLeft: 'var(--space-md)',
    paddingRight: 'var(--space-md)',
    minHeight: theme('spacing.inp-md'),
    fontFamily: theme('fontFamily.sans'),
    fontWeight: 600,
    letterSpacing: theme('letterSpacing.xs'),
    transition: 'transform .08s ease, background-color .15s ease, box-shadow .15s ease',
    userSelect: 'none',
  },
  '.btn:active': { transform: 'translateY(1px)' },

  '.btn-primary': {
    backgroundColor: theme('colors.brand'),
    color: theme('colors.white'),
    boxShadow: theme('boxShadow.soft-1'),
  },
  '.btn-primary:hover': {
    backgroundColor: 'rgb(var(--c-brand) / 0.92)',
  },

  '.btn-accent': {
    backgroundColor: theme('colors.accent'),
    color: theme('colors.white'),
    boxShadow: theme('boxShadow.soft-1'),
  },
  '.btn-accent:hover': {
    backgroundColor: 'rgb(var(--c-accent) / 0.92)',
  },

  '.btn-ghost': {
    backgroundColor: 'transparent',
    color: theme('colors.brand'),
    border: `1px solid ${theme('colors.muted')}`,
  },
  '.btn-ghost:hover': {
    backgroundColor: 'rgb(var(--c-brand) / 0.06)',
  },

  // Инпут
  '.ui-input': {
    width: '100%',
    borderRadius: theme('borderRadius.md'),
    border: `1px solid ${theme('colors.muted')}`,
    backgroundColor: theme('colors.surface'),
    paddingLeft: 'var(--space-sm)',
    paddingRight: 'var(--space-sm)',
    minHeight: theme('spacing.inp-md'),
    fontFamily: theme('fontFamily.sans'),
    fontSize: 'var(--font-md)',
    lineHeight: 'var(--lh-md)',
    color: theme('colors.text'),
  },
  '.ui-input::placeholder': {
    color: theme('colors.mutedText'),
  },
  '.ui-input:focus': {
    borderColor: 'rgb(var(--c-brand) / 0.55)',
    boxShadow: `0 0 0 4px rgb(var(--c-brand) / 0.14)`,
    outline: 'none',
  },
});
