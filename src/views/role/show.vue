<style lang="scss">
  #role-show {
    .subtitle {
      margin-top: 35px;
      margin-bottom: 20px;

      button {
        vertical-align: middle;
        padding: 5px 15px;
        margin-left: 10px;
      }
    }

    .role-fans-modal {
      .v-modal {
        min-height: 600px;

        li {
          float: none;

          .lover-user {
            padding: 10px 0;
            position: relative;
            border-bottom: 1px solid #f0f0f0;
            display: block;

            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: 1px solid $color-gray-normal;
              margin-right: 10px;
              vertical-align: middle;
            }

            .score {
              float: right;
              font-size: 13px;
              color: $color-text-light;
              margin-top: 13px;
            }
          }
        }
      }
    }

    .col-main {
      .intro {
        .avatar-wrap {
          float: left;
          margin-right: 25px;
          text-align: center;

          .avatar {
            width: 150px;
            height: 150px;
            display: block;
          }

          button {
            margin-top: 15px;
          }
        }

        .info {
          overflow: hidden;

          .name {
            font-size: 42px;
            margin-bottom: 10px;
          }

          .summary {
            line-height: 24px;
            font-size: 14px;
            margin-bottom: 10px;
          }

          .alias {
            line-height: 24px;
            font-size: 14px;
            margin-bottom: 10px;

            strong {
              float: left;
            }

            li {
              float: left;
              margin-right: 10px;
              text-decoration: underline;
            }
          }

          .coin {
            line-height: 24px;
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
      }

      .lover {
        .user {

          .avatar {
            display: inline-block;
            vertical-align: middle;
            border: 1px solid #F0F0F0;
            overflow: hidden;
            @include avatar(40px);
            margin-right: 10px;
          }
        }
      }
    }

    .col-aside {
      .fans {
        .follower {
          margin-right: -10px;
          float: left;

          a {
            overflow: hidden;
            border-radius: 50%;
            display: inline-block;
            width: 40px;
            height: 40px;
          }

          img {
            width: 100%;
            height: 100%;
            display: block;
            border: 3px solid #fff;
            border-radius: 50%;
          }
        }

        .more-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: $color-gray-normal;
          color: #fff;
          border: 3px solid #fff;

          &:hover {
            background-color: $color-gray-deep;
          }
        }
      }
    }
  }
</style>

<template>
  <div id="role-show">
    <v-banner></v-banner>
    <div class="container">
      <aside class="col-aside">
        <div class="bangumi">
          <p class="subtitle">所属番剧</p>
          <v-bangumi-panel
            class="bangumi-panel"
            :id="bangumi.id"
            :name="bangumi.name"
            :avatar="bangumi.avatar"
            :summary="bangumi.summary"
            :followed="bangumi.followed"
            @follow="handleFollowBangumiAction"
          ></v-bangumi-panel>
        </div>
        <div class="fans">
          <p class="subtitle">应援团{{ role.fans_count ? `（${role.fans_count}）` : '' }}</p>
          <template v-if="fans.data.length">
            <ul>
              <li class="follower" v-for="user in displayFans" :key="user.zone">
                <el-tooltip class="item" effect="dark" :content="user.nickname" placement="top">
                  <a :href="$alias.user(user.zone)" target="_blank">
                    <v-img
                      :src="$resize(user.avatar, { width: 64, height: 64 })"
                      :alt="user.zone"
                    ></v-img>
                  </a>
                </el-tooltip>
              </li>
              <button
                v-if="role.fans_count > 6"
                @click="openFansModal('new')"
                class="more-btn el-icon-more"
              ></button>
            </ul>
          </template>
          <template v-else>
            <span>TA 还没有真正的粉丝...</span>
          </template>
        </div>
      </aside>
      <div class="col-main">
        <div class="intro clearfix">
          <p class="subtitle">角色信息</p>
          <div class="avatar-wrap">
            <img class="avatar" :src="$resize(role.avatar, { width: 200 })">
            <el-button
              @click="handleStarRole"
              type="warning"
              class="star"
              size="mini"
              round
              plain
            >为TA应援</el-button>
          </div>
          <div class="info">
            <h1 class="name" v-text="role.name"></h1>
            <p class="summary">
              <strong>简介：</strong>{{ role.intro }}
            </p>
            <ul class="alias">
              <strong>别名：</strong>
              <li
                v-for="(name, index) in computeRoleAlias"
                v-text="name"
                :key="index"
              ></li>
            </ul>
            <p class="coin" v-if="role.star_count">
              <strong>粉丝：</strong>共有 {{ role.fans_count }} 个粉丝，收获了 {{ role.star_count }} 个金币
            </p>
          </div>
        </div>
        <div class="lover" v-if="role.lover">
          <p class="subtitle">
            守护者
            <el-button
              size="mini"
              round
              @click="openFansModal('hot')"
            >排行榜</el-button>
          </p>
          <a class="user" target="_blank" :href="$alias.user(role.lover.zone)">
            <div class="avatar">
              <img :src="$resize(role.lover.avatar, { width: 80 })">
            </div>
            <span v-text="role.lover.nickname"></span>
          </a>
        </div>
        <div class="images">
          <p class="subtitle">相册</p>
          <image-waterfall
            :loading="loadingRoleImageFetch"
            @fetch="getRoleImages(false)"
          >
            <el-button @click="openUploadModal" type="primary" round>
              上传 {{ role.name }} 的第一张图片
            </el-button>
          </image-waterfall>
        </div>
      </div>
      <v-modal
        v-model="toggleFansListModal"
        :footer="false"
        :header-text="`${role.name} · 应援团`"
        :scroll="fetchRoleFans"
        :loading="loadingRoleFans"
        :no-more="noMoreFans"
        class="role-fans-modal"
      >
        <li
          v-for="item in fansModalData"
          :key="item.id"
        >
          <a class="lover-user" target="_blank" :href="$alias.user(item.zone)">
            <img :src="$resize(item.avatar, { width: 80 })">
            <span v-text="item.nickname"></span>
            <v-time class="score" v-if="focusRoleSort === 'new'" v-model="item.score"></v-time>
            <span class="score" v-else>{{ item.score }}个金币</span>
          </a>
        </li>
      </v-modal>
    </div>
  </div>
