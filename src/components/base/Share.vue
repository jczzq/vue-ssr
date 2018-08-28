<style lang="scss">
.v-share {
    .ic-link {
        color: #9266f9;
        border-color: #9266f9;

        &:hover {
            background-color: #9266f9;
        }

        &:before {
            content: '\e63f';
        }
    }

    .ic-qq {
        color: #56b6e7;
        border-color: #56b6e7;

        &:hover {
            background-color: #56b6e7;
        }

        &:before {
            content: '\e68b';
        }
    }

    .ic-weibo {
        color: #ff763b;
        border-color: #ff763b;

        &:hover {
            background-color: #ff763b;
        }

        &:before {
            content: '\e60e';
        }
    }

    .ic-douban {
        color: #33b045;
        border-color: #33b045;

        &:hover {
            background-color: #33b045;
        }

        &:before {
            content: '\e601';
        }
    }

    .ic-qzone {
        color: #fdbe3d;
        border-color: #fdbe3d;

        &:hover {
            background-color: #fdbe3d;
        }

        &:before {
            content: '\e6f8';
        }
    }

    .ic-wechat {
        color: #7bc549;
        border-color: #7bc549;

        &:hover {
            background-color: #7bc549;

            .wechat-qrcode {
                display: block;
            }
        }

        &:before {
            content: '\e673';
        }

        .wechat-qrcode {
            display: none;
            border: 1px solid #eee;
            position: absolute;
            z-index: 9;
            top: -205px;
            left: -84px;
            width: 200px;
            height: 192px;
            color: #666;
            font-size: 12px;
            text-align: center;
            background-color: #fff;
            box-shadow: 0 2px 10px #aaa;
            transition: all 200ms;

            .button {
                top: 40px;
                left: -84px;

                &:after {
                    display: none;
                }
            }

            h4 {
                font-weight: normal;
                height: 26px;
                line-height: 26px;
                font-size: 12px;
                background-color: #f3f3f3;
                margin: 0;
                padding: 0;
                color: #777;
            }

            .qrcode {
                width: 105px;
                margin: 10px auto;

                table {
                    margin: 0 !important;
                }
            }

            .help p {
                font-weight: normal;
                line-height: 16px;
                padding: 0;
                margin: 0;
            }

            &:after {
                content: '';
                position: absolute;
                left: 50%;
                margin-left: -6px;
                bottom: -13px;
                width: 0;
                height: 0;
                border-width: 8px 6px 6px 6px;
                border-style: solid;
                border-color: #fff transparent transparent transparent;
            }
        }
    }

    &.v-share-button {
        button {
            display: block;
            width: 100%;
            padding: 0 20px;
            height: 40px;
            font-size: 14px;
            text-align: left;

            &:hover {
                background: #f6f6f6;
            }
        }
    }

    &.v-share-panel {
        .share-icon {
            position: relative;
            display: inline-block;
            width: 32px;
            height: 32px;
            font-size: 20px;
            border-radius: 50%;
            line-height: 32px;
            border-width: 1px;
            border-style: solid;
            text-align: center;
            vertical-align: middle;
            transition: background 0.6s ease-out 0s;
            font-family: 'iconfont' !important;
            margin: 4px;

            &:hover {
                color: #fff;
            }
        }
    }
}

.share-popover {
    text-align: center;
    border-radius: 0;

    .el-popover__title {
        height: 26px;
        line-height: 26px;
        background-color: #f3f3f3;
        color: #777;
        font-size: 12px;
    }

    .qr-code {
        width: 105px;
        margin: 10px auto;
    }

    .help {
        margin-bottom: 10px;

        p {
            line-height: 16px;
            color: #666;
            font-size: 12px;
        }
    }
}
</style>

