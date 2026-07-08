import { createPinia, defineStore } from 'pinia'

const store = createPinia()

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('loading', {
  state: () => ({
    theme: 'light',
  }),
  getters: {},
  actions: {
    setTheme(val: Theme) {
      this.theme = val
      localStorage.setItem('themeColor', val)

      document.documentElement.className = val
    },
    // 设置默认主题色
    setDefaultTheme() {
      // 默认黑色
      const theme = localStorage.getItem('themeColor') || 'light'
      localStorage.setItem('themeColor', theme)

      this.setTheme(theme)
    },
  },
})

export function useThemeStoreWithout() {
  return useThemeStore(store)
}
