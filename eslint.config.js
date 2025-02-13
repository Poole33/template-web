import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
    {
        files: ['**/*.{js,mjs,cjs,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021
            },
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            },
        },
        rules: {
            'semi': ['error', 'never'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'no-unused-vars': 'warn',
            'no-console': import.meta.env.PROD ? 'warn' : 'off',
            'no-debugger': import.meta.env.PROD ? 'warn' : 'off',
            'comma-dangle': ['error', 'always-multiline'],
            'vue/valid-v-model': 'off',
            'vue/no-v-model-argument': 'off'
        }
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs['flat/essential'],
]