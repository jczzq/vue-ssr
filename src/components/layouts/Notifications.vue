<style lang="scss">
  #header-notification-box {
    width: 100%;
    height: 370px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .header {
      height: 20px;
      background-color: transparent;
      flex-shrink: 0;
    }

    .main {
      overflow-y: auto;
      flex-grow: 1;
    }

    li {
      font-size: 13px;
      width: 100%;
      min-height: 50px;
      line-height: 20px;
      padding: 0 20px;
      background-color: $color-gray-light;

      div {
        padding: 15px 0;
      }

      &:not(:first-child) {
        div {
          border-top: 1px solid #eee;
        }
      }

      &.checked {
        background-color: transparent;
      }
    }

    a {
      color: $color-blue-normal;
      font-size: 13px;
    }

    .footer {
      height: 30px;
      background-color: #fff;
      flex-shrink: 0;
      border-top: 1px solid #ddd;
      text-align: right;
      padding-right: 20px;

      button {
        font-size: 12px;
        line-height: 30px;
        color: $color-text-normal;
      }
    }
  }
</style>

<template>
  <div id="header-notification-box">
    <div class="header"></div>
    <div class="main">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="notFetch"
        infinite-scroll-distance="10"
      >
        <li v-for="item in list" :key="item.id" :class="{ 'checked': item.checked }" @click="readMsg(item.id)">
          <div>
            <!-- 我的主题帖被回复了 -->
            <template v-if="item.type === 1">
              <a target="_blank" :href="$alias.user(item.user.zone)" v-text="item.user.nickname"></a>
              回复了你的帖子
              <a target="_blank" :href="item.data.link" v-text="item.data.title"></a>
            </template>
            <!-- 我的楼层贴被评论 / 回复了 -->
            <template v-else-if="item.type === 2">
              <a target="_blank" :href="$alias.user(item.user.zone)" v-text="item.user.nickname"></a>
              评论了你在帖子
              <a target="_blank" :href="item.data.link" v-text="item.data.title"></a>
              下的内容
            </template>
            <template v-else-if="item.type === 3">
              <a target="_blank" :href="$alias.user(item.user.zone)" v-text="item.user.nickname"></a>
              喜欢了你的帖子
              <a target="_blank" :href="item.data.link" v-text="item.data.title"></a>
            </template>
            <template v-else-if="item.type === 4">
              <a target="_blank" :href="$alias.user(item.user.zone)" v-text="item.user.nickname"></a>
              赞了你在帖子
              <a target="_blank" :href="item.data.link" v-text="item.data.title"></a>
              下的回复
            </template>
            <template v-else-if="item.type === 5">
              <a target="_blank" :href="$alias.user(item.user.zone)" v-text="item.user.nickname"></a>
              喜欢了你上传的图片
            </template>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <button @click="readAll">全部设为已读</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderNotifications',
    computed: {
      list () {
        return this.$store.state.users.notifications.data
      },
      notFetch () {
        return this.loading || this.$store.state.users.notifications.noMore
      },
      notificationsCount () {
        const result = this.$store.state.user.notification - this.$store.state.users.notifications.checked
        return result < 0 ? 0 : result
      }
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      readMsg (id) {
        this.$store.dispatch('users/readMessage', {
          id,
          ctx: this
        })
      },
      async loadMore () {
        if (this.loading) {
          return
        }
        this.loading = true

        try {
          await this.$store.dispatch('users/getNotifications', {
            ctx: this,
            init: false
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      readAll () {
        if (!this.notificationsCount) {
          return
        }
        this.$store.dispatch('users/readAllMessage', this)
      }
    }
  }
</script>
