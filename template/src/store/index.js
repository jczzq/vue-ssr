import Vue from 'vue';
import Vuex from 'vuex';
import guide from './modules/guide';

Vue.use(Vuex);
const initState = () => ({
  _userInfo: {},
  _locationInfo: {},
  _carInfo: {},
  _channel: {
    orderChannel: '',
    channelInfo: {
      channel: ''
    }
  },

    /**
     * App携带数据 (true: 测试组；false：原始组；undefined：都不是)
     */
  intentData: {},
    // App静态变量
  appStaticProperty: {},
    // 天降神券
  hasGodPCode: undefined
});

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
      },
      setCarInfo(state, payload = {}) {
        if (payload) {
          state._carInfo = Object.assign({}, payload.car);
        } else {
          state._carInfo = {};
        }
      },
      setUserInfo(state, payload = {}) {
        if (payload) {
          state._userInfo = Object.assign({}, payload.userInfo);
        } else {
          state._userInfo = {};
        }
      },
      setLocationInfo(state, payload = {}) {
        if (payload) {
          state._locationInfo = Object.assign({}, payload.locateInfo);
        } else {
          state._locationInfo = {};
        }
      }
    },
    actions: {
      async INIT_INTENT_DATA({ commit }) {
        const a = performance.now();
        if (!window.__INTENT_DATA__) {
          const { result } = await Vue.prototype.$tHybrid.actionWithNative(
                        'getIntentData'
                    );
          window.__INTENT_DATA__ = result;
        }
        commit('SET', {
          key: 'intentData',
          value: window.__INTENT_DATA__
        });
        console.warn(`=初始化intentData= ${performance.now() - a}ms`);
      },
            // 设置App静态变量 并 更新Vuex变量
      SET_STATIC_VAR({ commit }, propertyMap) {
        commit('ASSIGN', {
          key: 'appStaticProperty',
          value: propertyMap
        });
        return Vue.prototype.$tHybrid.actionWithNative('saveStaticProperty', {
          propertyMap
        });
      },
            // 获取App静态变量 并 替换Vuex变量，可直接获取某个属性
      async GET_STATIC_VAR({ commit }, prop) {
        const { result } = await Vue.prototype.$tHybrid.actionWithNative(
                    'getStaticProperty',
          {
            source: '/enhancedWebView'
          }
                );
        commit('SET', {
          key: 'appStaticProperty',
          value: result
        });
        return prop ? result[prop] : result;
      }
    },
    getters: {
            // 轮胎规格（包含特殊规格）
      tireSize(state) {
        return (
                    state._carInfo.TireSizeForSingle ||
                    state._carInfo.SpecialTireSizeForSingle ||
                    ''
        );
      }
    },
    modules: {
      guide
    }
  });
}
