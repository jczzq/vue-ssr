<style lang="scss">
$tool-height: 40px;
$tool-btn-width: 40px;

.vue-pwa-video {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: 100% !important;
    position: relative;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    z-index: 0;

    #video-wrap {
        width: 100%;
        height: 100%;
    }

    .not-play-screen {
        width: 100%;
        height: 600px;
        color: #ffffff;
        text-align: center;
        top: -50%;
        transform: translateY(50%);
        z-index: 999;

        p {
            width: 100%;
        }

        a {
            margin-top: 20px;
            display: inline-block;
            border-radius: 5px;
            border: 1px solid #fff;
            padding: 10px 15px;

            &:hover {
                background-color: rgba(255, 255, 255, 0.3);
            }
        }
    }

    container {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
    }

    video {
        width: 100%;
        height: 100%;
        display: block;
        background-color: #000;
        cursor: pointer;
    }

    video:focus,
    video:active {
        outline: none;
    }

    chimee-control-wrap {
        width: 100%;
        height: 40px;
        align-items: center;
        background-color: #fff;
    }

    chimee-progresstime {
        color: $color-text-light;
        font-size: 13px;
        margin-right: 10px;
    }

    chimee-volume-bar {
        margin-top: -2px;
    }

    chimee-progressbar-all,
    chimee-volume-bar-all {
        background-color: $color-blue-normal !important;
    }

    chimee-progressbar-buffer {
        background-color: $color-blue-light;
    }

    chimee-progressbar-ball,
    chimee-volume-bar-all:after {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        width: 14px !important;
        height: 14px !important;
    }

    .chimee-progressbar-line,
    chimee-volume-bar-bg,
    chimee-volume-bar-all {
        height: 6px !important;
        border-radius: 4px;
    }

    chimee-center-state-loading {
        box-sizing: content-box;
    }

    chimee-volume-bar-all:after {
        top: -4px;
    }

    chimee-progressbar-tip {
        background-color: $color-gray-normal;
        color: #6b6b6b;
        font-size: 12px;
    }

    chimee-control-state {
        margin-right: 0;
    }

    chimee-volume-state {
        margin-right: 4px;
    }

    chimee-progressbar-bg,
    chimee-volume-bar-bg {
        background-color: $color-gray-normal !important;
    }

    chimee-center-state-error {
        color: #fff !important;
        font-size: 16px !important;
        text-shadow: none;
        font-weight: normal;
    }
}
</style>

<template>
    <div class="vue-pwa-video">
        <div v-if="otherSrc"
             class="not-play-screen">
            <p>应版权方要求 (⇀‸↼‶)，该视频暂不提供站内播放</p>
            <a :href="source"
               target="_blank">播放链接</a>
        </div>
        <!--
    <div v-else-if="isGuest" class="not-play-screen">
      <p>流量压力太大了 (ಥ_ಥ)，需要登录才能看视频</p>
      <a @click="$channel.$emit('sign-in')">立即登录</a>
    </div>
    -->
        <div id="video-wrap"
             v-else></div>
    </div>
</template>

<script>
import Chimee from 'chimee';
import chimeePluginControlbar from 'chimee-plugin-controlbar';

export default {
    name: 'v-video',
    props: {
        source: {
            default: '',
            required: true
        },
        otherSrc: {
            type: Boolean,
            required: true
        },
        info: {
            type: String
        },
        poster: {
            type: String
        },
        auto: {
            type: Boolean,
            default: false
        },
        keyboard: {
            type: Boolean,
            default: true
        },
        cover: {
            type: Boolean,
            default: false
        },
        loading: {
            type: String
        },
        screenclick: {
            type: Boolean,
            default: true
        },
        showvioce: {
            type: Boolean,
            default: true
        },
        next: {
            type: String,
            default: ''
        },
        debug: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isGuest() {
            return !this.$store.state.login;
        },
        isFlv() {
            return (
                this.source
                    .split('?')[0]
                    .split('.')
                    .pop()
                    .toLowerCase() === 'flv'
            );
        }
    },
    data() {
        return {
            player: null
        };
    },
    methods: {
        initVideo({ flvKernel, statePlugin }) {
            this.player = new Chimee({
                wrapper: '#video-wrap',
                src: this.source,
                controls: true,
                autoplay: this.auto,
                kernels: flvKernel ? { flv: flvKernel } : {},
                plugin: [
                    {
                        name: chimeePluginControlbar.name,
                        majorColor: '#99a2aa',
                        hoverColor: '#6d757a',
                        children: {
                            play: true,
                            progressBar: {
                                layout: 'one-line'
                            },
                            progressTime: true,
                            volume: true,
                            screen: true
                        }
                    },
                    {
                        name: statePlugin.name
                    }
                ]
            });
        }
    },
    mounted() {
        if (this.otherSrc) {
            return;
        }
        Chimee.install(chimeePluginControlbar);
        import('chimee-plugin-center-state').then(chimeePluginCenterState => {
            Chimee.install(chimeePluginCenterState);
            if (this.isFlv) {
                import('chimee-kernel-flv').then(module => {
                    this.initVideo({
                        flvKernel: module,
                        statePlugin: chimeePluginCenterState
                    });
                });
            } else {
                this.initVideo({
                    flvKernel: null,
                    statePlugin: chimeePluginCenterState
                });
            }
        });
    }
};
</script>
