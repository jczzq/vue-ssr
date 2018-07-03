<style lang="scss">
  #comment-list {

  }
</style>

<template>
  <div id="comment-list">
    <div
      v-for="item in list"
      :key="item.id"
    >
      <slot name="comment-item">
        <comment-item :comment="item"></comment-item>
      </slot>
      <sub-comment-list
        :args="item.comments"
        :parent-id="item.id"
      >
        <div slot="header">sub-comment header</div>
        <sub-comment-item></sub-comment-item>
        <div slot="footer">sub-comment footer</div>
      </sub-comment-list>
    </div>
  </div>
</template>

<script>
  import CommentItem from './CommentItem.vue'
  import SubCommentList from './SubCommentList.vue'
  import SubCommentItem from './SubCommentItem.vue'

  export default {
    name: 'v-comment-list',
    components: {
      CommentItem,
      SubCommentList,
      SubCommentItem
    },
    props: {

    },
    computed: {
      list () {
        return this.$store.state.comment.list
      }
    },
    data () {
      return {

      }
    },
    created () {

    },
    methods: {

    },
    mounted () {

    }
  }
</script>
