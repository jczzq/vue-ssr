<style lang="scss">
  .hr {
    position: relative;
    height: 31px;
    text-align: center;
    user-select: none;

    span {
      position: absolute;
      width: 100%;
      top: 15px;
      left: 0;
      height: 1px;
      background-color: #dae9f4;
      z-index: 0;
    }

    p {
      display: inline-block;
      margin: 0 auto;
      background-color: #fff;
      position: relative;
      z-index: 1;
      font-size: inherit;
      line-height: 31px;
      padding: 0 10px;
      color: #7f9eb2;
    }
  }
</style>

<template>
  <div class="hr">
    <span></span>
    <p v-text="text"></p>
  </div>
</template>

<script>
  export default {
    name: 'v-hr',
    props: {
      text: {
        required: true,
        type: String
      }
    }
  }
</script>
