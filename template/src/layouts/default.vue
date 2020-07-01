<style lang="scss">
#layout-default {
    min-height: 100%;
    display: flex;
    flex-direction: column;

    > .main-view {
        flex-grow: 1;
    }
}
</style>

<template>
    <div id="layout-default">
        <router-view class="main-view"></router-view>
    </div>
</template>

<script>
export default {
  components: {}
};
</script>
