<style lang="scss">
.post-comments-wrap {
    background-color: #f7f8fa;
    position: relative;

    .comments-collapsed-btn {
        position: absolute;
        right: 0;
        top: -22px;
        font-size: 13px;
        margin-right: 15px;
    }

    .comments {
        padding: 4px 15px;

        li {
            display: block;
            width: 100%;
        }

        .avatar {
            @include avatar(32px);
        }
    }

    .comment-reply-area {
        padding: 0 15px 10px;
        height: 45px;
        line-height: 35px;

        .open-comment {
            float: right;
            font-size: 13px;
            margin-top: 10px;
        }

        .total {
            margin-left: 10px;
        }
    }

    .comment-reply {
        padding: 14px 15px;
        display: flex;
        flex-direction: row;

        input {
            height: 28px;
            margin-right: 10px;
            flex-grow: 1;
            padding-left: 5px;
        }
    }
}
</style>

<template>
    <div class="post-comments-wrap">
        <!-- 如果已经有评论了，那么点击这个按钮只是展开和收起评论 -->
        <button class="comments-collapsed-btn"
                @click="collapsed = !collapsed"
                v-if="comments.length">
            {{ collapsed ? `回复(${post.comment_count})` : '收起回复' }}
        </button>
        <!-- 如果没有评论，那么这个按钮就是发起评论，允许自己给自己评论 -->
        <button class="comments-collapsed-btn"
                @click="openComment = !openComment"
                v-else>
            {{ openComment ? '收起回复' : '回复' }}
        </button>
        <el-collapse-transition>
            <ul v-show="comments.length && !collapsed"
                class="comments">
                <post-comment-item v-for="comment in comments"
                                   :key="comment.id"
                                   :post-id="post.id"
                                   :comment="comment"></post-comment-item>
            </ul>
        </el-collapse-transition>
        <div class="comment-reply-area"
             v-if="comments.length && !collapsed">
            <!-- 如果有评论了，再显示这里的加载更多和评论按钮，允许给自己评论 -->
            <button class="open-comment"
                    @click="openComment = !openComment">我也说一句</button>
            <el-button v-if="!noMore"
                       type="primary"
                       @click="getComments"
                       :loading="loadingMore"
                       size="mini">点击加载更多</el-button>
            <span class="total">共 {{ post.comment_count }} 条</span>
        </div>
        <div class="comment-reply"
             v-if="openComment">
            <input type="text"
                   placeholder="请缩减至字以内"
                   v-model.trim="content"
                   autofocus
                   maxlength="50">
            <el-button size="mini"
                       @click="openComment = false"
                       type="info"
                       plain>取消</el-button>
            <el-button type="primary"
                       @click="submit"
                       :loading="loadingSubmit"
                       size="mini">发表</el-button>
        </div>
    </div>
</template>

<script>
import PostCommentItem from '~/components/items/PostComment';

export default {
    name: 'PostCommentList',
    components: {
        PostCommentItem
    },
    props: {
        post: {
            required: true,
            type: Object
        }
    },
    computed: {
        comments() {
            return this.$utils.orderBy(this.post.comments, 'id', 'asc');
        },
        noMore() {
            return this.comments.length >= this.post.comment_count;
        },
        isMine() {
            if (!this.$store.state.login) {
                return false;
            }
            return this.$store.state.user.id === this.post.from_user_id;
        }
    },
    data() {
        return {
            collapsed: false,
            openComment: false,
            content: '',
            loadingSubmit: false,
            loadingMore: false
        };
    },
    methods: {
        async getComments() {
            if (this.loadingMore) {
                return;
            }
            this.loadingMore = true;

            try {
                await this.$store.dispatch('post/getComments', {
                    ctx: this,
                    id: this.post.id
                });
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.loadingMore = false;
            }
        },
        async submit() {
            if (!this.$store.state.login) {
                this.$channel.$emit('sign-in');
                return;
            }
            if (!this.content || this.loadingSubmit) {
                return;
            }
            this.loadingSubmit = true;
            try {
                await this.$store.dispatch('post/setComment', {
                    ctx: this,
                    id: this.post.id,
                    targetUserId: this.isMine ? 0 : this.post.from_user_id,
                    content: this.content
                });
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.openComment = false;
                this.content = '';
                this.loadingSubmit = false;
            }
        }
    }
};
</script>
