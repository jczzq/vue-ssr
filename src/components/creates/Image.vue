<style lang="scss">
  .create-image-modal {
    .el-radio-group {
      margin-left: 20px;
      margin-bottom: 30px;
    }
  }
</style>

<template>
  <v-modal
    v-model="show"
    header-text="上传图片"
    @submit="handleFormSubmit"
    class="create-image-modal"
    :loading="submitting"
  >
    <el-radio-group v-model="action" size="mini">
      <el-radio-button label="上传图片"></el-radio-button>
      <el-radio-button label="新建相册"></el-radio-button>
    </el-radio-group>
    <el-form
      ref="form"
      label-width="60px"
    >
      <template v-if="action === '上传图片'">
        <el-row>
          <el-col :span="10">
            <el-form-item label="类型">
              <el-select
                v-model="form.tags"
                placeholder="请选择类型"
              >
                <el-option
                  v-for="item in options.tags"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="尺寸">
              <el-select
                v-model="form.size"
                placeholder="请选择尺寸"
              >
                <el-option
                  v-for="item in options.size"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="番剧">
              <el-select v-model="form.bangumiId" filterable placeholder="请选择番剧" @change="getBangumiRoles">
                <el-option
                  v-for="item in bangumis"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="角色">
              <el-select
                v-model="form.roleId"
                placeholder="请选择角色（可选）"
              >
                <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="相册">
              <el-select v-model="form.albumId" filterable clearable placeholder="请选择相册（可选）">
                <el-option
                  v-for="item in albums"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="原创">
          <el-switch v-model="form.creator"></el-switch>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="https://upload.qiniup.com"
            ref="uploader"
            :data="uploadHeaders"
            :on-error="handleErrorImage"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeUploadImage"
            :file-list="form.images"
            :on-exceed="handleExceed"
            multiple
            :limit="exceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </template>
      <template v-else-if="action === '新建相册'">
        <el-row>
          <el-col :span="16">
            <el-form-item label="名称">
              <el-input v-model="albumForm.name" placeholder="请填写相册名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="番剧">
            <el-select v-model="albumForm.bangumiId" filterable placeholder="请选择番剧">
              <el-option
                v-for="item in bangumis"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-form-item label="漫画" v-if="user.faker">
          <el-switch v-model="albumForm.isCartoon"></el-switch>
        </el-form-item>
        <el-form-item label="原创">
          <el-switch v-model="albumForm.creator"></el-switch>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            action="https://upload.qiniup.com"
            ref="albumUploader"
            :data="uploadHeaders"
            :on-error="handleError"
            :on-remove="handleAlbumPosterRemove"
            :on-success="handleAlbumUploadSuccess"
            :before-upload="beforeUpload"
            :file-list="albumForm.poster"
          >
            <el-button size="small" type="primary" :disalbed="submitting">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </template>
    </el-form>
  </v-modal>
</template>

