import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Layout from '@/views/Layout.vue'
// import { EnvironmentOutlined, PieChartOutlined } from '@ant-design/icons-vue'
import Home2LinearIcon from '@iconify-vue/solar/home-2-linear'
import PieChart2LinearIcon from '@iconify-vue/solar/pie-chart-2-linear';

export const constRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/',
        name: '首页',
        component: Layout,
        redirect: '/home',
        icon: Home2LinearIcon,
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
                meta: {
                    name: '首页'
                },
            },
        ]
    },
    {
        path: '/chart',
        name: '测试页面',
        component: Layout,
        redirect: '/chart/chart1',
        icon: PieChart2LinearIcon,
        children: [
            {
                path: 'chart1',
                name: 'chart1',
                component: () => import('@/views/chart/Chart1.vue'),
                icon: PieChart2LinearIcon,
                meta: {
                    name: '表1'
                },
            },
            {
                path: 'chart3',
                name: 'chart3',
                component: () => import('@/views/chart/Chart1.vue'),
                meta: {
                    name: '表2'
                },
            },
        ]
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constRoutes
})

export default router
