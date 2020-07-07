<template>
  <div class="shop-guide">
    SSR
    <div class="topic_list">
      <div
        class="topic_item"
        v-for="item in topicList"
        :key="item.id"
        layout="row"
        layout-align="start start"
      >
        <div flex="none" class="user_box" v-if="item.author">
          <p class="fs__large fw__b" v-text="item.author.loginname"></p>
          <img class="avatar" :src="item.author.avatar_url" alt="" />
          <p><router-link :to="`/topic/${item.id}`">去文章详情</router-link></p>
        </div>
        <div flex="auto" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'shop-guide',
  components: {},
  async asyncData({ store, ctx }) {
    await store.dispatch('topic/LOAD_LIST', {
      param: {},
      ctx
    });
  },
  computed: {
    ...mapState('topic', {
      topicList: 'list',
      loading: 'loading'
    })
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.avatar {
  width: 6rem;
  height: 6rem;
}

.topic_list {
  margin: 0 auto;
  width: 64rem;
  max-width: 100vw;
  overflow-x: hidden;
}
.topic_item {
  padding: 1.6rem;
  .user_box {
    width: 6rem;
  }
}
.markdown-text {
  img {
    width: 100%;
  }
}
</style>
