<style lang="scss">
.post-sub-comment-list-wrap {
    position: relative;
    background-color: #f7f8fa;
    margin-left: 175px;
    padding: 0 15px;
    border-radius: 5px;

    .comments-collapsed-btn {
        position: absolute;
        right: 5px;
        top: -27px;
        font-size: 13px;
    }
    .sub-comment-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        .more {
            button {
                margin-left: 5px;
            }

            .total {
                margin-left: 10px;
                color: #99a2aa;
                font-size: 12px;
            }
        }

        .toggle {
            font-size: 13px;
        }
    }

    .footer-reply-area {
        padding: 15px 0;
    }
}
</style>

<template>
    <div class="post-sub-comment-list-wrap">
        <button class="comments-collapsed-btn"
                @click="clickCollapsedBtn"
                v-text="computeCollapsedBtnText"></button>
        <el-collapse-transition>
            <div class="post-sub-comment-list"
                 v-if="hasComment && !collapsed">
                <post-sub-comment-item v-for="comment in comments.list"
                                       :key="comment.id"
                                       :comment="comment"
                                       :parent-user-id="authorId"></post-sub-comment-item>
            </div>
        </el-collapse-transition>
        <div class="sub-comment-footer"
             v-if="hasComment && !collapsed">
            <div class="more">
                <el-button :loading="loading"
                           size="mini"
                           v-if="!comments.noMore"
                           @click="loadMore"
                           round>点击加载更多</el-button>
                <span class="total">共{{ comments.total }}条</span>
            </div>
            <button class="toggle"
                    @click="toggleCommentArea">我也说一句</button>
        </div>
        <comment-reply-form type="post"
                            class="footer-reply-area"
                            :id="parentId"
                            :to-user-id="authorId"
                            v-model="showReplyArea"></comment-reply-form>
    </div>
</template>

<script>
import PostSubCommentItem from '~/components/post/PostSubCommentItem';
import CommentReplyForm from '~/components/forms/CommentReplyForm';

export default {
    name: 'post-sub-comment-list',
    props: {
        parentComment: {
            required: true,
            type: Object
        }
    },
    components: {
        PostSubCommentItem,
        CommentReplyForm
    },
    computed: {
        comments() {
            return this.parentComment.comments;
        },
        parentId() {
            return this.parentComment.id;
        },
        authorId() {
            return this.parentComment.from_user_id;
        },
        computeCollapsedBtnText() {
            if (this.hasComment) {
                if (this.collapsed) {
                    return `回复(${this.comments.total})`;
                }
                return '收起回复';
            }
            if (this.showReplyArea) {
                return '收起';
            }
            return '回复';
        },
        hasComment() {
            return !!this.comments.list.length;
        }
    },
    data() {
        return {
            collapsed: false,
            showReplyArea: false,
            loading: false
        };
    },
    methods: {
        clickCollapsedBtn() {
            if (this.hasComment) {
                this.collapsed = !this.collapsed;
            } else {
                this.showReplyArea = !this.showReplyArea;
            }
        },
        toggleCommentArea() {
            this.showReplyArea = !this.showReplyArea;
        },
        async loadMore() {
            if (this.loading) {
                return;
            }
            this.loading = true;
            try {
                await this.$store.dispatch('comment/getSubComments', {
                    ctx: this,
                    type: 'post',
                    parentId: this.parentId
                });
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
