<template>
  <div class="LayoutDefault">
    <TitleBar />
    <router-view></router-view>
  </div>
</template>

<script>
import TitleBar from '../components/TitleBar';
export default {
  name: 'LayoutDefault',
  components: { TitleBar }
};
</script>