<template>
    <div class="v-share"
         v-if="type === 'button'">
        <el-popover ref="popover2"
                    placement="top"
                    width="120"
                    trigger="click"
                    popper-class="v-share v-share-button">
            <button v-if="canRender"
                    :data-clipboard-text="shareUrl"
                    ref="copy">
                <i class="iconfont ic-link"></i> 复制链接
            </button>
            <button @click="makeUrl('weibo')">
                <i class="iconfont ic-weibo"></i> 微博
            </button>
            <button @click="makeUrl('qq')">
                <i class="iconfont ic-qq"></i> QQ
            </button>
            <button @click="makeUrl('douban')">
                <i class="iconfont ic-douban"></i> 豆瓣
            </button>
            <button @click="makeUrl('qzone')">
                <i class="iconfont ic-qzone"></i> QQ空间
            </button>
        </el-popover>
        <slot>
            <button class="share-btn"
                    v-popover:popover2>
                <i class="iconfont icon-emizhifeiji"></i> 分享
            </button>
        </slot>
    </div>
    <div class="v-share v-share-panel"
         v-else-if="type === 'panel'">
        <el-popover ref="popover"
                    placement="top"
                    title="微信扫一扫：分享"
                    width="200"
                    trigger="hover"
                    popper-class="share-popover">
            <div>
                <div class="qr-code"
                     ref="qr"></div>
                <div class="help">
                    <p>微信里点“发现”，扫一下</p>
                    <p>二维码便可将本页面分享至朋友圈</p>
                </div>
            </div>
        </el-popover>
        <button class="share-icon ic-weibo"
                @click="makeUrl('weibo')"></button>
        <button class="share-icon ic-qq"
                @click="makeUrl('qq')"></button>
        <button class="share-icon ic-wechat"
                v-popover:popover></button>
        <button class="share-icon ic-douban"
                @click="makeUrl('douban')"></button>
        <button class="share-icon ic-qzone"
                @click="makeUrl('qzone')"></button>
        <el-tooltip v-if="canRender"
                    class="item"
                    effect="dark"
                    content="复制链接"
                    placement="top">
            <button class="share-icon ic-link"
                    :data-clipboard-text="shareUrl"
                    ref="copy"></button>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: 'v-share',
    props: {
        image: {
            type: String
        },
        title: {
            type: String
        },
        desc: {
            type: String
        },
        type: {
            type: String,
            required: true,
            validator: val => ~['button', 'panel'].indexOf(val)
        },
        url: {
            type: String
        }
    },
    computed: {
        shareUrl() {
            return this.url
                ? `${window.location.origin}${this.url}`
                : `${window.location.origin}${this.$route.fullPath}`;
        }
    },
    data() {
        return {
            weiboKey: '',
            canRender: false
        };
    },
    methods: {
        shareTitle() {
            return `${this.title || document.title} - ${
                document.querySelector('meta[name=description]').content
            }`;
        },
        shareDesc() {
            return `${(
                this.desc || document.querySelector('meta[name=description]').content
            ).substring(0, 100)}...`;
        },
        shareImage() {
            if (this.image) {
                return this.image;
            }
            const images = document.querySelectorAll('.share-img');
            if (!images.length) {
                return '';
            }
            return images[images.length - 1];
        },
        shareSource() {
            return (
                (document.querySelector('meta[name=site]') &&
                    document.querySelector('meta[name=site]').content) ||
                document.title
            );
        },
        makeUrl(type) {
            let result = '/';
            if (type === 'weibo') {
                result = `https://service.weibo.com/share/share.php?url=${
                    this.shareUrl
                }&title=${this.shareTitle()}&pic=${this.shareImage()}&appkey=${this.weiboKey}`;
            } else if (type === 'qq') {
                result = `http://connect.qq.com/widget/shareqq/index.html?url=${
                    this.shareUrl
                }&title=${this.shareTitle()}&source=${this.shareSource()}&desc=${this.shareDesc()}&pics=${this.shareImage()}&summary="${this.shareDesc()}"`;
            } else if (type === 'douban') {
                result = `http://shuo.douban.com/!service/share?href=${
                    this.shareUrl
                }&name=${this.shareTitle()}&text=${this.shareDesc()}&image=${this.shareImage()}&starid=0&aid=0&style=11`;
            } else if (type === 'qzone') {
                result = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${
                    this.shareUrl
                }&title=${this.shareTitle()}&desc=${this.shareDesc()}&summary=${this.shareDesc()}&site=${this.shareSource()}`;
            }
            window.open(result);
        },
        makeWechatQrCode() {
            if (this.type === 'button') {
                return;
            }
            this.$nextTick(() => {
                this.$QRCode(this.$refs.qr, this.shareUrl, { width: 105, height: 105 });
            });
        },
        watchCopyLink() {
            this.$nextTick(() => {
                const clipboard = new this.$copy(this.$refs.copy);

                clipboard.on('success', () => {
                    this.$toast.success('复制成功');
                });
            });
        }
    },
    mounted() {
        this.canRender = true;
        this.makeWechatQrCode();
        this.watchCopyLink();
    }
};
</script>
