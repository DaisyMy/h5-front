import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import svgLoader from 'vite-svg-loader';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log('EVN:', mode, env, process.cwd());
  return {
    plugins: [
      vue(),
      svgLoader(),
      AutoImport({ imports: ['vue', 'vue-router'] }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
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
