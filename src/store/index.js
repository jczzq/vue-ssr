import Vue from 'vue'
import Vuex from 'vuex'
import UserApi from '~/api/userApi'
import homepage from './homepage'
import bangumi from './bangumi'
import video from './video'
import users from './users'
import image from './image'
import post from './post'
import cartoonRole from './cartoonRole'
import trending from './trending'
import comment from './comment'

import ImageApi from '~/api/imageApi'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: () => ({
      user: null,
      login: false,
      banner: 'banner/2.jpg'
    }),
    mutations: {
      SET_USER (state, user) {
        state.user = user
        state.login = true
      },
      SET_USER_INFO (state, data) {
        Object.keys(data).forEach(key => {
          state.user[key] = data[key]
        })
      },
      USE_COIN (state) {
        state.user.coin && state.user.coin--
      }
    },
    actions: {
      async init ({ commit }, ctx) {
        const cookie = ctx.header.cookie
        if (cookie) {
          let token = ''
          cookie.split('; ').forEach(item => {
            const temp = item.split('=')
            if (temp[0] === 'JWT-TOKEN') {
              token = temp[1]
            }
          })
          if (token) {
            const api = new UserApi(ctx)
            try {
              const user = await api.getLoginUser()
              if (user) {
                commit('SET_USER', user)
              }
            } catch (e) {
              // do nothing
            }
          }
        }
      },
      async getUpToken ({ state, commit }, ctx) {
        if (state.user.uptoken.expiredAt <= parseInt(Date.now() / 1000, 10)) {
          const api = new ImageApi(ctx)
          const data = await api.getUpToken()
          commit('SET_USER_INFO', {
            uptoken: data
          })
        }
      },
      async getNotification ({ commit }, ctx) {
        const api = new UserApi(ctx)
        const data = await api.getNotificationCount()
        commit('SET_USER_INFO', {
          notification: data
        })
      }
    },
    getters: {},
    modules: {
      homepage,
      bangumi,
      video,
      users,
      image,
      post,
      cartoonRole,
      trending,
      comment
    }
  })
}