</template>

<script>
  import ImageWaterfall from '~/components/lists/ImageWaterfall'

  export default {
    name: 'role-show',
    async asyncData ({ store, route, ctx }) {
      const id = route.params.id
      await Promise.all([
        store.dispatch('cartoonRole/getRoleInfo', { ctx, id }),
        store.dispatch('image/getRoleImages', { ctx, id }),
        store.dispatch('cartoonRole/getFansList', {
          ctx,
          bangumiId: 0,
          roleId: id,
          sort: 'new',
          reset: false
        })
      ])
    },
    head () {
      return {
        title: `${this.role.name} - 角色`,
        meta: [
          { hid: 'description', name: 'description', content: this.role.intro },
          { hid: 'keywords', name: 'keywords', content: `calibur,角色,天下漫友是一家,${this.role.alias}` }
        ]
      }
    },
    components: {
      ImageWaterfall
    },
    computed: {
      id () {
        return this.$route.params.id
      },
      info () {
        return this.$store.state.cartoonRole.info
      },
      role () {
        return this.info.data
      },
      bangumi () {
        return this.info.bangumi
      },
      images () {
        return this.info.images
      },
      fans () {
        return this.$store.state.cartoonRole.fans.new
      },
      computeRoleAlias () {
        return this.role.alias.split(',')
      },
      displayFans () {
        return this.fans.data.slice(0, 6)
      },
      fansModalData () {
        return this.focusRoleSort === 'new'
          ? this.fans.data
          : this.$store.state.cartoonRole.fans.hot.data
      },
      noMoreFans () {
        return this.$store.state.cartoonRole.fans[this.focusRoleSort].noMore
      }
    },
    data () {
      return {
        toggleFansListModal: false,
        loadingRoleImageFetch: false,
        loadingRoleFans: false,
        focusRoleSort: 'new'
      }
    },
    methods: {
      handleFollowBangumiAction (result) {
        this.$store.commit('cartoonRole/FOLLOW_ROLE_BANGUMI', { result })
      },
      async getRoleImages (force) {
        if (this.loadingRoleImageFetch) {
          return
        }
        this.loadingRoleImageFetch = true
        try {
          await this.$store.dispatch('image/getRoleImages', {
            ctx: this,
            id: this.id,
            force
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingRoleImageFetch = false
        }
      },
      async handleStarRole () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (!this.$store.state.user.coin) {
          this.$toast.error('金币不足')
          return
        }
        try {
          await this.$store.dispatch('cartoonRole/star', {
            bangumiId: this.bangumi.id,
            roleId: this.id,
            ctx: this,
            hasStar: this.role.hasStar
          })
          this.$store.commit('USE_COIN')
          this.$toast.success(`+${this.role.hasStar}s`)
        } catch (e) {
          this.$toast.error(e)
        }
      },
      async fetchRoleFans (init = false) {
        if (init && this.fansModalData.length > 10) {
          return
        }
        if (this.loadingRoleFans) {
          return
        }
        this.loadingRoleFans = true
        try {
          await this.$store.dispatch('cartoonRole/getFansList', {
            ctx: this,
            bangumiId: this.bangumi.id,
            roleId: this.id,
            sort: this.focusRoleSort
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingRoleFans = false
        }
      },
      openFansModal (sort) {
        this.focusRoleSort = sort
        this.toggleFansListModal = true
        this.fetchRoleFans(true)
      },
      openUploadModal () {
        this.$channel.$emit('open-upload-image-modal')
      }
    }
  }
</script>
