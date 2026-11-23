import { mergeConfig, type UserConfig } from 'vite';

export default function createAdminViteConfig(config: UserConfig) {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
}
