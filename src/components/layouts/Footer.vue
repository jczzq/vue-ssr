<style lang="scss">
#footer {
    width: 100%;
    margin: 30px 0;
    text-align: center;
    position: relative;
    z-index: 2;

    .hr {
        margin: 0 50px;
        font-size: 14px;
    }

    .links {
        margin-top: 10px;
        color: #7f9eb2;
        font-size: 13px;
    }

    .share-tips-modal {
        text-align: left;

        .tips {
            p {
                margin: 25px 10px 0 10px;
            }

            .footer {
                padding: 20px;

                button {
                    float: right;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>

<template>
    <footer id="footer"
            v-if="show">
        <v-hr text="calibur - 天下漫友是一家"></v-hr>
        <div class="links">
            <a href="/about/hello"
               target="_blank">功能简介</a>
            &nbsp;·&nbsp;
            <a href="javascript:;"
               @click="openShareModal">分享网站</a>
            <v-modal v-model="toggleShareModal"
                     class="share-tips-modal"
                     header-text="感谢分享"
                     :footer="false">
                <div class="tips">
                    <p>
                        【calibur.tv】一个纯粹的二次元社区网站，致力于实现"天下漫友是一家"！
                    </p>
                    <p>
                        站内海量动漫资源在线播放，更有看漫画、cosplay、发帖、为偶像应援等功能，每天签到送金币（1金币 = 1人民币）！
                    </p>
                    <p>
                        快来加入我们吧~\(^o^)/~ 网址：http://calibur.tv
                    </p>
                    <div class="footer"
                         slot="footer">
                        <el-button type="primary"
                                   size="small"
                                   ref="shareBtn"
                                   data-clipboard-text="【calibur.tv】一个纯粹的二次元社区网站，致力于实现'天下漫友是一家'！站内海量动漫资源在线播放，更有看漫画、cosplay、发帖、为偶像应援等功能，每天签到送金币（1金币 = 1人民币）！快来加入我们吧~\(^o^)/~ 网址：http://calibur.tv">点击复制</el-button>
                    </div>
                </div>
            </v-modal>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'v-footer',
    computed: {
        show() {
            return this.$route.name !== 'homepage';
        }
    },
    data() {
        return {
            toggleShareModal: false
        };
    },
    methods: {
        openShareModal() {
            this.toggleShareModal = true;
            this.$nextTick(() => {
                const clipboard = new this.$copy(this.$refs.shareBtn.$el);

                clipboard.on('success', e => {
                    this.$toast.success('复制成功');
                    this.toggleShareModal = false;
                    clipboard.destroy();
                    e.clearSelection();
                });
            });
        }
    }
};
</script>
