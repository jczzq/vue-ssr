const state = () => ({
  sort: '',
  type: '',
  news: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  active: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  },
  hot: {
    list: [],
    total: 0,
    noMore: false,
    nothing: false,
    loading: false
  }
})

const mutations = {
  INIT_TRENDING_TYPE (state, { type }) {
    state.type = type
  },
  RESET_TRENDING_STATE (state, { type }) {
    state = {
      sort: '',
      type: '',
      news: {
        list: [],
        total: 0,
        noMore: false,
        nothing: false,
        loading: false
      },
      active: {
        list: [],
        total: 0,
        noMore: false,
        nothing: false,
        loading: false
      },
      hot: {
        list: [],
        total: 0,
        noMore: false,
        nothing: false,
        loading: false
      }
    }
    state.type = type
  },
  INIT_TRENDING_DATA (state, { data, sort }) {
    state[sort].list = data.list
    state[sort].total = data.total
    state[sort].noMore = data.noMore
    state[sort].nothing = !data.list.length
    state[sort].loading = false
  },
  PUSH_TRENDING_DATA (state, { data, sort }) {
    const list = state[sort].list.concat(data.list)
    state[sort].list = list
    state[sort].total = data.total
    state[sort].noMore = data.noMore
    state[sort].nothing = !list.length
    state[sort].loading = false
  },
  SET_TRENDING_LOADING (state, { sort }) {
    state[sort].loading = true
  },
  CLEAR_TRENDING_SORT (state, { sort }) {
    state[sort] = {
      list: [],
      total: 0,
      noMore: false,
      nothing: false,
      loading: true
    }
  }
}

const actions = {
  async getTrending ({ state, commit }, { api, type, sort, useCache = true }) {
    if (!state.type) {
      commit('INIT_TRENDING_TYPE', { type })
    } else if (state.type !== type) {
      commit('RESET_TRENDING_STATE', { type })
    }
    if (state[sort].list.length) {
      if (useCache) {
        return
      } else {
        commit('CLEAR_TRENDING_SORT', { sort })
      }
    }
    const data = await api[sort]({
      seenIds: '',
      minId: ''
    })
    commit('INIT_TRENDING_DATA', { data, sort })
  },
  async loadMore ({ state, commit }, { api, sort, type }) {
    if (!state.type || state.type !== type) {
      return
    }
    if (state[sort].noMore || state[sort].loading) {
      return
    }
    commit('SET_TRENDING_LOADING', { sort })
    let data
    const list = state[sort].list
    if (sort === 'news') {
      data = await api.news({
        minId: list.length ? list[list.length - 1].id : 0
      })
    } else {
      data = await api[sort]({
        seenIds: list.length ? list.map(_ => _.id).join(',') : ''
      })
    }
    commit('PUSH_TRENDING_DATA', { data, sort })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