<script>
  import ImageApi from '~/api/imageApi'

  export default {
    name: 'UploadImageModal',
    computed: {
      albums () {
        return this.$store.state.image.albums
      },
      user () {
        return this.$store.state.user
      },
      zone () {
        return this.user.zone
      }
    },
    data () {
      return {
        uploadHeaders: {
          token: ''
        },
        bangumiRoles: {},
        bangumis: [],
        options: [],
        roles: [],
        loadingUserBangumiFetch: false,
        loadingUploadTypeFetch: false,
        loadingUserAlbumFetch: false,
        show: false,
        submitting: false,
        form: {
          bangumiId: '',
          size: '',
          tags: '',
          roleId: '',
          albumId: '',
          creator: false,
          images: []
        },
        albumForm: {
          name: '',
          bangumiId: '',
          poster: [],
          isCartoon: false,
          creator: false
        },
        action: '上传图片',
        exceed: 10,
        pendingUpload: 0
      }
    },
    methods: {
      async getUserBangumis () {
        if (this.bangumis.length) {
          return
        }
        if (this.loadingUserBangumiFetch) {
          return
        }
        this.loadingUserBangumiFetch = true
        try {
          this.bangumis = await this.$store.dispatch('users/getFollowBangumis', {
            ctx: this,
            zone: this.zone
          })
        } finally {
          this.loadingUserBangumiFetch = false
        }
      },
      async getUploadType () {
        if (this.loadingUploadTypeFetch || this.options.length) {
          return
        }
        this.loadingUploadTypeFetch = true
        const api = new ImageApi(this)
        try {
          this.options = await api.getUploadType()
        } finally {
          this.loadingUploadTypeFetch = false
        }
      },
      async getUserAlbum () {
        if (this.loadingUserAlbumFetch) {
          return
        }
        this.loadingUserAlbumFetch = true
        try {
          await this.$store.dispatch('image/userAlbum', {
            ctx: this
          })
        } finally {
          this.loadingUserAlbumFetch = false
        }
      },
      handleErrorImage (err, file) {
        console.log(err)
        this.$toast.error(`图片：${file.name} 上传失败`)
        this.pendingUpload--
      },
      handleError (err, file) {
        console.log(err)
        this.$toast.error(`图片：${file.name} 上传失败`)
      },
      handleExceed () {
        this.$toast.error(`最多可上传 ${this.exceed} 张图片!`)
      },
      handleRemove (file) {
        if (this.submitting) {
          return
        }
        this.form.images.forEach((item, index) => {
          if (item.uid === file.uid) {
            this.form.images.splice(index, 1)
          }
        })
      },
      handleSuccess (res, file) {
        this.form.images.forEach((item, index) => {
          if (item.uid === file.uid) {
            this.form.images[index] = Object.assign(item, {
              data: res.data,
              status: 'success',
              url: this.$resize(res.data.key, { width: 100 })
            })
          }
        })
        this.pendingUpload--
      },
      handleAlbumPosterRemove () {
        this.albumForm.poster = []
      },
      handleAlbumUploadSuccess (res, file) {
        this.albumForm.poster = [
          {
            name: file.name,
            data: res.data,
            url: this.$resize(res.data.key, { width: 100 })
          }
        ]
      },
      beforeUploadImage (file) {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        const isFormat = ['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) !== -1
        const isLt5M = file.size / 1024 / 1024 < 5

        if (!isFormat) {
          this.$toast.error('图片只能是 JPG 或 PNG 格式!')
          return false
        }
        if (!isLt5M) {
          this.$toast.error('图片大小不能超过 5MB!')
          return false
        }
        this.form.images.push({
          name: file.name,
          percentage: 0,
          raw: file,
          size: file.size,
          status: 'uploading',
          uid: file.uid
        })
        this.pendingUpload++

        this.uploadHeaders.key = `user/${this.$store.state.user.id}/image/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}.${file.type.split('/').pop()}`
      },
      beforeUpload (file) {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        const isFormat = ['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) !== -1
        const isLt5M = file.size / 1024 / 1024 < 5

        if (!isFormat) {
          this.$toast.error('图片只能是 JPG 或 PNG 格式!')
          return false
        }
        if (!isLt5M) {
          this.$toast.error('图片大小不能超过 5MB!')
          return false
        }

        this.uploadHeaders.key = `user/${this.$store.state.user.id}/image/${new Date().getTime()}-${Math.random().toString(36).substring(3, 6)}.${file.type.split('/').pop()}`
      },
      handleFormSubmit () {
        if (this.action === '上传图片') {
          this.uploadImages()
        } else if (this.action === '新建相册') {
          this.createAlbum()
        }
      },
      async getUpToken () {
        try {
          await this.$store.dispatch('getUpToken', this)
          this.uploadHeaders.token = this.$store.state.user.uptoken.upToken
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async getBangumiRoles (bangumiId) {
        if (this.bangumiRoles[bangumiId]) {
          this.roles = this.bangumiRoles[bangumiId]
          return
        }
        try {
          const data = await this.$store.dispatch('bangumi/getRoles', {
            ctx: this,
            bangumiId: bangumiId
          })
          this.bangumiRoles[bangumiId] = data
          this.roles = data
          this.form.roleId = ''
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async uploadImages () {
        if (!this.form.size) {
          this.$toast.error('请先选择尺寸')
          return
        }
        if (!this.form.tags) {
          this.$toast.error('请先选择类型')
          return
        }
        if (!this.form.images.length) {
          this.$toast.error('请先上传图片')
          return
        }
        if (!this.form.bangumiId) {
          this.$toast.error('请选择要投稿的番剧')
          return
        }
        if (this.pendingUpload) {
          this.$toast.error('等待图片上传完成')
          return
        }
        if (this.submitting) {
          return
        }
        this.submitting = true
        const tips = this.$toast.info({
          message: '上传中，请稍候...',
          duration: 0
        })
        const api = new ImageApi(this)
        try {
          const data = await api.uploadImage({
            bangumiId: this.form.bangumiId || 0,
            roleId: this.form.roleId || 0,
            tags: this.form.tags,
            size: this.form.size,
            creator: this.form.creator,
            albumId: this.form.albumId || 0,
            images: this.form.images.map(_ => _.data)
          })
          this.$toast.success('图片上传成功！')
          this.form = {
            albumId: '',
            bangumiId: '',
            size: '',
            tags: '',
            roleId: '',
            creator: false,
            images: []
          }
          this.$refs.uploader.clearFiles()
          this.$store.commit('image/CREATE_WATERFALL', data)
          this.show = false
        } catch (e) {
          this.$toast.error(e)
        } finally {
          tips.close()
          this.submitting = false
        }
      },
      async createAlbum () {
        if (!this.albumForm.name) {
          this.$toast.error('请填写相册名称')
          return
        }
        if (this.albumForm.name.length > 20) {
          this.$toast.error('专题名称请缩减至20字以内')
          return
        }
        if (!this.albumForm.bangumiId) {
          this.$toast.error('请选择要投稿的番剧')
          return
        }
        this.submitting = true
        const api = new ImageApi(this)
        const poster = this.albumForm.poster.length ? this.albumForm.poster[0]['data'] : null
        try {
          const data = await api.createAlbum({
            bangumiId: this.albumForm.bangumiId || 0,
            isCartoon: this.albumForm.isCartoon,
            name: this.albumForm.name,
            url: poster ? poster.key : '',
            width: poster ? poster.width : 0,
            height: poster ? poster.height : 0,
            creator: this.albumForm.creator
          })
          this.$store.commit('image/CREATE_ALBUM', data)
          this.$toast.success('相册创建成功！')
          this.action = '上传图片'
          this.form.albumId = data.id
          this.albumForm = {
            name: '',
            bangumiId: '',
            poster: [],
            isCartoon: false,
            creator: false
          }
          this.$refs.albumUploader.clearFiles()
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.submitting = false
        }
      }
    },
    mounted () {
      this.$channel.$on('open-upload-image-modal', () => {
        this.getUploadType()
        this.getUserBangumis()
        this.getUserAlbum()
        this.getUpToken()
        this.show = true
      })
    }
  }
</script>
