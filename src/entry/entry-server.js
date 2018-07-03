import { createApp } from '~/app.js'

export default ssrContext => {
  const { app, router, store } = createApp()
  const meta = app.$meta()

  return new Promise((resolve, reject) => {
    router.push(ssrContext.url)
    router.onReady(async () => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ code: 404 })
      }
      try {
        const matched = matchedComponents.map(({asyncData}) => asyncData && asyncData({
          ctx: ssrContext.ctx,
          store,
          route: router.currentRoute
        }))
        matched.unshift(store.dispatch('init', ssrContext.ctx))
        await Promise.all(matched)
      } catch (e) {
        reject(e)
      }
      ssrContext.state = store.state
      ssrContext.meta = meta
      resolve(app)
    }, reject)
  })
}
