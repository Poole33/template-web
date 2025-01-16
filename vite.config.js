import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    esbuild:{
        drop: ['console', 'debugger'],
    },
    plugins: [
        vue(),
        UnoCSS({
            configFile: './uno.config.js'
        }),
    ],
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: '0.0.0.0',
        port: 6666,
        proxy: {
            '/backend/api': {
                target: 'http://10.10.24.127:8888',
                // target: 'http://10.10.143.51:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/backend/, ''),
            }
        }
    }
})
