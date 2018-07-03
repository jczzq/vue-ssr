<style lang="scss">
  #homepage {
    width: 100%;
    height: 100%;
    z-index: 0;

    .banner {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: $color-black;
      z-index: -1;
      opacity: 0;
      transition: opacity 1s ease-in-out;

      &.show {
        opacity: 1;
      }
    }

    .index-panel {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .slogan {
        width: 435px;
        height: 65px;
        margin: 0 auto 25px;

        &.invert {
          filter: invert(1);
        }
      }

      $search-size: 40px;
      .search-box {
        height: $search-size;
        margin-bottom: 100px;

        &:hover {
          .search-ctx {
            border: 1px solid $color-white;
            background: rgba(0, 0, 0, 0.3);
          }

          .search-btn {
            color: $color-white;
          }
        }

        .search-ctx {
          width: 550px;
          height: 100%;
          padding: 0 50px 0 10px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          background: rgba(0, 0, 0, 0.15);
          color: #fff;
          line-height: $search-size;
          font-size: 14px;
          @include input-placeholder();
        }

        .search-btn {
          position: absolute;
          right: 0;
          top: 0;
          width: $search-size;
          height: $search-size;
          color: rgba(255, 255, 255, 0.8);
          font-size: 26px;
          font-family: 'iconfont' !important;

          &:before {
            content: '\e761';
          }
        }
      }
    }

    .banner-card {
      display: block;
      position: fixed;
      width: 200px;
      height: 50px;
      bottom: 38px;
      right: 8px;
      border-radius: 4px;
      background-color: rgba(#000, .4);

      .avatar {
        display: block;
        float: left;
        margin: 5px 8px 0 10px;
        @include avatar(40px);
      }

      .content {
        overflow: hidden;
        margin-top: 7px;

        p {
          height: 18px;
          width: 132px;
          color: #fff;
          font-size: 12px;
          line-height: 21px;
        }
      }
    }
  }
</style>

<template>
  <div id="homepage">
    <div class="banner bg" :class="{'show' : toggle}" :style="{ backgroundImage: banner1 ? `url(${$resize(banner1.url, options)})` : '' }"></div>
    <div class="banner bg" :class="{'show' : !toggle}" :style="{ backgroundImage: banner2 ? `url(${$resize(banner2.url, options)})` : '' }"></div>
    <div class="index-panel">
      <div class="slogan bg" :style="{ backgroundImage: `url(${$resize('https://image.calibur.tv/owner/slogan.png')})` }" :class="{ 'invert' : curBanner.gray > 165 }"></div>
      <v-search :placeholder="'搜索二次元的一切'" :auto="true" :suggest="true"></v-search>
    </div>
    <div class="banner-card">
      <router-link :to="$alias.user(curBanner.user_zone)" v-if="curBanner.user_id">
        <img class="avatar" :src="$resize(curBanner.user_avatar, { width: 80 })">
      </router-link>
      <img class="avatar" :src="$resize('https://image.calibur.tv/default/user-avatar', { width: 80 })" v-else>
      <div class="content">
        <p class="oneline">
          作者：
          <router-link :to="$alias.user(curBanner.user_zone)" v-if="curBanner.user_id" v-text="curBanner.user_nickname"></router-link>
          <span v-else>{{ curBanner.bangumi_id ? '原画' : '未知' }}</span>
        </p>
        <p class="oneline">
          番剧：
          <router-link :to="$alias.bangumi(curBanner.bangumi_id)" v-if="curBanner.bangumi_id" v-text="curBanner.bangumi_name"></router-link>
          <span v-else>未知</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import vSearch from '~/components/layouts/Search'

  export default {
    name: 'homepage',
    components: {
      vSearch
    },
    async asyncData ({ store, ctx }) {
      await store.dispatch('homepage/getBanners', ctx)
    },
    computed: {
      banners () {
        return this.$store.state.homepage.banners
      },
      curBanner () {
        return this.toggle
          ? this.banner1
          : this.banner2
      }
    },
    data () {
      return {
        banner1: null,
        banner2: null,
        timer: null,
        toggle: true,
        index: 0,
        options: {
          width: 1920,
          height: 0,
          mode: 0
        }
      }
    },
    created () {
      this.banner1 = this.banners[0]
    },
    mounted () {
      this.loopBanner()
    },
    methods: {
      loopBanner () {
        this.timer = setInterval(() => {
          this.index = 1 + this.index === this.banners.length ? 0 : this.index + 1
          const data = this.banners[this.index]
          this.toggle
            ? this.banner2 = data
            : this.banner1 = data
          setTimeout(() => {
            this.toggle = !this.toggle
          }, 7500)
        }, 15000)
      }
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
</script>
