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
          <p class="fs__large fw__b">{{ item.author.loginname }}</p>
          <img class="avatar" :src="item.author.avatar_url" alt="" />
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
body {
  overflow-y: auto;
}
.avatar {
  width: 10rem;
  height: 10rem;
}

.topic_list {
  margin: 0 auto;
  padding-top: 5rem;
  width: 64rem;
  max-width: 64rem;
  overflow-x: hidden;
}
.topic_item {
  padding: 1.6rem;
  .user_box {
    width: 12rem;
  }
}
.markdown-text {
  img {
    width: 100%;
  }
}
</style>
