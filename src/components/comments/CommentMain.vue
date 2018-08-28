<style lang="scss">
#comment-wrap {
    .load-more-btn {
        margin-top: 20px;
        margin-bottom: 20px;

        button {
            width: 100%;
        }
    }
}
</style>

<template>
    <div id="comment-wrap">
        <!-- 主列表的头部 -->
        <slot name="header"></slot>
        <!-- 主列表的 list -->
        <div id="comment-list-wrap">
            <!-- 每条主评论 -->
            <div v-for="comment in list"
                 :key="comment.id"
                 class="comment-item-wrap">
                <!-- 主评论的内容 -->
                <slot name="comment-item"
                      :comment="comment"></slot>
                <!-- 主评论的子评论列表 -->
                <slot name="sub-comment-list"
                      :parent-comment="comment"></slot>
            </div>
        </div>
        <div id="comment-list-footer">
            <!-- TODO: 支持分页的展示形式 -->
            <slot name="load">
                <div class="load-more-btn">
                    <el-button type="info"
                               v-if="!noMore"
                               :loading="loading"
                               @click="loadMore"
                               plain
                               round>{{ loading ? '加载中...' : '加载更多' }}</el-button>
                </div>
            </slot>
            <!-- 主列表的底部 -->
            <slot name="footer"
                  :reply="reply"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-comment-main',
    props: {
        id: {
            required: true,
            type: [Number, String]
        },
        type: {
            required: true,
            type: String,
            validator: val => ~['post'].indexOf(val)
        },
        onlySeeMaster: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        store() {
            return this.$store.state.comment;
        },
        list() {
            return this.store.list;
        },
        noMore() {
            return this.store.noMore;
        },
        total() {
            return this.store.total;
        },
        submitting() {
            return this.store.submitting;
        }
    },
    data() {
        return {
            loading: false
        };
    },
    methods: {
        async loadMore() {
            if (this.loading) {
                return;
            }
            this.loading = true;
            try {
                await this.$store.dispatch('comment/getMainComments', {
                    ctx: this,
                    type: this.type,
                    id: this.id,
                    onlySeeMaster: this.onlySeeMaster ? 1 : 0
                });
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.loading = false;
            }
        },
        async reply(data) {
            if (this.submitting) {
                return;
            }
            this.$store.commit('comment/SET_SUBMITTING', { result: true });
            try {
                await this.$store.dispatch('comment/createMainComment', {
                    content: data.content,
                    images: data.images,
                    type: 'post',
                    id: this.id,
                    ctx: this
                });
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.$store.commit('comment/SET_SUBMITTING', { result: false });
                this.$channel.$emit('main-comment-create-success');
            }
        }
    }
};
</script>
