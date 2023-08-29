import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: 'writer/list',
        },
        {
            path: '/writer',
            component: () => import('../views/MainApp.vue'),
            children: [
                {
                    path: '',
                    redirect: 'writer/list'
                }, {
                    path: 'login',
                    name: 'writer-login',
                    component: () => import('../views/ToLogin.vue'),
                },  {
                    path: 'list',
                    name: 'writer-list',
                    component: () => import('../views/ArticleList.vue'),
                }, {
                    path: 'edit/:articleId?',
                    name: 'writer-edit',
                    component: () => import('../views/WriteArticle.vue'),
                }, {
                    path: 'class',
                    name: 'writer-class',
                    component: () => import('../views/ClassMenege.vue'),
                }, {
                    path: 'user',
                    name: 'writer-user',
                    component: () => import('../views/Test.vue'),
                }, {
                    path: 'timeline',
                    name: 'writer-timeline',
                    component: () => import('../views/TimeLine.vue'),
                }, {
                    path: 'test',
                    name: 'writer-test',
                    component: () => import('../views/Test.vue'),
                }
            ],
        }, {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginPage.vue')
        },

    ]
})

export default router
