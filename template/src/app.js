import Vue from 'vue';
import App from './app.vue';
import { sync } from 'vuex-router-sync';
import { createStore } from '~/store';
import { createRouter } from '~/router';
import '~/assets/style/global';
import '~/utils';

export function createApp() {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
}
