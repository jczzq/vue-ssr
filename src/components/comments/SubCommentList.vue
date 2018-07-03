<style lang="scss">
  .sub-comment-list-wrap {

  }
</style>

<template>
  <div class="sub-comment-list-wrap">
    <slot name="header"></slot>
    <ul>
      <li
        v-for="item in comments"
        :key="item.id"
        :parent-id="parentId"
        :item="item"
        is="sub-comment-item"
      ></li>
    </ul>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  import SubCommentItem from './SubCommentItem.vue'

  export default {
    name: 'v-sub-comment-list',
    props: {
      args: {
        required: true,
        type: Object
      },
      parentId: {
        required: true,
        type: Number
      }
    },
    components: {
      SubCommentItem
    },
    watch: {

    },
    computed: {
      comments () {
        return this.args.list
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
