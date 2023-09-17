import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: 'writer/list',
        },
        {
            path: '/reader',
            component: () => import('../views/ReaderApp.vue'),
            children: [
                {
                    path: '',
                    redirect: 'reader/homepage',
                },{
                    path: 'homepage',
                    name: 'reader-homepage',
                    component: () => import('../views/HomePage.vue')
                },
                {
                    path: 'search',
                    name: 'reader-search',
                    component: () => import('../views/ArticleSearch.vue')
                },{
                    path: 'article/:articleId',
                    name: 'reader-article',
                    component: () => import('../views/ReadArticle.vue')
                },{
                    path: 'userpage/:username',
                    name: 'reader-userPage',
                    component: () => import('../views/UserPage.vue')
                }, {
                    path: 'classlist',
                    name: 'reader-classList',
                    component: () => import('../views/ClassList.vue')
                }, {
                    path: 'classpage/:className',
                    name: 'reader-classPage',
                    component: () => import('../views/ClassPage.vue')
                }, {
                    path: 'selfpage',
                    name: 'reader-selfPage',
                    component: () => import('../views/SelfPage.vue')
                }, {
                    path: 'about',
                    name: 'reader-aboutPage',
                    component: () => import('../views/AboutPage.vue')
                },
            ]
        },
        {
            path: '/writer',
            component: () => import('../views/MainApp.vue'),
            children: [
                {
                    path: '',
                    redirect: 'writer/list'
                },{
                    path: 'login',
                    name: 'writer-login',
                    component: () => import('../views/ToLogin.vue'),
                },{
                    path: 'list',
                    name: 'writer-list',
                    component: () => import('../views/ArticleList.vue'),
                },{
                    path: 'edit/:articleId?',
                    name: 'writer-edit',
                    component: () => import('../views/WriteArticle.vue'),
                },{
                    path: 'class',
                    name: 'writer-class',
                    component: () => import('../views/ClassMenege.vue'),
                },{
                    path: 'userlist',
                    name: 'writer-userList',
                    component: () => import('../views/UserList.vue'),
                },{
                    path: 'timeline',
                    name: 'writer-timeline',
                    component: () => import('../views/TimeLine.vue'),
                },
            ],
        }, {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginPage.vue')
        },

    ]
})

export default router
