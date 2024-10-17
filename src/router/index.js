import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Layout from '@/views/Layout.vue'
import { EnvironmentOutlined, PieChartOutlined } from '@ant-design/icons-vue'

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
        icon: EnvironmentOutlined,
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
        icon: PieChartOutlined,
        children: [
            {
                path: 'chart1',
                name: 'chart1',
                component: () => import('@/views/chart/Chart1.vue'),
                meta: {
                    name: '汇总'
                },
            },
            {
                path: 'chart2',
                name: 'chart2',
                component: () => import('@/views/chart/Chart1.vue'),
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
