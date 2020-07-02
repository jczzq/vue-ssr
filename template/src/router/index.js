import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

Vue.use(Router);
Vue.use(Meta, {
  // 设置 meta 信息的组件对象的字段，vue-meta 会根据这 key 值获取 meta 信息
  keyName: 'head',
  // vue-meta 在监听标签时所添加的属性名
  attribute: 'data-n-head',
  // 让 vue-meta 获知 meta 信息已完成服务端渲染的属性名
  ssrAttribute: 'data-n-head-ssr',
  // 让 vue-meta 用来决定是否覆盖还是追加 tag 的属性名
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
            path: 'topic',
            component: () => import('~/views/index')
          },
          {
            path: 'topic/:id',
            component: () => import('~/views/topic/detail')
          }
        ]
      }
    ]
  });
}
