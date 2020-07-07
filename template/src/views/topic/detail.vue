<template>
  <div class="TopicDetail">
    <div v-html="topicDetail.content"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'TopicDetail',
  props: {
    id: String
  },
  async asyncData({ store, route, ctx }) {
    await store.dispatch('topic/LOAD_DETAIL', {
      param: {
        id: route.params.id
      },
      ctx
    });
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('topic', {
      topicDetail: 'detail'
    })
  },
  mounted() {},
  watch: {},
  methods: {},
  filters: {}
};
</script>

<style>
.TopicDetail {
  box-sizing: border-box;
}
</style>
