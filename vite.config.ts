import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig(({ mode /* , command */ }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        define: {
            APP_DEBUG: 'true',
            __APP_DEBUG__: `${env.APP_DEBUG}`,
            __APP_ENV__: `"${env.APP_ENV}"`,
        },
        plugins: [
            vue({
                // template: {
                //     transformAssetUrls: {
                //         base: null,
                //         includeAbsolute: false,
                //     },
                // },
            }),
            WindiCSS(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                src: fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});
