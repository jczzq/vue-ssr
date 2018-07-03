import Api from '~/api/cartoonRoleApi'

export default {
  namespaced: true,
  state: () => ({
    trending: {
      data: [],
      noMore: false
    },
    fans: {
      new: {
        data: [],
        noMore: false
      },
      hot: {
        data: [],
        noMore: false
      }
    },
    info: {
      data: {},
      bangumi: {}
    }
  }),
  mutations: {
    ADD_ROLE_STATE (state, { hasStar, user }) {
      if (hasStar) {
        state.info.data.hasStar++
      } else {
        state.info.data.hasStar = 1
        state.info.data.fans_count++
        state.fans.new.data.unshift(user)
      }
      state.info.data.star_count++
    },
    FOLLOW_ROLE_BANGUMI (state, { result }) {
      state.info.bangumi.followed = result
    },
    SET_ROLE_INFO (state, data) {
      state.info = data
    },
    SET_TRENDING (state, data) {
      state.trending.data = state.trending.data.concat(data)
      state.trending.noMore = data.length < 15
    },
    SET_FANS_LIST (state, { data, reset, sort }) {
      if (reset) {
        state.fans = {
          new: {
            data: [],
            noMore: false
          },
          hot: {
            data: [],
            noMore: false
          }
        }
      }
      state.fans[sort].data = state.fans[sort].data.concat(data)
      state.fans[sort].noMore = data.length < 15
    }
  },
  actions: {
    async getTrending ({ state, commit }) {
      if (state.trending.noMore) {
        return
      }
      const api = new Api()
      const data = await api.trending({
        seenIds: state.trending.data.length ? state.trending.data.map(item => item.id).join(',') : null
      })
      commit('SET_TRENDING', data)
    },
    async getFansList ({ state, commit }, { bangumiId, roleId, sort, reset }) {
      if (state.fans[sort].noMore && !reset) {
        return
      }
      const api = new Api()
      const length = state.fans[sort].data.length
      const data = await api.fans(Object.assign({
        sort,
        bangumiId,
        roleId
      }, sort === 'new' ? {
        minId: reset ? null : length ? state.fans[sort].data[length - 1].id : null
      } : {
        seenIds: reset ? null : length ? state.fans[sort].data.map(item => item.id).join(',') : null
      }))
      commit('SET_FANS_LIST', { data, reset, sort })
    },
    async getRoleInfo ({ commit }, { ctx, id }) {
      const api = new Api(ctx)
      const data = await api.show(id)
      commit('SET_ROLE_INFO', data)
    },
    async star ({ rootState, commit }, { bangumiId, roleId, ctx, hasStar }) {
      const api = new Api(ctx)
      await api.star({ bangumiId, roleId })
      const self = rootState.user
      commit('ADD_ROLE_STATE', {
        hasStar,
        user: {
          id: self.id,
          zone: self.zone,
          avatar: self.avatar,
          nickname: self.nickname
        }
      })
    }
  },
  getters: {}
}
