import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
const store = createPinia()

export const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        phone: '',
        menus: null
    }),
    getters: {
        getToken() {
          return this.token
        },
        getPhone() {
            return this.phone
        }
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setPhone(phone) {
            this.phone = phone
        },
        async getMenus() { // 获取路由菜单

        }
    }
})

export function useUserStoreWithout() {
    return useUserStore(store)
}