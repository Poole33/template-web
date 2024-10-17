import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
const store = createPinia()

export const useThemeStore = defineStore('loading', {
    state: () => ({
        theme: 'dark',
        themeKey: 'darkAlgorithm', // antdv中控制主题的key
    }),
    getters: {},
    actions: {
        setTheme(val) {
            this.theme = val
            localStorage.setItem('themeColor', val)

            // andv 主题根据 系统主题变化
            if (val == 'dark') this.themeKey = 'darkAlgorithm'
            else this.themeKey = 'defaultAlgorithm'

            document.documentElement.className = val
        },
        // 设置默认主题色
        setDefaultTheme() {
            // 默认黑色
            let theme = localStorage.getItem('themeColor') || 'dark'
            localStorage.setItem('themeColor', theme)

            this.setTheme(theme)
        },
    }
})

export function useThemeStoreWithout() {
    return useThemeStore(store)
}