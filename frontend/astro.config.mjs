import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind({ applyBaseStyles: false })],
  compressHTML: true,
  vite: {
    plugins: [svgr()],
    build: {
      rollupOptions: {
        treeshake: {
          moduleSideEffects: (id) => !id.includes('/backend/src/contracts/'),
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@contracts': fileURLToPath(new URL('../backend/src/contracts', import.meta.url)),
      },
    },
  },
});
