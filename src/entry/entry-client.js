import 'es6-promise/auto'
import Vue from 'vue'
import { createApp } from '~/app.js'
import ProgressBar from '~/components/layouts/ProgressBar'
import Sentry from '~/assets/js/sentry'
import { sentry, env } from 'env'
import '~/assets/js/polyfill/blob'
import '~/utils/client'

const bar = new Vue(ProgressBar).$mount()

const dev = env === 'development'
const release = process.env.RELEASE || 'development'

document.body.appendChild(bar.$el)

const { app, router, store } = createApp()

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
        ctx: store.state.login ? store.state.user.token : ''
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

if (env === 'production') {
  Sentry({
    url: sentry.url,
    version: release
  })
}

if (!dev && typeof console !== 'undefined') {
  console.log(`Release: ${release}`)
  console.log(`Environment: ${env}`)
}

window.M = window.M || Object.create(null)

router.onReady(() => {
  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)

    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()

    try {
      await Promise.all(asyncDataHooks.map(hook => hook({
        ctx: store.state.login ? store.state.user.token : '',
        store,
        route: to
      })))
      next()
    } catch (e) {
      Vue.prototype.$toast.error('网络请求失败，请稍后再试！')
      next(false)
    } finally {
      bar.finish()
    }
  })

  app.$mount('#app')
})

router.afterEach((to, from) => {
  if (!dev && !(from.name === null && from.fullPath === '/')) {
    _hmt.push(['_trackPageview', to.fullPath]) // eslint-disable-line no-undef
  }
})
