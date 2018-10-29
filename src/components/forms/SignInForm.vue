<style lang="scss">
.sign-in-form {
    .sign-in-opt {
        margin-bottom: 10px;
        margin-top: -12px;

        .opt-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }

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
    <div class="sign-in-form">
        <img class="logo"
             src="https://image.calibur.tv/owner/sign-logo.jpeg?imageMogr2/auto-orient/strip"
             alt="sign-logo">
        <el-form :model="form"
                 :rules="rule"
                 ref="form">
            <el-form-item prop="access">
                <el-input type="text"
                          v-model="form.access"
                          placeholder="手机（填写常用手机号，用于登录）"></el-input>
            </el-form-item>
            <el-form-item prop="secret">
                <el-input type="password"
                          v-model="form.secret"
                          placeholder="密码（6-16个字符组成，区分大小写）"></el-input>
            </el-form-item>
            <el-form-item class="sign-in-opt">
                <div class="opt-container">
                    <el-checkbox v-model="form.remember">记住我</el-checkbox>
                    <button type="button"
                            @click="showOAuth">社交账号登录</button>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button class="submit-btn"
                           type="primary"
                           @click="submitForm"
                           :loading="loading">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="others">
            <a @click="showReset">忘记密码?></a>
            <a @click="showRegister">点击注册»</a>
        </div>
    </div>
</template>

<script>
import UserApi from '~/api/userApi';

export default {
    name: 'sign-in-form',
    data() {
        const validateAccess = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请填写手机号'));
            }
            if (value.length !== 11) {
                return callback(new Error('请填写11位手机号'));
            }
            if (
                !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                    value
                )
            ) {
                return callback(new Error('错误的手机号格式'));
            }
            callback();
        };
        const validateSecret = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请填写登录密码'));
            }
            if (value.length < 6) {
                return callback(new Error('密码不能小于6位'));
            }
            if (value.length > 16) {
                return callback(new Error('密码不能大于16位'));
            }
            callback();
        };
        return {
            form: {
                access: '',
                secret: '',
                remember: true
            },
            rule: {
                access: [{ validator: validateAccess, trigger: 'blur' }],
                secret: [{ validator: validateSecret, trigger: 'blur' }]
            },
            loading: false
        };
    },
    methods: {
        submitForm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.login();
                } else {
                    return false;
                }
            });
        },
        login() {
            if (this.loading) {
                return;
            }
            this.loading = true;
            this.$captcha({
                success: ({ data }) => {
                    const api = new UserApi();
                    api.login({
                        access: this.form.access,
                        secret: this.form.secret,
                        remember: this.form.remember,
                        geetest: data
                    })
                        .then(token => {
                            this.$cookie.set('JWT-TOKEN', token, {
                                expires: this.form.remember ? 365 : 1
                            });
                            window.location.reload();
                        })
                        .catch(err => {
                            this.$toast.error(err);
                            this.loading = false;
                        });
                },
                close: () => {
                    this.loading = false;
                },
                error: err => {
                    this.loading = false;
                    this.$toast.error(err);
                }
            });
        },
        showReset() {
            this.$emit('to-reset');
            this.$refs.form.resetFields();
        },
        showRegister() {
            this.$emit('to-register');
            this.$refs.form.resetFields();
        },
        showOAuth() {
            this.$toast.info('暂未开放第三方登录');
        }
    }
};
</script>
