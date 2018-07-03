<style lang="scss">
  #trending-role {
    .col-main {
      margin-left: 30px;

      li {
        position: relative;
        margin-top: 15px;
        float: none;

        &:not(:last-child) {
          border-bottom: 1px solid #F0F0F0;
        }

        .top {
          position: relative;
          display: block;
          float: right;

          &:before {
            content: attr(data-index);
            line-height: 48px;
          }
        }

        &:first-of-type {
          .top:before {
            color: goldenrod;
            font-size: 28px;
            line-height: 44px;
          }
        }

        &:nth-of-type(2) {
          .top:before {
            color: indianred;
            font-size: 22px;
            line-height: 44px;
          }
        }

        &:nth-of-type(3) {
          .top:before {
            color: silver;
            font-size: 16px;
            line-height: 44px;
          }
        }

        .avatar {
          width: 100px;
          height: 100px;
          display: block;
          float: left;
          overflow: hidden;
          border-radius: 5px;
          margin-right: 10px;
          border: 1px solid $color-gray-normal;

          img {
            width: 100%;
            height: auto;
          }
        }

        .summary {
          overflow: hidden;
          height: 100px;

          .role {
            display: block;
            font-size: 14px;
            line-height: 20px;
            height: 60px;
            overflow: hidden;

            .name {
              font-weight: bold;
            }

            .intro {
              color: #000;
            }
          }

          .lover {
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
            font-size: 13px;
            color: $color-text-normal;
            margin-top: 20px;

            img {
              width: 20px;
              height: 20px;
              border-radius: 15px;
              vertical-align: middle;
              border: 1px solid $color-gray-normal;
              margin-left: 10px;
            }
          }
        }

        .footer {
          height: 44px;
          line-height: 44px;

          .bangumi {
            color: #999;
            font-size: 12px;
            overflow: hidden;
            margin-right: 8px;
          }

          .stats {
            text-align: right;
            color: #666;
            float: right;

            span {
              margin-left: 10px;
              font-size: 12px;
              margin-right: 2px;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div id="trending-role">
    <v-banner></v-banner>
    <div class="container">
      <div class="col-aside"></div>
      <div class="col-main">
        <h2 class="subtitle">偶像排行榜</h2>
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="notFetch"
          infinite-scroll-distance="50"
        >
          <li
            v-for="(item, index) in list"
            :key="item.id"
          >
            <div class="clearfix">
              <a target="_blank" :href="$alias.cartoonRole(item.id)" class="avatar">
                <v-img :src="item.avatar" width="90" height="90"></v-img>
              </a>
              <div class="summary">
                <a target="_blank" :href="$alias.cartoonRole(item.id)" class="role">
                  <span class="name" v-text="item.name"></span>
                  <span class="intro">：{{ item.intro }}</span>
                </a>
                <div class="lover" v-if="item.lover_id">
                  <span>守护者：</span>
                  <a class="fr" target="_blank" :href="$alias.user(item.lover_zone)">
                    <span v-text="item.lover_nickname"></span>
                    <v-img :src="item.lover_avatar" width="20" height="20"></v-img>
                  </a>
                </div>
                <div class="lover" v-else></div>
              </div>
              <div class="footer">
                <div class="stats">
                  <span>
                    粉丝:
                    {{ $utils.shortenNumber(item.fans_count) }}
                  </span>
                  <span>
                    金币:
                    {{ $utils.shortenNumber(item.star_count) }}
                  </span>
                  <span>排名:</span>
                  <span class="top" :data-index="item.fans_count ? index + 1 : '无'"></span>
                </div>
                <a class="bangumi" target="_blank" :href="$alias.bangumi(item.bangumi_id)" v-text="item.bangumi_name"></a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'trending-role',
    async asyncData ({ store }) {
      await store.dispatch('cartoonRole/getTrending')
    },
    head: {
      title: '角色排行榜'
    },
    computed: {
      list () {
        return this.$utils.orderBy(this.$store.state.cartoonRole.trending.data, 'star_count', 'desc')
      },
      notFetch () {
        return this.loading || this.$store.state.cartoonRole.trending.noMore
      }
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      async loadMore () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          await this.$store.dispatch('cartoonRole/getTrending')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>
