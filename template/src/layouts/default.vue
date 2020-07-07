<template>
  <div class="LayoutDefault">
    <TitleBar />
    <router-view class="main_view"></router-view>
  </div>
</template>

<script>
import TitleBar from '../components/TitleBar';
export default {
  name: 'LayoutDefault',
  components: { TitleBar }
};
</script>

<style lang="scss">
body {
  overflow-y: auto;
}
.main_view {
  padding-top: 5rem;
}
</style>
