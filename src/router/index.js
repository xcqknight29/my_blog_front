import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: 'reader',
        }, {
            path: '/reader',
            component: () => import('../views/reader/ReaderApp.vue'),
            children: [
                {
                    path: '',
                    redirect: 'reader/homepage',
                }, {
                    path: 'homepage',
                    name: 'reader-homepage',
                    component: () => import('../views/reader/HomePage.vue')
                }, {
                    path: 'search',
                    name: 'reader-search',
                    component: () => import('../views/reader/ArticleSearch.vue')
                }, {
                    path: 'article/:articleId',
                    name: 'reader-article',
                    component: () => import('../views/reader/ReadArticle.vue')
                }, {
                    path: 'userpage/:username',
                    name: 'reader-userPage',
                    component: () => import('../views/reader/UserPage.vue')
                }, {
                    path: 'classlist',
                    name: 'reader-classList',
                    component: () => import('../views/reader/ClassList.vue')
                }, {
                    path: 'classpage/:className',
                    name: 'reader-classPage',
                    component: () => import('../views/reader/ClassPage.vue')
                }, {
                    path: 'selfpage',
                    name: 'reader-selfPage',
                    component: () => import('../views/reader/SelfPage.vue')
                }, {
                    path: 'about',
                    name: 'reader-aboutPage',
                    component: () => import('../views/reader/AboutPage.vue')
                },
            ]
        }, {
            path: '/writer',
            component: () => import('../views/writer/MainApp.vue'),
            children: [
                {
                    path: '',
                    redirect: 'writer/list'
                }, {
                    path: 'login',
                    name: 'writer-login',
                    component: () => import('../views/writer/ToLogin.vue'),
                }, {
                    path: 'list',
                    name: 'writer-list',
                    component: () => import('../views/writer/ArticleList.vue'),
                }, {
                    path: 'edit/:articleId?',
                    name: 'writer-edit',
                    component: () => import('../views/writer/WriteArticle.vue'),
                }, {
                    path: 'class',
                    name: 'writer-class',
                    component: () => import('../views/writer/ClassManage.vue'),
                }, {
                    path: 'class/:cname',
                    name: 'writer-class-edit',
                    component: () => import('../views/writer/ClassEdit.vue'),
                }, {
                    path: 'tag',
                    name: 'writer-tag',
                    component: () => import('../views/writer/TagManage.vue'),
                }, {
                    path: 'userlist',
                    name: 'writer-userList',
                    component: () => import('../views/writer/UserList.vue'),
                }, {
                    path: 'timeline',
                    name: 'writer-timeline',
                    component: () => import('../views/writer/TimeLine.vue'),
                }, 
            ],
        }, {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginPage.vue')
        }, {
            path: '/test',
            name: 'test',
            component: () => import('../views/Test.vue')
        },

    ]
})

export default router
