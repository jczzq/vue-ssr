<style lang="scss">
  .comment-reply-form {
    .input-wrap {
      overflow: hidden;

      input {
        width: 100%;
        height: 28px;
        padding-left: 5px;
        font-size: 12px;
      }
    }

    .btn-group {
      float: right;

      button {
        margin-left: 10px;
      }
    }
  }
</style>

<template>
  <div class="comment-reply-form" v-if="open">
    <div class="btn-group">
      <el-button
        size="mini"
        @click="cancel"
        type="info"
        plain
      >取消</el-button>
      <el-button
        type="primary"
        @click="submit"
        :loading="submitting"
        size="mini"
      >发表</el-button>
    </div>
    <div class="input-wrap">
      <input
        type="text"
        placeholder="请缩减至100字以内"
        v-model.trim="content"
        maxlength="100"
        ref="input"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comment-reply-form',
    props: {
      type: {
        required: true,
        type: String,
        validator: val => ~['post'].indexOf(val)
      },
      id: {
        required: true,
        type: Number
      },
      toUserId: {
        required: true,
        type: Number
      },
      value: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data () {
      return {
        open: this.value,
        submitting: false,
        content: ''
      }
    },
    methods: {
      cancel () {
        this.open = false
      },
      async submit () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.submitting) {
          return
        }
        this.submitting = true
        try {
          await this.$store.dispatch('comment/createSubComment', {
            id: this.id,
            ctx: this,
            type: this.type,
            content: this.content,
            targetUserId: this.toUserId
          })
          this.open = false
          this.content = ''
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.submitting = false
        }
      }
    },
    mounted () {
      this.$watch('value', (val) => {
        this.open = val
        if (val) {
          this.$nextTick(() => {
            this.$refs.input.focus()
          })
        }
      })
      this.$watch('open', (val) => {
        this.$emit('input', val)
      })
    }
  }
</script>
