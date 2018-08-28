<template>
    <div id="image-trending">
        <v-banner></v-banner>
        <div class="container">
            <div class="col-aside"></div>
            <div class="col-main">
                <div class="breadcrumb-links">
                    <a :class="{ 'router-link-active': $route.params.sort === 'new' }"
                       :href="$alias.imageTrending('new')">最新</a>
                    <a :class="{ 'router-link-active': $route.params.sort === 'hot' }"
                       :href="$alias.imageTrending('hot')">最热</a>
                </div>
                <image-waterfall :loading="loading"
                                 @fetch="getImages"></image-waterfall>
            </div>
        </div>
    </div>
</template>

<script>
import ImageWaterfall from '~/components/lists/ImageWaterfall';

export default {
    name: 'imageTrending',
    async asyncData({ store, route, ctx }) {
        await store.dispatch('image/getTrendingImages', {
            sort: route.params.sort,
            ctx,
            force: true
        });
    },
    components: {
        ImageWaterfall
    },
    head: {
        title: '相册'
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        images() {
            return this.$store.state.image.waterfall;
        }
    },
    methods: {
        async getImages() {
            if (this.loading) {
                return;
            }
            this.loading = true;
            try {
                await this.$store.dispatch('image/getTrendingImages', {
                    sort: this.$route.params.sort,
                    ctx: this
                });
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
