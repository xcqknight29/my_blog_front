import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../views/MainApp.vue'),
            children: [
                {
                    path: '/',
                    redirect: 'list',
                }, {
                    path: '/list',
                    component: () => import('../views/ArticleList.vue'),
                }, {
                    path: '/write/:articleId?',
                    component: () => import('../views/WriteArticle.vue'),
                }, {
                    path: '/class',
                    component: () => import('../views/ClassMenege.vue'),
                }, {
                    path: '/user',
                    component: () => import('../views/TemPage.vue'),
                }, {
                    path: '/timeline',
                    component: () => import('../views/TimeLine.vue'),
                }, {
                    path: '/test',
                    component: () => import('../views/Test.vue'),
                }
            ],
        }, {
            path: '/login',
            component: () => import('../views/ToLogin.vue')
        },

    ]
})

export default router
