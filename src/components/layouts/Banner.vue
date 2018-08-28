<style lang="scss" scoped>
#banner {
    width: 100%;
    height: $banner-hgt;
    margin-bottom: 35px;
    background-size: 100%;
}
</style>

<template>
    <div id="banner"
         class="bg"
         :style="{ 'backgroundImage': `url(${bg})` }"></div>
</template>

<script>
export default {
    name: 'v-banner',
    computed: {
        bg() {
            return this.$resize(this.$store.state.banner, { width: 1920, mode: 0 });
        }
    }
};
</script>
