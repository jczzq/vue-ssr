import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

Vue.use(Router);
Vue.use(Meta, {
    keyName: 'head',
    attribute: 'data-n-head',
    ssrAttribute: 'data-n-head-ssr',
    tagIDKeyName: 'hid'
});

export function createRouter() {
    return new Router({
        mode: 'history',
        base: '/',
        routes: [
            {
                path: '/',
                component: () => import('~/layouts/default'),
                children: [
                    {
                        path: '',
                        name: 'homepage',
                        component: () => import('~/views/index')
                    },
                    {
                        path: 'bangumi/news',
                        component: () => import('~/views/bangumi/news')
                    },
                    {
                        path: 'bangumi/rank',
                        component: () => import('~/views/bangumi/rank')
                    },
                    {
                        path: 'bangumi/timeline',
                        component: () => import('~/views/bangumi/time')
                    },
                    {
                        name: 'bangumi-tags',
                        path: 'bangumi/tags/:id?',
                        component: () => import('~/views/bangumi/tags')
                    },
                    {
                        path: 'bangumi/:id(\\d+)',
                        name: 'bangumi-show',
                        component: () => import('~/views/bangumi/show')
                    },
                    {
                        path: 'video/:id(\\d+)',
                        component: () => import('~/views/video/show')
                    },
                    {
                        path: 'user/:zone',
                        name: 'user-show',
                        component: () => import('~/views/user/show')
                    },
                    {
                        path: 'post/:id(\\d+)',
                        name: 'post-show',
                        component: () => import('~/views/post/show')
                    },
                    {
                        path: 'post/trending/:sort',
                        component: () => import('~/views/post/trending')
                    },
                    {
                        path: 'about/hello',
                        name: 'hello',
                        component: () => import('~/views/about/hello')
                    },
                    {
                        path: 'role/trending',
                        component: () => import('~/views/role/trending')
                    },
                    {
                        path: 'role/:id(\\d+)',
                        name: 'role-show',
                        component: () => import('~/views/role/show')
                    },
                    {
                        path: 'image/trending/:sort',
                        name: 'image-trending',
                        component: () => import('~/views/image/trending')
                    },
                    {
                        path: 'image/album/:id(\\d+)',
                        name: 'image-album',
                        component: () => import('~/views/image/album')
                    }
                ]
            }
        ]
    });
}
