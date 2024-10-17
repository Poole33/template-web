import router from './router'
import { useUserStoreWithout } from '@/store/user'

const userStore = useUserStoreWithout()

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    // console.log('token', token);
    if (token) {
        if (to.path == '/login') next({ path: '/' })
        else next()
        // next()
    } else {
        setMenus()

        if (to.path.includes('/login')) next()
        else next(`/login?redirect=${to.path}`)
    }
})

// 获取路由菜单
async function setMenus() {
    if (userStore.menus) return // 已经有menus

    const res = await userStore.getMenus()

    // router.addRoutes(res.data)
    
}