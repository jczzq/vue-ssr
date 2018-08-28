<style lang="scss">
.post-comment-item {
    padding-top: 10px;
    line-height: 20px;

    .comment-content {
        font-size: 14px;
        color: #222;
    }

    .from-user {
        margin-right: 10px;
        vertical-align: middle;
        display: inline-block;
    }

    .reply-area {
        text-align: right;
        line-height: 13px;

        button {
            margin-left: 5px;
        }
    }

    .input-field {
        display: flex;
        flex-direction: row;
        margin-top: 14px;

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
    <li class="post-comment-item">
        <a class="from-user"
           :href="$alias.user(comment.from_user_zone)"
           target="_blank">
            <v-img class="avatar"
                   :src="comment.from_user_avatar"
                   width="32"
                   height="32"></v-img>
        </a>
        <a class="href-fade-blue"
           :href="$alias.user(comment.from_user_zone)"
           target="_blank"
           v-text="comment.from_user_name"></a>
        <template v-if="comment.to_user_zone">
            回复
            <a class="href-fade-blue"
               :href="$alias.user(comment.to_user_zone)"
               target="_blank"
               v-text="comment.to_user_name"></a>
        </template>
        :
        <span class="comment-content">{{ comment.content }}</span>
        <div class="reply-area">
            <v-time v-model="comment.created_at"></v-time>
            <button v-if="canDelete"
                    @click="deleteComment">删除</button>
            <button @click="openComment = !openComment"
                    v-if="(comment.from_user_id !== currentUserId)">
                {{ openComment ? '收起' : '回复' }}
            </button>
        </div>
        <div class="input-field"
             v-if="openComment">
            <input type="text"
                   placeholder="请缩减至100字以内"
                   v-model.trim="content"
                   autofocus
                   maxlength="100">
            <el-button size="mini"
                       @click="openComment = false"
                       type="info"
                       plain>取消</el-button>
            <el-button type="primary"
                       @click="submit"
                       :loading="loading"
                       size="mini">发表</el-button>
        </div>
    </li>
</template>

<script>
export default {
    name: 'PostCommentItem',
    props: {
        comment: {
            type: Object,
            required: true
        },
        postId: {
            type: Number,
            required: true
        }
    },
    computed: {
        currentUserId() {
            return this.$store.state.login ? this.$store.state.user.id : 0;
        },
        canDelete() {
            return this.currentUserId === this.comment.from_user_id;
        }
    },
    data() {
        return {
            loading: false,
            content: '',
            openComment: false
        };
    },
    methods: {
        async submit() {
            if (!this.$store.state.login) {
                this.$channel.$emit('sign-in');
                return;
            }
            if (!this.content || this.loading) {
                return;
            }
            this.loading = true;
            try {
                await this.$store.dispatch('post/setComment', {
                    ctx: this,
                    id: this.postId,
                    targetUserId: this.comment.from_user_id,
                    content: this.content
                });
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.openComment = false;
                this.content = '';
                this.loading = false;
            }
        },
        deleteComment() {
            this.$confirm('删除后无法找回, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$store.dispatch('post/deleteComment', {
                        ctx: this,
                        postId: this.postId,
                        commentId: this.comment.id
                    });
                })
                .catch(e => {
                    if (e === 'cancel') {
                        return;
                    }
                    this.$toast.error(e);
                });
        }
    }
};
</script>
