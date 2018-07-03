<style lang="scss">
  .post-item {

    .user {
      width: 180px;
      float: left;

      .avatar {
        display: block;
        margin: 34px auto 5px auto;
        border: 1px solid $color-gray-normal;
        @include avatar(80px);
      }

      .nickname {
        display: block;
        background: #fff;
        width: 98px;
        height: 28px;
        line-height: 24px;
        margin: 0 auto;
        text-align: center;
      }
    }

    .content {
      overflow: hidden;
      background: #fff;
      border-top: 1px solid #e5e9ef;
      padding-top: 22px;
      margin-top: 14px;

      .main {
        min-height: 80px;
      }

      .image {
        width: 100%;
        height: auto;
        margin-bottom: 12px;
        cursor: zoom-in;
      }

      .text-package {
        line-height: 24px;
        padding: 2px 0;
        font-size: 14px;
        overflow: hidden;
        word-wrap: break-word;
      }

      .likes-wrap {
        text-align: center;
        margin: 50px 0;
      }

      .footer {
        color: #99a2aa;
        line-height: 26px;
        font-size: 12px;

        .info-bar {
          height: 40px;
          line-height: 40px;

          .delete-btn,
          .floor-count,
          .like-btn {
            margin-right: 20px;
          }

          .v-share {
            float: right;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="post-item" :id="`post-reply-${post.id}`">
    <div class="user">
      <a :href="$alias.user(post.from_user_zone)" target="_blank">
        <v-img class="avatar" :src="post.from_user_avatar" :width="80" :height="80"></v-img>
      </a>
      <a
        :href="$alias.user(post.from_user_zone)"
        class="nickname oneline"
        target="_blank"
        v-text="post.from_user_name"
      ></a>
    </div>
    <div class="content">
      <div class="main">
        <div
          class="image-package"
          v-for="(img, idx) in post.images"
          :key="idx"
          @click="$previewImages(post.images, idx)"
        >
          <v-img
            class="image"
            :src="img.url"
            width="350"
            mode="2"
            :aspect="$computeImageAspect(img)"
          ></v-img>
        </div>
        <div class="text-package" v-html="post.content"></div>
      </div>
      <div class="footer">
        <div class="info-bar">
          <button class="like-btn" @click="toggleLike">
            {{ post.liked ? '已赞' : '赞' }}
            <span v-if="post.like_count">({{ post.like_count }})</span>
          </button>
          <button class="delete-btn" v-if="canDelete" @click="deletePost">删除</button>
          <span class="floor-count">{{ post.floor_count }}楼</span>
          <v-time v-model="post.created_at"></v-time>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'post-comment-item',
    props: {
      post: {
        required: true,
        type: Object
      },
      masterId: {
        required: true,
        type: Number
      }
    },
    computed: {
      currentUserId () {
        return this.$store.state.login
          ? this.$store.state.user.id
          : 0
      },
      isMine () {
        return this.currentUserId === this.post['from_user_id']
      },
      canDelete () {
        return this.isMine || this.currentUserId === this.masterId
      }
    },
    data () {
      return {
        deleting: false,
        liking: false
      }
    },
    methods: {
      async toggleLike () {
        if (this.liking) {
          return
        }
        this.liking = true
        try {
          await this.$store.dispatch('comment/toggleLikeMainComment', {
            ctx: this,
            type: 'post',
            id: this.post.id
          })
        } catch (e) {
        } finally {
          this.liking = false
        }
      },
      deletePost () {
        if (this.deleting) {
          return
        }
        this.deleting = true
        this.$confirm('删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('comment/deleteMainComment', {
            type: 'post',
            ctx: this,
            id: this.post.id
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
