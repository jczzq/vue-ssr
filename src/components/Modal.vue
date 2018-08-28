<style lang="scss">
$time: 0.3s;

.v-modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: transparent;
    pointer-events: all;

    &.modal-leave-active {
        transition: opacity $time;
    }

    &.modal-enter-active,
    &.modal-leave-active {
        .v-modal-mask {
            opacity: 0;
        }

        .v-modal {
            transform: translate(-50%, -70%);
            opacity: 0;
        }
    }

    .v-modal-mask {
        background-color: #ffffff;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        transition: opacity $time;
        opacity: 0.5;
        filter: blur(50px);
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=50, MakeShadow=false);
    }

    .v-modal {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 6px;
        background-color: #fff;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
        transition: opacity $time, transform $time;
        opacity: 1;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        height: auto;
        max-height: 80%;
        max-width: 50%;
        cursor: default;

        > header,
        > main,
        > footer {
            &:before,
            &:after {
                content: '';
                clear: both;
                display: table;
            }
        }

        > header {
            background-color: #f4f4f4;

            h4 {
                font-size: 16px;
                height: 45px;
                line-height: 45px;
                margin: 0;
                padding-left: 20px;
                color: #333;
                text-align: left;
                font-weight: normal;
            }
        }

        .close {
            position: absolute;
            right: 16px;
            top: 16px;
            display: block;
            width: 16px;
            height: 16px;
            line-height: 16px;
            border-radius: 50%;
            color: #c4c6cf;
            font-size: 18px;
            font-family: 'Hiragino Sans GB', Helvetica, Arial, sans-serif;
            text-align: center;

            &:hover {
                color: $color-blue-normal;
            }
        }

        > main {
            padding: 20px;
            font-size: 15px;
            color: #333;
            flex-grow: 1;
            overflow-x: hidden;
            overflow-y: auto;

            .list-loading,
            .list-no-more {
                text-align: center;
                font-size: 13px;
                margin-top: 20px;
            }
        }

        > footer {
            padding: 20px;
            background-color: #fff;

            button {
                float: right;
                margin-left: 10px;
            }

            .cancel {
                background-color: $color-white;
                color: $color-text-light;
                height: 32px;
                font-size: 12px;
                border-radius: 3px;
                padding: 0 15px;

                &:hover {
                    background-color: $color-gray-normal;
                    color: $color-text-normal;
                }
            }
        }
    }
}
</style>

<template>
    <no-ssr>
        <transition name="modal">
            <section class="v-modal-wrap"
                     v-if="toggle">
                <div class="v-modal-mask"
                     @click.stop.prevent="handleCancel"></div>
                <div class="v-modal">
                    <header v-if="header">
                        <slot name="header">
                            <h4 v-text="headerText"></h4>
                        </slot>
                    </header>
                    <a v-if="close"
                       class="close"
                       @click="handleCancel">&times;</a>
                    <main @scroll="handleScroll($event)">
                        <template v-if="scroll">
                            <ul ref="ul">
                                <slot></slot>
                            </ul>
                            <p class="list-loading"
                               v-if="loading">加载中...</p>
                            <p class="list-no-more"
                               v-else-if="noMore">没有更多了</p>
                        </template>
                        <slot v-else></slot>
                    </main>
                    <footer v-if="footer">
                        <slot name="footer">
                            <el-button type="primary"
                                       size="small"
                                       :loading="loading"
                                       @click="handleSubmit"
                                       v-text="submitText"></el-button>
                            <button class="cancel"
                                    @click="handleCancel"
                                    v-text="cancelText"></button>
                        </slot>
                    </footer>
                </div>
            </section>
        </transition>
    </no-ssr>
</template>

<script>
import { debounce } from 'lodash';

export default {
    name: 'v-modal',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        close: {
            type: Boolean,
            default: true
        },
        header: {
            type: Boolean,
            default: true
        },
        footer: {
            type: Boolean,
            default: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        noMore: {
            type: Boolean,
            default: false
        },
        submitText: {
            type: String,
            default: '确认'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        headerText: {
            type: String,
            default: '标题'
        },
        scroll: {
            type: Function,
            default: null
        }
    },
    watch: {
        toggle(val) {
            this.$emit('input', val);
        },
        value(val) {
            this.toggle = val;
            this.drawAnimation(val);
        }
    },
    data() {
        return {
            toggle: this.value
        };
    },
    methods: {
        drawAnimation(isOpen) {
            if (isOpen) {
                document.body.classList.add('v-popup');
            } else {
                document.body.classList.remove('v-popup');
            }
        },
        handleSubmit() {
            this.$emit('submit');
        },
        handleCancel() {
            this.$emit('cancel');
            this.toggle = false;
        },
        handleScroll: debounce(function(evt) {
            if (!this.scroll || this.loading || this.noMore) {
                return;
            }
            const ul = this.$refs.ul;
            if (!ul) {
                return;
            }
            const main = evt.currentTarget || evt.target;
            if (ul.clientHeight - main.clientHeight - main.scrollTop < 30) {
                this.scroll();
            }
        }, 200)
    }
};
</script>
