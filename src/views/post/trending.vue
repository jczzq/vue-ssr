<style lang="scss">
  #post-trending {

    #load-post-btn {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>

<template>
  <div id="post-trending">
    <v-banner></v-banner>
    <div class="container">
      <div class="col-aside"></div>
      <div class="col-main">
        <div class="breadcrumb-links">
          <router-link :to="$alias.postTrending('news')">最新</router-link>
          <router-link :to="$alias.postTrending('active')">动态</router-link>
          <router-link :to="$alias.postTrending('hot')">最热</router-link>
        </div>
        <ul id="posts">
          <post-show-item
            v-for="item in post.list"
            :key="item.id"
            :item="item"
          ></post-show-item>
        </ul>
        <el-button
          :loading="post.loading"
          v-if="!post.noMore"
          id="load-post-btn"
          @click="loadMore"
          type="info"
          plain
        >{{ post.loading ? '加载中' : '加载更多' }}</el-button>
        <no-content v-if="post.nothing"></no-content>
      </div>
    </div>
  </div>
</template>

<script>
  import PostShowItem from '~/components/items/PostShow'
  import PostApi from '~/api/postApi'

  export default {
    name: 'PostNews',
    async asyncData ({ store, route, ctx }) {
      const sort = route.params.sort
      if (['news', 'active', 'hot'].indexOf(sort) === -1) {
        const error = new Error()
        error.code = 404
        throw error
      }
      await store.dispatch('trending/getTrending', {
        type: 'post',
        sort,
        api: new PostApi(ctx)
      })
    },
    components: {
      PostShowItem
    },
    computed: {
      sort () {
        return this.$route.params.sort
      },
      post () {
        return this.$store.state.trending[this.sort]
      }
    },
    methods: {
      async loadMore () {
        try {
          await this.$store.dispatch('trending/loadMore', {
            type: 'post',
            sort: this.sort,
            api: new PostApi(this)
          })
        } catch (e) {
          this.$toast.error(e)
        }
      }
    }
  }
</script>
