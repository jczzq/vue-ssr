<style lang="scss">
  $time: .5s;
  $input-height: 40px;
  #space3D {
    perspective: 800px;
    perspective-origin: 50% 50%;
    background-color: transparent;
    z-index: 11;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;

    &.space-leave {
      visibility: hidden;
    }

    &.space-enter {
      visibility: visible;
    }

    .sign-modal-wrap {
      transform-style: preserve-3d;
      z-index: 12;

      .sign-modal {
        padding: 50px 60px;
        background-color: $color-white;
        border-radius: 4px;
        position: fixed;
        top: 50%;
        left: 50%;
        width: 500px;
        height: 460px;
        margin-left: -250px;
        transition: $time;
        font-size: 14px;
        visibility: hidden;
        opacity: 0;
        display: flex;
        flex-direction: column;
        box-shadow: 0 5px 25px rgba(0,0,0,.1);

        button {
          user-select: none;
        }

        input[type="text"], input[type="password"], input[type="number"] {
          width: 100%;
          height: $input-height;
          font-size: 12px;
          padding: 8px 12px;
          color: $color-text-deep;
        }

        .captcha {
          cursor: pointer;
          position: relative;
          height: 44px;
          width: 100%;
          border-radius: 3px;
          background-color: $color-blue-normal;
          font-weight: bold;
          margin-top: 15px;

          &:hover {
            background-color: $color-blue-light;
          }

          &:before {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            line-height: 44px;
            color: $color-white;
          }
        }

        .form-container {
          >span {
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-grow: 1;
          }
        }

        &.sign-up-show,
        &.sign-in-show {
          visibility: visible;
          opacity: 1;
          transform: rotateY(0deg) translateY(-200px);
        }

        &.sign-up-init,
        &.sign-in-init {
          visibility: hidden;
          opacity: 0;
          transform: rotateY(0deg) translateY(-300px);
        }

        &.sign-in-turn,
        &.sign-up-turn {
          visibility: hidden;
          opacity: 0;
        }

        &.sign-in-turn {
          transform: rotateY(-180deg) translateY(-200px);
        }

        &.sign-up-turn {
          transform: rotateY(180deg) translateY(-200px);
        }

        .watch {
          position: absolute;
          right: 0;
          top: 0;
          width: $input-height;
          height: $input-height;
          color: $color-gray-deep;
        }
      }

      .sign-in-modal {
        .form-container {
          >div {
            position: relative;
          }

          input[type="text"], input[type="password"], input[type="number"] {
            border-radius: 4px;
            border: 1px solid $color-gray-deep;
          }

          input[type=checkbox] {
            margin-left: 5px;
          }
        }
      }

      .sign-up-modal {
        .slogan {
          height: 54px;
        }

        .form {
          border-radius: 4px;
          border: 1px solid $color-gray-deep;
          overflow: hidden;

          >div {
            position: relative;
          }
        }

        input {
          width: 100%;
          border: 0;
          border-bottom: 1px solid $color-gray-normal;

          &.last-input {
            border-bottom: 0;
          }
        }
      }

      .checkAndSend {
        position: absolute;
        right: 0;
        top: 0;
        height: $input-height;
        padding: 0 10px;
        font-size: 12px;
        color: $color-text-normal;
      }
    }
  }
</style>

<template>
  <div
    id="space3D"
    :class="[ showModal ? 'space-enter' : 'space-leave' ]"
    @click="hiddenSign"
  >
    <div class="sign-modal-wrap abs" ref="wrap">
      <div
        class="sign-modal sign-in-modal"
        :class="{
          'sign-in-init' : !showSignIn && !showSignUp,
          'sign-in-show' : showSignIn && !showSignUp,
          'sign-in-turn' : !showSignIn && showSignUp
        }"
        @click.stop
      >
        <div class="form-container" v-show="showReset">
          <img class="logo" src="https://image.calibur.tv/owner/sign-logo.jpeg?imageMogr2/auto-orient/strip" alt="sign-logo">
          <reset-password-form
            @to-login="showReset = false"
            @to-register="showRegister"
          ></reset-password-form>
        </div>
        <div class="form-container" v-show="!showReset">
          <sign-in-form
            @to-reset="showReset = true"
            @to-register="showRegister"
          ></sign-in-form>
        </div>
      </div>
      <div
        class="sign-modal sign-up-modal"
        :class="{
          'sign-up-init' : !showSignUp && !showSignIn,
          'sign-up-show' : showSignUp && !showSignIn,
          'sign-up-turn' : !showSignUp && showSignIn
        }"
        @click.stop
      >
        <div class="slogan"></div>
        <div class="form-container">
          <sign-up-form
            @to-login="showLogin"
          ></sign-up-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SignInForm from '~/components/forms/SignInForm'
  import SignUpForm from '~/components/forms/SignUpForm'
  import ResetPasswordForm from '~/components/forms/ResetPasswordForm'

  export default {
    name: 'v-sign',
    components: {
      SignUpForm,
      SignInForm,
      ResetPasswordForm
    },
    data () {
      return {
        showModal: false,
        showSignIn: false,
        showSignUp: false,
        showReset: false
      }
    },
    watch: {
      showModal (val) {
        val ? this.$backdrop.show({
          ele: this.$refs.wrap
        }) : this.$backdrop.hide()
      }
    },
    beforeMount () {
      this.$channel.$on('sign-in', () => {
        this.showLogin()
      })
      this.$channel.$on('sign-up', () => {
        this.showRegister()
      })
    },
    methods: {
      showLogin () {
        this.showReset = false
        this.showModal = true
        this.showSignIn = true
        this.showSignUp = false
      },
      showRegister () {
        this.showModal = true
        this.showSignUp = true
        this.showSignIn = false
      },
      hiddenSign () {
        this.showModal = false
        this.showSignIn = false
        this.showSignUp = false
        this.showReset = false
      }
    }
  }
</script>
