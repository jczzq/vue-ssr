<style lang="scss">
  .create-post-form {
    .el-upload--picture-card, .el-upload-list__item {
      width: 72px !important;
      height: 72px !important;
      line-height: 80px !important;
    }

    .el-upload-list,
    .el-upload--picture-card {
      float: left;
    }
  }
</style>

<template>
  <el-form
    class="create-post-form"
    :model="forms"
    :rules="rules"
    ref="forms"
    label-width="50px"
  >
    <el-form-item label="图片" v-if="withImage">
      <el-upload
        action="https://upload.qiniup.com"
        multiple
        list-type="picture-card"
        ref="uploader"
        :data="uploadHeaders"
        :on-error="handleError"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :limit="exceed"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input
        type="textarea"
        placeholder="1000字以内"
        resize="none"
        :rows="10"
        v-model.trim="forms.content"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" :loading="submitting">发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'create-post-form',
    props: {
      withImage: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        required: true,
        validator: val => ~['post'].indexOf(val)
      }
    },
    computed: {
      isGuest () {
        return !this.$store.state.login
      },
      formatContent () {
        let content = this.forms.content
        while (content.match('\n\n\n') !== null) {
          content = content.replace(/\n\n\n/g, '\n\n')
        }
        content = content.split('\n')

        const res = []
        content.forEach(item => {
          res.push(item ? `<p>${item}</p>` : '<p><br/></p>')
        })

        return res.join('')
      },
      formatImages () {
        return this.images.map(item => item.img)
      },
      submitting () {
        return this.$store.state.comment.submitting
      }
    },
    data () {
      return {
        forms: {
          content: ''
        },
        rules: {
          content: [
            { required: true, min: 1, max: 1000, message: '内容不能为空，1000字以内', trigger: 'submit' }
          ]
        },
        uploadHeaders: {
          token: ''
        },
        images: [],
        exceed: 5
      }
    },
    methods: {
      submit () {
        if (this.isGuest) {
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        this.$refs.forms.validate((valid) => {
          if (valid) {
            this.$emit('submit', {
              content: this.formatContent,
              images: this.formatImages
            })
            this.$channel.$on('main-comment-create-success', () => {
              this.$channel.$off('main-comment-create-success')
              this.forms = {
                content: ''
              }
              this.$refs.uploader.clearFiles()
            })
          } else {
            return false
          }
        })
      },
      handleError (err, file) {
        console.log(err)
        this.$toast.error(`图片：${file.name} 上传失败`)
      },
      handleRemove (file) {
        this.images.forEach((item, index) => {
          if (item.id === file.uid) {
            this.images.splice(index, 1)
          }
        })
      },
      handleSuccess (res, file) {
        this.images.push({
          id: file.uid,
          img: res.data
        })
      },
      handleExceed () {
        this.$toast.error(`最多可上传 ${this.exceed} 张图片!`)
      },
      beforeUpload (file) {
        if (this.isGuest) {
          this.$channel.$emit('sign-in')
          return
        }

        const isFormat = ['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) !== -1
        const isLt2M = file.size / 1024 / 1024 < 5

        if (!isFormat) {
          this.$toast.error('图片只能是 JPG 或 PNG 格式!')
          return false
        }
        if (!isLt2M) {
          this.$toast.error('图片大小不能超过 5MB!')
          return false
        }

        this.uploadHeaders.key = this.$utils.createFileName({
          userId: this.$store.state.user.id,
          type: this.type,
          id: this.postId,
          file
        })

        return true
      },
      async getUpToken () {
        try {
          await this.$store.dispatch('getUpToken', this)
          this.uploadHeaders.token = this.$store.state.user.uptoken.upToken
        } catch (e) {
          this.$toast.error(e)
        }
      }
    },
    mounted () {
      if (!this.isGuest && this.withImage) {
        this.getUpToken()
      }
    }
  }
</script>
