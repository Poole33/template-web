import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        drop: ['console', 'debugger'],
    },
    plugins: [
        vue(),
        UnoCSS({
            configFile: './uno.config.js'
        }),
        AutoImport({
          imports: ['vue', 'uni-app'],
          dirs: ['src/hooks'], // 自动导入 hooks
          vueTemplate: true, // default false
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler" // or 'modern'
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 2333,
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
