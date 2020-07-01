import CacheData from '../CacheData';
import Api from '../../api/tireGuide';

const cache1 = new CacheData([]);

export default {
  namespaced: true,
  state: () => ({
    // 轮胎导购列表
    isMatch: false,
    isMatchLoading: false,
    list: [],
    loading: true
  }),
  mutations: {
    SET(state, payload) {
      state[payload.key] = payload.value;
    }
  },
  actions: {
    /**
     * 请求导购列表
     * @param {boolean} force 是否强制刷新
     */
    async LOAD_LIST({ commit }, { ctx, param, force }) {
      const api = new Api(ctx);
      const res = await cache1.Load(api.search, {
        force,
        param
      });
      commit('SET', { key: 'list', value: res.data.guideTireList });
      return res;
    }
  },
  getters: {}
};
