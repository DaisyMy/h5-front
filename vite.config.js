import { defineConfig, loadEnv } from 'vite';
import { join } from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log('EVN:', env);
  return {
    plugins: [vue(), tailwindcss(), AutoImport({ imports: ['vue', 'vue-router'] })],
    resolve: {
      alias: {
        '@': join(__dirname, './src'),
      },
    },
    server: {
      port: env.VITE_PORT,
      proxy: {
        [env.VITE_BASE_API]: {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
