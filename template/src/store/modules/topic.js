import CacheData from '../CacheData';
import Api from '../../api/topic';

const cache1 = new CacheData([]);

export default {
  namespaced: true,
  state: () => ({
    // topic list
    list: [],
    detail: {},
    loading: true
  }),
  mutations: {
    SET(state, payload) {
      state[payload.key] = payload.value;
    }
  },
  actions: {
    /**
     * 加载列表
     * @param {boolean} force 是否强制刷新
     */
    async LOAD_LIST({ commit }, { ctx, param, force }) {
      try {
        const api = new Api(ctx);
        const res = await cache1.Load(api.get.bind(api), {
          force,
          param
        });
        commit('SET', { key: 'list', value: res.data });
        return res;
      } catch (error) {
        console.info('LOAD_LIST error: ', error);
      }
    },
    /**
     * 加载详情
     */
    async LOAD_DETAIL({ commit }, { ctx, param, force }) {
      try {
        const api = new Api(ctx);
        const res = await cache1.Load(api.getOne.bind(api), {
          force,
          param
        });
        commit('SET', { key: 'detail', value: res.data });
        return res;
      } catch (error) {
        console.info('LOAD_DETAIL error: ', error);
      }
    }
  },
  getters: {}
};
