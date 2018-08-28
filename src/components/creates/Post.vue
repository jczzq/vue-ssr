<style lang="scss">
.create-post-form {
    .el-upload--picture-card,
    .el-upload-list__item {
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
    <el-form class="create-post-form"
             :model="forms"
             :rules="rules"
             ref="forms"
             label-width="50px">
        <el-form-item label="标题"
                      prop="title">
            <el-input placeholder="请填写标题"
                      v-model.trim="forms.title"></el-input>
        </el-form-item>
        <el-form-item label="番剧"
                      prop="bangumiId">
            <el-select v-model="forms.bangumiId"
                       filterable
                       placeholder="请选择番剧">
                <el-option v-for="item in optionBangumis"
                           :label="item.name"
                           :key="item.id"
                           :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="图片">
            <el-upload action="https://upload.qiniup.com"
                       multiple
                       list-type="picture-card"
                       ref="uploader"
                       :data="uploadHeaders"
                       :on-error="handleError"
                       :on-remove="handleRemove"
                       :on-success="handleSuccess"
                       :on-exceed="handleExceed"
                       :limit="exceed"
                       :before-upload="beforeUpload">
                <i class="el-icon-plus"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="内容"
                      prop="content">
            <el-input type="textarea"
                      placeholder="1000字以内"
                      resize="none"
                      :rows="10"
                      v-model.trim="forms.content"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"
                       @click="submit"
                       :loading="submitting">确认</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'create-post-form',
    data() {
        return {
            forms: {
                title: '',
                bangumiId: '',
                content: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入帖子标题', trigger: 'blur' },
                    { max: 40, message: '请缩减至40字以内！', trigger: 'blur' }
                ],
                bangumiId: [
                    { type: 'number', required: true, message: '请选择相应番剧', trigger: 'change' }
                ],
                content: [
                    {
                        required: true,
                        max: 1000,
                        message: '内容不能为空，且不超过1000字',
                        trigger: 'blur'
                    }
                ]
            },
            uploadHeaders: {
                token: ''
            },
            images: [],
            exceed: 6,
            appendBangumi: [],
            loadingFetchBangumi: false,
            submitting: false
        };
    },
    computed: {
        postId() {
            return this.$route.name === 'post-show' ? parseInt(this.$route.params.id, 10) : 0;
        },
        bangumiId() {
            return this.$route.name === 'bangumi-show' ? parseInt(this.$route.params.id, 10) : 0;
        },
        formatContent() {
            let content = this.forms.content;
            while (content.match('\n\n\n') !== null) {
                content = content.replace(/\n\n\n/g, '\n\n');
            }
            content = content.split('\n');

            const res = [];
            content.forEach(item => {
                res.push(item ? `<p>${item}</p>` : '<p><br/></p>');
            });

            return res.join('');
        },
        formatImages() {
            return this.images.map(item => item.img);
        },
        bangumis() {
            return this.$store.state.users.self.followBangumi;
        },
        optionBangumis() {
            return this.appendBangumi.concat(this.bangumis);
        }
    },
    methods: {
        submit() {
            if (!this.$store.state.login) {
                this.$toast.info('继续操作前请先登录');
                this.$channel.$emit('sign-in');
                return;
            }
            if (this.submitting) {
                return;
            }
            this.submitting = true;
            this.$refs.forms.validate(valid => {
                if (valid) {
                    this.$captcha({
                        success: async ({ data }) => {
                            try {
                                const id = await this.$store.dispatch('post/create', {
                                    title: this.forms.title,
                                    bangumiId: this.forms.bangumiId,
                                    desc: this.forms.content.substring(0, 120),
                                    content: this.formatContent,
                                    images: this.formatImages,
                                    geetest: data,
                                    ctx: this
                                });
                                this.images = [];
                                this.$refs.forms.resetFields();
                                this.$emit('submit');
                                this.$toast.success('发布成功！');
                                window.location = this.$alias.post(id);
                                this.submitting = false;
                            } catch (err) {
                                this.$toast.error(err);
                                this.submitting = false;
                            }
                        },
                        error: e => {
                            this.submitting = false;
                            this.$toast.error(e);
                        }
                    });
                } else {
                    this.submitting = false;
                    return false;
                }
            });
        },
        async getUserFollowedBangumis() {
            if (this.bangumiId) {
                this.forms.bangumiId = this.bangumiId;
            }
            if (this.bangumis.length) {
                this.$nextTick(() => {
                    this.$channel.$emit('get-page-bangumi-for-post-create');
                });
                return;
            }
            if (this.loadingFetchBangumi) {
                return;
            }
            this.loadingFetchBangumi = true;
            try {
                await this.$store.dispatch('users/getFollowBangumis', {
                    zone: this.$store.state.user.zone,
                    self: true
                });
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.loadingFetchBangumi = false;
                this.$channel.$emit('get-page-bangumi-for-post-create');
            }
        },
        handleError(err, file) {
            console.log(err);
            this.$toast.error(`图片：${file.name} 上传失败`);
        },
        handleRemove(file) {
            this.images.forEach((item, index) => {
                if (item.id === file.uid) {
                    this.images.splice(index, 1);
                }
            });
        },
        handleSuccess(res, file) {
            this.images.push({
                id: file.uid,
                img: res.data
            });
        },
        handleExceed() {
            this.$toast.error(`最多可上传 ${this.exceed} 张图片!`);
        },
        beforeUpload(file) {
            if (!this.$store.state.login) {
                this.$channel.$emit('sign-in');
                return;
            }
            const isFormat = ['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) !== -1;
            const isLt2M = file.size / 1024 / 1024 < 3;

            if (!isFormat) {
                this.$toast.error('图片只能是 JPG 或 PNG 格式!');
                return false;
            }
            if (!isLt2M) {
                this.$toast.error('图片大小不能超过 3MB!');
                return false;
            }

            this.uploadHeaders.key = this.postId
                ? `user/${this.$store.state.user.id}/post/${
                      this.postId
                  }/${new Date().getTime()}-${Math.random()
                      .toString(36)
                      .substring(3, 6)}.${file.type.split('/').pop()}`
                : `user/${this.$store.state.user.id}/post/0/${new Date().getTime()}-${Math.random()
                      .toString(36)
                      .substring(3, 6)}.${file.type.split('/').pop()}`;
            return true;
        },
        async getUpToken() {
            try {
                await this.$store.dispatch('getUpToken', this);
                this.uploadHeaders.token = this.$store.state.user.uptoken.upToken;
            } catch (e) {
                this.$toast.error(e);
            }
        },
        saveBangumiAndSelected(data) {
            this.forms.bangumiId = data.id;
            if (this.optionBangumis.some(_ => _.id === data.id)) {
                return;
            }
            this.appendBangumi.push(data);
        }
    },
    mounted() {
        this.getUserFollowedBangumis();
        this.$channel.$on('set-page-bangumi-for-post-create', data => {
            this.saveBangumiAndSelected(data);
        });
        if (this.$store.state.login) {
            this.getUpToken();
        }
    },
    beforeDestroy() {
        this.$channel.$off('set-page-bangumi-for-post-create');
    }
};
</script>
