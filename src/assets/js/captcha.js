import Api from '~/api/imageApi'
import './geetest'

export default (params) => {
  const { type, elem, success, error, ready, async, close } = typeof params === 'object' ? params : {}
  const api = new Api()
  const product = type || 'bind'
  api.getCaptcha().then((data) => {
    if (!window.initGeetest) {
      error && error('验证码加载失败，请刷新网页重试')
      return
    }
    window.initGeetest({
      gt: data.gt,
      challenge: data.challenge,
      offline: !data.success,
      product: product,
      width: '100%',
      new_captcha: 1
    }, (captcha) => {
      captcha.onReady(() => {
        ready && ready()
      })
      if (product === 'float') {
        captcha.appendTo(elem)
      } else if (product === 'bind') {
        if (!async) {
          captcha.onReady(() => captcha.verify())
        } else {
          elem.onclick = () => {
            captcha.verify()
          }
        }
      }
      captcha.onSuccess(() => {
        const result = captcha.getValidate()
        typeof params === 'object'
          ? success && success({
            data: {
              geetest_challenge: result.geetest_challenge,
              geetest_seccode: result.geetest_seccode,
              geetest_validate: result.geetest_validate,
              payload: data.payload,
              success: data.success
            },
            captcha
          })
          : params({
            data: {
              geetest_challenge: result.geetest_challenge,
              geetest_seccode: result.geetest_seccode,
              geetest_validate: result.geetest_validate,
              payload: data.payload,
              success: data.success
            },
            captcha
          })
      })
      captcha.onError((err) => {
        error && error(err)
      })
      captcha.onClose(() => {
        close && close()
      })
    })
  }).catch((err) => {
    error && error(err)
  })
}
