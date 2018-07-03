<style lang="scss">
  $header-height: 46px;
  $search-height: 32px;
  $avatar-height: 36px;

  #header {
    left: 0;
    top: 0;
    width: 100%;
    height: $header-height;
    z-index: 10;

    &.scroll-show {
      position: fixed;
    }

    &.scroll-hide {
      position: absolute;
    }

    &.mask {
      background-color: transparent;

      .nav-link {
        padding: 5px 20px;
        border-radius: 10px;
        margin: 0 5px;
        font-size: 15px;
        transition: .4s background-color, .4s color;
        color: $color-white;
        height: 26px;
        line-height: 16px;
        margin-top: 10px;

        &:hover {
          background-color: $color-white;
          color: $color-blue-normal;
          transition-duration: 0s;
        }
      }

      .background {
        .shim {
          width: 100%;
          height: 100px;
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          background-image: linear-gradient(to top,rgba(0, 0, 0, 0),rgba(0, 0, 0, .3));
        }
      }

      &.white.scroll-show {
        background-color: rgba(#000, .4);

        .shim {
          display: none;
        }
      }
    }

    &.blur {

      .nav-link {
        padding: 0 25px;
        font-size: 15px;
        height: $header-height;
        line-height: $header-height;

        &:hover {
          background-color: rgba(255, 255, 255, 0.24);
        }
      }

      .background {
        overflow: hidden;

        .shim {
          position: absolute;
          width: 125%;
          height: $banner-hgt * 1.25;
          top: -$banner-hgt * 0.125;
          left: -12.5%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 80%;
          z-index: -1;
          @include filter-blur();
        }
      }

      &.black {
        box-shadow: rgba(0,0,0,0.1) 0 1px 2px;
        .text {
          background-color: rgba(0, 0, 0, 0.2);

          .nav-link {
            color: $color-white;
          }
        }
      }

      &.white {
        box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;
        .text {
          background-color: rgba(255, 255, 255, 0.4);

          .nav-link {
            color: $color-link;
          }
        }

        &.scroll-hide {
          background-color: $color-white;
        }

        &.scroll-show {
          background-color: rgba(#fff, .6);

          .sign-in {
            background-color: rgba(#fff, .6);
            color: #333;
            border: 1px solid #ccc;
          }

          .shim {
            opacity: 0.2;
          }
        }
      }
    }

    .text {
      width: 100%;
      height: $header-height;
      padding-left: 20px;
      padding-right: 20px;

      .header-left,
      .header-right {
        display: flex;
        flex-direction: row;
        align-content: center;
      }

      .header-left {
        height: $header-height;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
      }

      .header-right {
        height: $header-height;
        float: right;
        position: relative;

        .search-box {
          height: $search-height;
          border-radius: $search-height / 2;
          background-color: rgba(0, 0, 0, 0.2);
          margin-top: ($header-height - $search-height) / 2;
          margin-right: 30px;
          float: left;

          &:hover {
            background-color: rgba(0, 0, 0, 0.4);
          }

          $transition: .2s;
          .search-ctx {
            width: 135px;
            background-color: transparent;
            transition: $transition;
            font-size: 12px;
            padding: 4px 10px 4px 15px;
            line-height: 24px;
            border-radius: 16px 0 0 16px;
            color: $color-white;
            border: 1px solid transparent;
            border-right: 0;
            @include input-placeholder();

            &:focus {
              width: 235px;
              background-color: $color-white;
              color: #222;
              @include input-placeholder(#222);

              &+.search-btn {
                background-color: $color-white;
                color: $color-text-deep;

                &:hover {
                  color: $color-blue-normal;
                }
              }

              &~.search-history {
                transition-delay: $transition;
              }
            }
          }

          @media (max-width: 768px) {
            .search-ctx {
              width: 85px;

              &:focus {
                width: 155px;
              }
            }
          }

          .search-btn {
            width: 32px;
            height: 32px;
            border-radius: 0 16px 16px 0;
            background-color: transparent;
            transition: $transition;
            color: $color-white;
            font-family: 'iconfont' !important;
            font-size: 18px;
            border: 1px solid transparent;
            border-left: 0;
            line-height: 29px;

            &:before {
              content: '\e761';
            }
          }
        }

        .el-badge {
          .el-badge__content {
            right: 25px;
            top: 10px;
          }
        }

        .sign-btn {
          border-radius: 2px;
          width: 52px;
          height: 34px;
          line-height: 32px;
          color: $color-white;
          text-align: center;
          font-size: 14px;
          margin-top: 6px;
        }

        .sign-in {
          border: 1px solid rgba(255,255,255,.8);

          &:hover {
            background: $color-white;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
            color: #000;
            border: 1px solid #ccc;
          }
        }

        .sign-up {
          margin-left: 7px;
          border: 0;
          background-color: rgba($color-blue-normal, .8);

          &:hover {
            background-color: $color-blue-normal;
          }
        }

        .user-section {
          height: $header-height;
          margin-left: 25px;
          margin-right: 25px;
          vertical-align: middle;

          .avatar {
            margin-top: ($header-height - $avatar-height) / 2;
            @include avatar($avatar-height);
          }
        }
      }

      .nav-link {
        display: block;
      }
    }

    .background {
      z-index: -1;
    }
  }
</style>

<template>
  <header id="header" :class="[theme, 'white', scrollFlag ? 'scroll-show' : 'scroll-hide']">
    <div class="text">
      <nav class="container header-left">
        <router-link class="nav-link" :to="$alias.index">主站</router-link>
        <el-dropdown>
          <router-link class="nav-link el-dropdown-link" :to="$alias.bangumiNews">番剧</router-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link class="nav-link" :to="$alias.bangumiNews">新番放送</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="nav-link" :to="$alias.bangumiTimeline">时间轴</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="nav-link" :to="$alias.bangumiTag()">分类索引</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <router-link class="nav-link el-dropdown-link" :to="$alias.postTrending('active')">帖子</router-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link class="nav-link" :to="$alias.postTrending('news')">最新</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="nav-link" :to="$alias.postTrending('active')">动态</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="nav-link" :to="$alias.postTrending('hot')">最热</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <router-link class="nav-link" :to="$alias.roleTrending">偶像</router-link>
        <el-dropdown>
          <router-link class="nav-link el-dropdown-link" :to="$alias.imageTrending('new')">图片</router-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link class="nav-link" :to="$alias.imageTrending('new')">最新上传</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="nav-link" :to="$alias.imageTrending('hot')">最多喜欢</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <router-link class="nav-link" to="/about/hello">功能简介</router-link>
      </nav>
      <nav class="header-right">
        <v-search placeholder="搜索" :history="true"></v-search>
        <template v-if="isLogin">
          <el-popover
            ref="popover"
            width="320"
            placement="bottom-end"
            trigger="click">
            <v-notifications v-if="showNotification"></v-notifications>
            <span v-else></span>
          </el-popover>
          <el-badge :value="notificationsCount" :max="99" class="item">
            <a class="nav-link" @click="showNotification = true" v-popover:popover>消息</a>
          </el-badge>
          <el-dropdown class="user-section" placement="bottom">
            <a class="el-dropdown-link" :href="$alias.user(user.zone)">
              <img class="avatar" :src="$resize(user.avatar, { width: 72, height: 72 })" :alt="user.nickname">
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <button @click="signOut">退出</button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <button class="sign-btn sign-in" @click="signIn">登录</button>
          <button class="sign-btn sign-up" @click="signUp">注册</button>
        </template>
      </nav>
    </div>
    <div class="background abs">
      <div class="shim" :style="computedBg"></div>
    </div>
  </header>
</template>

<script>
  import UserApi from '~/api/userApi'
  import vSearch from '~/components/layouts/Search'
  import vNotifications from '~/components/layouts/Notifications'

  export default {
    name: 'v-header',
    components: {
      vSearch, vNotifications
    },
    data () {
      return {
        scrollFlag: false,
        showNotification: false
      }
    },
    computed: {
      theme () {
        return [
          'homepage',
          'bangumi-show',
          'user-show',
          'image-album'
        ].indexOf(this.$route.name) !== -1
          ? 'mask'
          : 'blur'
      },
      computedBg () {
        return this.theme === 'blur' ? {
          backgroundImage: `url(${this.$resize(this.$store.state.banner, { width: 1920, mode: 0 })})`
        } : {}
      },
      isLogin () {
        return this.$store.state.login
      },
      user () {
        return this.$store.state.user
      },
      notificationsCount () {
        const result = this.user.notification - this.$store.state.users.notifications.checked
        return result < 0 ? 0 : result
      }
    },
    methods: {
      signIn () {
        this.$channel.$emit('sign-in')
      },
      signUp () {
        this.$channel.$emit('sign-up')
      },
      signOut () {
        this.$cookie.remove('JWT-TOKEN')
        const api = new UserApi(this)
        api.logout()
        window.location.reload()
      }
    },
    mounted () {
      document.addEventListener('scroll', () => {
        this.scrollFlag = window.scrollY > 200
      })
    }
  }
</script>
