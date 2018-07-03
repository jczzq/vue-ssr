<style lang="scss" scoped="">

</style>

<template>
  <li class="sub-comment-item">
    {{ item.content }}
  </li>
</template>

<script>
  export default {
    name: 'v-sub-comment-item',
    props: {
      item: {
        required: true,
        type: Object
      },
      parentId: {
        required: true,
        type: Number
      }
    },
    watch: {

    },
    computed: {

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
