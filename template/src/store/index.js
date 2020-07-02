import Vue from 'vue';
import Vuex from 'vuex';
import topic from './modules/topic';

Vue.use(Vuex);

const initState = () => ({});

export function createStore() {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: initState(),
    mutations: {
      SET(state, payload) {
        state[payload.key] = payload.value;
      },
      RESET(state) {
        Object.assign(state, initState());
      },
      ASSIGN(state, { key, value = {} }) {
        const originState = state[key];
        for (const k in value) {
          if (value.hasOwnProperty(k)) {
            const v = value[k];
            Vue.set(originState, k, v);
          }
        }
      }
    },
    actions: {
      async init({ commit }, ctx) {}
    },
    getters: {},
    modules: {
      topic
    }
  });
}
