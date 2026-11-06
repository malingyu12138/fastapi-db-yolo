import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import NotFound from '@/pages/404.vue'
import Dashboard from '@/pages/main/Dashboard.vue'
import Settings from '@/pages/main/Settings.vue'


const routes = [

    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/dashboard', // 默认重定向到看板页
        children: [
            { path: '/dashboard', component: Dashboard, meta: { title: '看板', icon: 'Odometer' } },
            { path: '/settings', component: Settings, meta: { title: '设置', icon: 'Setting' } }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, //路由
})
export default router
