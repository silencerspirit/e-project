import type { Config } from 'tailwindcss';
// import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        border: 'rgba(var(--border), <alpha-value>)',
        input: 'rgba(var(--input), <alpha-value>)',
        ring: 'rgba(var(--ring), <alpha-value>)',
        background: 'rgba(var(--background), <alpha-value>)',
        foreground: 'rgba(var(--foreground), <alpha-value>)',
        primary: {
          DEFAULT: 'rgba(var(--primary), <alpha-value>)',
          foreground: 'rgba(var(--primary-foreground), <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgba(var(--secondary), <alpha-value>)',
          foreground: 'rgba(var(--secondary-foreground), <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgba(var(--destructive), <alpha-value>)',
          foreground: 'rgba(var(--destructive-foreground), <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgba(var(--muted), <alpha-value>)',
          foreground: 'rgba(var(--muted-foreground), <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgba(var(--accent), <alpha-value>)',
          foreground: 'rgba(var(--accent-foreground), <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgba(var(--popover), <alpha-value>)',
          foreground: 'rgba(var(--popover-foreground), <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgba(var(--card), <alpha-value>)',
          foreground: 'rgba(var(--card-foreground), <alpha-value>)',
        },
        chart: {
          1: 'rgba(var(--chart-1), <alpha-value>)',
          2: 'rgba(var(--chart-2), <alpha-value>)',
          3: 'rgba(var(--chart-3), <alpha-value>)',
          4: 'rgba(var(--chart-4), <alpha-value>)',
          5: 'rgba(var(--chart-5), <alpha-value>)',
        },
        sidebar: {
          DEFAULT: 'rgba(var(--sidebar), <alpha-value>)',
          foreground: 'rgba(var(--sidebar-foreground), <alpha-value>)',
          primary: 'rgba(var(--sidebar-primary), <alpha-value>)',
          'primary-foreground': 'rgba(var(--sidebar-primary-foreground), <alpha-value>)',
          accent: 'rgba(var(--sidebar-accent), <alpha-value>)',
          'accent-foreground': 'rgba(var(--sidebar-accent-foreground), <alpha-value>)',
          border: 'rgba(var(--sidebar-border), <alpha-value>)',
          ring: 'rgba(var(--sidebar-ring), <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'Inter Fallback', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      lineHeight: {
        '1': '1',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,

    // plugin(({ addComponents, theme }) => {
    //   addComponents({
    //     ':root': getRoot(),
    //     ...getFontComponents(),
    //     ...getCustomComponents(theme),
    //   });
    // }),
  ],
  corePlugins: {
    container: false,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
