<style lang="scss">
  .reset-password-form {
    .submit-btn {
      width: 100%;
    }

    .others {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
    }
  }
</style>

<template>
  <div class="reset-password-form">
    <el-form
      :model="form"
      :rules="rule"
      ref="form"
    >
      <el-form-item prop="access">
        <el-input
          type="text"
          v-model="form.access"
          placeholder="手机号"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="secret">
        <el-input
          type="password"
          v-model="form.secret"
          placeholder="新密码"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-btn"
          type="primary"
          @click="submitForm"
          :loading="submitBtnLoading"
          :disabled="submitBtnDisabled"
        >
          {{ submitBtnText }}
          <template v-if="timeout">
            （{{ timeout }}s 后可重新获取）
          </template>
        </el-button>
      </el-form-item>
    </el-form>
    <div class="others">
      <a @click="showLogin">返回登录></a>
      <a @click="showRegister">点击注册»</a>
    </div>
  </div>
</template>

<script>
  import UserApi from '~/api/userApi'

  export default {
    name: 'reset-password-form',
    computed: {
      submitBtnText () {
        if (this.step === 0) {
          return '立即重置'
        } else if (this.step === 1) {
          return '提交中...'
        } else if (this.step === 2) {
          return '短信已发送'
        } else if (this.step === 3) {
          return '已重置'
        }
      },
      submitBtnLoading () {
        return this.step === 1 || this.step === 3
      },
      submitBtnDisabled () {
        return (
            this.timeout !== 0 && this.step === 0
          ) || this.step === 3
      }
    },
    data () {
      const validateAccess = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写手机号'))
        }
        if (value.length !== 11) {
          return callback(new Error('请填写11位手机号'))
        }
        if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value))) {
          return callback(new Error('错误的手机号格式'))
        }
        callback()
      }
      const validateSecret = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请填写登录密码'))
        }
        if (value.length < 6) {
          return callback(new Error('密码不能小于6位'))
        }
        if (value.length > 16) {
          return callback(new Error('密码不能大于16位'))
        }
        callback()
      }
      return {
        form: {
          access: '',
          secret: '',
          authCode: ''
        },
        rule: {
          access: [
            { validator: validateAccess, trigger: 'blur' }
          ],
          secret: [
            { validator: validateSecret, trigger: 'blur' }
          ]
        },
        step: 0,
        timeout: 0
      }
    },
    methods: {
      submitForm () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.step === 0) {
              this.getResetAuthCode()
            }
            if (this.step === 2) {
              this.openConfirmModal()
            }
          } else {
            return false
          }
        })
      },
      getResetAuthCode () {
        this.step = 1
        this.$captcha({
          success: async ({ data }) => {
            const api = new UserApi()
            try {
              await api.sendMessage({
                type: 'forgot_password',
                phone_number: this.form.access,
                geetest: data
              })
              this.step = 2
              this.openConfirmModal()
            } catch (err) {
              this.$toast.error(err)
              this.step = 0
            } finally {
              this.timeout = 60
              const timer = setInterval(() => {
                if (!--this.timeout) {
                  this.step = 0
                  clearInterval(timer)
                }
              }, 1000)
            }
          },
          close: () => {
            this.step = 0
          },
          error: (err) => {
            this.step = 0
            this.$toast.error(err)
          }
        })
      },
      openConfirmModal () {
        this.$prompt('请输入收到的验证码', '短信已发送', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{6}$/,
          inputErrorMessage: '验证码格式不正确'
        }).then(({ value }) => {
          this.form.authCode = value
          this.step = 3
          this.signReset()
        }).catch(() => {})
      },
      async signReset () {
        const api = new UserApi()
        try {
          const res = await api.resetPassword({
            access: this.form.access,
            authCode: this.form.authCode,
            secret: this.form.secret
          })
          this.$toast.success(res)
          this.showLogin()
        } catch (err) {
          this.$toast.error(err)
        } finally {
          this.step = 0
        }
      },
      showLogin () {
        this.$emit('to-login')
        this.$refs.form.resetFields()
      },
      showRegister () {
        this.$emit('to-register')
        this.$refs.form.resetFields()
      }
    }
  }
</script>
