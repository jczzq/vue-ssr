<style lang="scss">
  .post-sub-comment-item {
    padding-top: 15px;
    line-height: 20px;
    color: #99a2aa;

    .comment-content {
      font-size: 14px;
      color: #222;
      word-break: break-all;
    }

    .avatar {
      margin-right: 10px;
      vertical-align: middle;
      display: inline-block;
      @include avatar-2(32px)
    }

    .reply-area {
      text-align: right;
      line-height: 13px;
      font-size: 12px;

      button {
        margin-left: 5px;
      }
    }

    .comment-reply-form {
      margin-top: 10px;
      padding: 15px 0 15px 5px;
      height: 58px;
    }
  }
</style>

<template>
  <div class="post-sub-comment-item">
    <a class="avatar" :href="$alias.user(comment.from_user_zone)" target="_blank">
      <v-img :src="comment.from_user_avatar" width="32" height="32"></v-img>
    </a>
    <a class="href-fade-blue" :href="$alias.user(comment.from_user_zone)" target="_blank" v-text="comment.from_user_name"></a>
    <template v-if="comment.to_user_zone">
      回复
      <a class="href-fade-blue" :href="$alias.user(comment.to_user_zone)" target="_blank" v-text="comment.to_user_name"></a>
    </template>
    :
    <span class="comment-content">{{ comment.content }}</span>
    <div class="reply-area">
      <v-time v-model="comment.created_at"></v-time>
      <button v-if="canDelete" @click="deleteComment">删除</button>
      <button v-if="!isMine" @click="toggleCommentArea">
        {{ showReplyArea ? '收起' : '回复' }}
      </button>
    </div>
    <comment-reply-form
      type="post"
      :id="comment.parent_id"
      :to-user-id="comment.from_user_id"
      v-model="showReplyArea"
    ></comment-reply-form>
  </div>
</template>

<script>
  import CommentReplyForm from '~/components/forms/CommentReplyForm'

  export default {
    name: 'post-sub-comment-item',
    props: {
      comment: {
        required: true,
        type: Object
      },
      parentUserId: {
        required: true,
        type: Number
      }
    },
    components: {
      CommentReplyForm
    },
    computed: {
      currentUserId () {
        return this.$store.state.login
          ? this.$store.state.user.id
          : 0
      },
      isMine () {
        return this.currentUserId === this.comment.from_user_id
      },
      canDelete () {
        return this.isMine || this.currentUserId === this.parentUserId
      }
    },
    data () {
      return {
        showReplyArea: false,
        deleting: false
      }
    },
    methods: {
      toggleCommentArea () {
        this.showReplyArea = !this.showReplyArea
      },
      deleteComment () {
        if (this.deleting) {
          return
        }
        this.deleting = true
        this.$confirm('删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('comment/deleteSubComment', {
            type: 'post',
            ctx: this,
            id: this.comment.id,
            parentId: this.comment.parent_id
          })
        }).catch((e) => {
          this.deleting = false
          if (e === 'cancel') {
            return
          }
          this.$toast.error(e)
        })
      }
    }
  }
</script>
