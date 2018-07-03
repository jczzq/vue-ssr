<style lang="scss">
  #bangumi-show {
    $banner-height: 400px;

    #banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      box-shadow: inset 0 0 15px 0 rgba(0,0,0,.5);
      z-index: 1;
      height: $banner-height;
      margin-bottom: 35px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .img {
        width: 110%;
        height: $banner-height;
        margin: -$banner-height / 2 -55%;
        position: absolute;
        top: 50%;
        left: 50%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -1;
        @include filter-blur();
      }

      .info {
        width: 60%;
        min-width: 600px;
        color: $color-white;

        .title, .summary {
          text-shadow: 0 1px 10px gray;
        }

        .title {
          text-align: center;
          font-size: 24px;
          font-weight: 700;
        }

        .summary {
          word-break: break-all;
          word-wrap: break-word;
          text-indent: 2em;
          font-size: 13px;
          line-height: 20px;
          margin: 40px 0 20px 0;
        }

        .console {
          text-align: center;

          .follow {
            padding: 10px 30px;
            height: 40px;
            font-size: 15px;
            border-radius: 40px;
            border: 1px solid;
            color: $color-white;

            &.is-followed {
              background-color: transparent;
              border-color: $color-white;
              text-shadow: 0 1px 10px gray;

              &:hover {
                background-color: rgba(#fff, .25);
              }
            }

            &.not-follow {
              background-color: $color-pink-deep;
              border-color: $color-pink-deep;

              &:hover {
                border-color: $color-pink-normal;
                background-color: $color-pink-normal;
              }
            }

            i {
              margin-right: 5px;
            }
          }
        }
      }

      .v-share {
        position: absolute;
        right: 40px;
        bottom: 10px;
      }
    }

    .el-tabs__nav-wrap {
      margin-top: -10px;

      &:after {
        background-color: transparent;
      }
    }

    $video-item-width: 255px;
    $video-item-margin: 15px;
    $video-item-height: 70px;
    #videos {
      li {
        margin: 0 $video-item-margin 15px 0;
        float: left;
      }

      a {
        display: block;
        position: relative;
      }

      figure {
        width: $video-item-width - $video-item-margin;
        height: $video-item-height;
        background-color: $color-gray-normal;
        cursor: pointer;
        border-radius: 3px;
        overflow: hidden;

        &:hover p {
          color: $color-blue-normal;
        }

        img {
          width: 110px;
          height: 100%;
          cursor: pointer;
          margin-right: 12px;
        }

        figcaption {
          padding-left: 122px;
          padding-right: 12px;

          .part {
            display: block;
            color: $color-text-deep;
            font-size: 12px;
            line-height: 14px;
            margin-top: 6px;
            margin-bottom: 5px;
          }

          .name {
            font-size: 12px;
            color: $color-text-normal;
            @include twoline(14px);
          }
        }
      }
    }

    .load-more-btn {
      margin-top: 20px;
      width: 100%;
    }

    .col-aside {
      .tags-wrap {
        margin-bottom: 20px;
      }

      #tags {
        li {
          margin-right: 10px;
          margin-bottom: 10px;
          float: left;
        }
      }

      #followers {
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

        .no-one {
          color: $color-text-normal;
        }

        .followers-more-btn {
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

        .bangumi-followers-modal {
          li {
            display: block;
            width: 100%;
            padding: 15px;
            border-bottom: 1px solid #f0f0f0;

            img {
              margin-right: 5px;
              width: 32px;
              height: 32px;
              vertical-align: middle;
              border: 1px solid #ddd;
              border-radius: 50%;
            }

            span {
              font-size: 15px;
              color: #333;
              vertical-align: middle;
              display: inline-block;
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

    #roles {
      .role {
        float: none;
        display: block;
        position: relative;
        padding-bottom: 15px;
        margin-top: 15px;
        margin-right: 30px;

        &:not(:last-child) {
          border-bottom: 1px solid #F0F0F0;
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

          .info {
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

          .star {
            float: right;
            margin-top: 14px;
            border-radius: 14px;
          }
        }

        .footer {
          margin-top: 10px;
          height: 30px;
          line-height: 30px;
          vertical-align: middle;
          color: $color-text-normal;
          text-align: right;

          img {
            width: 20px;
            height: 20px;
            border-radius: 15px;
            vertical-align: middle;
            border: 1px solid $color-gray-normal;
            margin-left: 2px;
            margin-top: -3px;
          }

          a {
            font-size: 12px;
            color: $color-text-normal;
          }

          span {
            font-size: 12px;
          }
          
          .load-list {
            cursor: pointer;
          }
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

      .load-more-roles {
        margin-top: 30px;
        text-align: center;
      }
    }

    #cartoons {
      li {
        width: 200px;
        height: 400px;
        float: left;
        box-shadow: 0 1px 3px rgba(0,0,0,.2);
        margin: 3px 9px 15px 3px;
        overflow: hidden;

        .poster-wrap {
          position: relative;
          display: block;

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            opacity: .3;
            background-color: transparent;
            background-image: linear-gradient(transparent,rgba(0,0,0,.1) 20%,rgba(0,0,0,.2) 35%,rgba(0,0,0,.6) 65%,rgba(0,0,0,.9));
          }

          &:hover {
            &:after {
              opacity: 1;
              height: 100%;
              background: rgba(0,0,0,.5);
              transition: background .2s;
            }
          }

          img {
            width: 100%;
            height: 300px;
            display: block;
          }

          .info {
            position: absolute;
            left: 7px;
            bottom: 4px;
            z-index: 1;
            color: #fff;
            line-height: 20px;

            i {
              font-size: 20px;
              vertical-align: middle;
            }

            .image-count {
              margin-left: 5px;
              font-size: 14px;
              vertical-align: middle;
            }
          }
        }

        .desc {
          padding: 10px 16px;
          height: 52px;

          button {
            float: right;
            width: 50px;
            height: 32px;
            line-height: 32px;
            text-align: right;
            color: $color-gray-deep;
            font-size: 13px;
            margin-right: 1px;

            &.liked {
              color: $color-pink-normal;
            }
          }

          a {
            display: block;
            overflow: hidden;
            line-height: 32px;
          }
        }

        .user {
          display: block;
          width: 100%;
          height: 48px;
          padding: 8px 16px;
          border-top: 1px solid #f2f2f2;
          background-color: #fafafa;

          img {
            border: 1px solid #f0f0f0;
            vertical-align: middle;
            margin-right: 8px;
            float: left;
            @include avatar(32px)
          }

          div {
            overflow: hidden;
            font-size: 12px;
            margin-top: 10px;
            color: #999;
          }
        }
      }
    }
  }
</style>

<template>
  <div id="bangumi-show">
    <section id="banner">
      <div class="img bg" :style="{ backgroundImage: info ? `url(${$resize(info.banner, { width: 1920, mode: 0 })})` : '' }"></div>
      <div class="info">
        <h1 class="title" v-text="info.name"></h1>
        <p class="summary" v-text="info.summary"></p>
        <div class="console">
          <button
            class="follow"
            @click="follow"
            :class="[ info.followed ? 'is-followed' : 'not-follow' ]"
          >
            <i class="iconfont icon-guanzhu"></i>
            {{ info.followed ? '已关注' : '关注' }}
          </button>
        </div>
      </div>
      <v-share type="panel"></v-share>
    </section>
    <div class="container">
      <aside class="col-aside">
        <div id="tags" v-if="tags.length">
          <h2 class="subtitle">标签</h2>
          <ul class="tags-wrap">
            <li class="tag" v-for="tag in tags" :key="tag.id">
              <a :href="$alias.bangumiTag(tag.id)" class="el-tag" v-text="tag.name" target="_blank"></a>
            </li>
          </ul>
        </div>
        <div id="followers">
          <h2 class="subtitle">关注的人{{ info.count_like ? `（${info.count_like}）` : '' }}</h2>
          <template v-if="info.count_like">
            <ul>
              <li class="follower" v-for="user in displayFollowers" :key="user.zone">
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
                v-if="info.count_like > 7"
                @click="openFollowersModal = true"
                class="followers-more-btn el-icon-more"
              ></button>
            </ul>
            <v-modal
              v-model="openFollowersModal"
              :header-text="`《${info.name}》的关注者们`"
              :footer="false"
              :loading="loadingFollowers"
              :no-more="noMoreFollowers"
              :scroll="fetchMoreFollowers"
              class="bangumi-followers-modal"
            >
              <li v-for="user in followers" :key="user.id">
                <a :href="$alias.user(user.zone)" target="_blank">
                  <img :src="$resize(user.avatar, { width: 120 })">
                  <span v-text="user.nickname"></span>
                  <v-time class="score" v-model="user.created_at"></v-time>
                </a>
              </li>
            </v-modal>
          </template>
          <span class="no-one" v-else>还没有人关注</span>
        </div>
      </aside>
      <div class="col-main">
        <el-tabs @tab-click="handleTabClick">
          <el-tab-pane label="帖子">
            <ul id="posts">
              <post-show-item
                v-for="item in posts.data"
                :key="item.id"
                :item="item"
              ></post-show-item>
            </ul>
            <el-button
              :loading="postState.loading"
              v-if="!posts.noMore"
              class="load-more-btn"
              @click="getPosts"
              type="info"
              plain
            >{{ postState.loading ? '加载中' : '加载更多' }}</el-button>
            <no-content v-if="posts.noMore && !posts.total">
              <el-button @click="openCreatePostModal" type="primary" round>发表《{{ info.name }}》的第一个帖子</el-button>
            </no-content>
          </el-tab-pane>
          <el-tab-pane label="视频" v-if="info.has_video">
            <section id="videos" v-if="videos.list.length">
              <div v-if="videos.has_season">
                <template v-for="season in videos.list">
                  <h3 class="celltitle" v-text="season.name" :key="season.name"></h3>
                  <ul :key="season.name">
                    <li v-for="video in season.data" :key="video.id">
                      <a :href="$alias.video(video.id)"
                         target="_blank">
                        <figure>
                          <v-img
                            class="bg"
                            :alt="video.name"
                            :src="$resize(video.poster, { width: 192, height: 120 })"
                          ></v-img>
                          <figcaption class="abs">
                            <p class="part oneline">第{{ video.part - season.base }}话</p>
                            <span class="name" v-text="video.name"></span>
                          </figcaption>
                        </figure>
                      </a>
                    </li>
                  </ul>
                </template>
              </div>
              <ul v-else>
                <li v-for="video in videos.list" :key="video.id">
                  <a :href="$alias.video(video.id)" target="_blank">
                    <figure>
                      <v-img
                        class="bg"
                        :alt="video.name"
                        :src="$resize(video.poster, { width: 192, height: 120 })"
                      ></v-img>
                      <figcaption class="abs">
                        <p class="part oneline">第{{ video.part }}话</p>
                        <span class="name" v-text="video.name"></span>
                      </figcaption>
                    </figure>
                  </a>
                </li>
              </ul>
            </section>
            <no-content v-else-if="videos.fetched">
              <el-button @click="openFeedbackForResource" type="primary" round>求资源</el-button>
            </no-content>
          </el-tab-pane>
          <el-tab-pane label="漫画" v-if="info.has_cartoon">
            <div id="cartoons">
              <ul class="clearfix" v-if="cartoonInfo.list.length">
                <li
                  v-for="item in cartoonInfo.list"
                  :key="item.id"
                >
                  <a class="poster-wrap" :href="$alias.imageAlbum(item.id)" target="_blank">
                    <img :src="$resize(item.url, { width: 400, height: 600 })">
                    <div class="info">
                      <i class="el-icon-picture-outline"></i>
                      <span class="image-count" v-text="item.image_count"></span>
                    </div>
                  </a>
                  <div class="desc">
                    <button class="like" :class="{ 'liked': item.liked }" @click="handleLikeCartoon($event, item)">
                      <i class="iconfont icon-guanzhu"></i>
                      {{ item.like_count || ''  }}
                    </button>
                    <a class="oneline" :href="$alias.imageAlbum(item.id)" target="_blank" v-text="item.name"></a>
                  </div>
                  <a class="user" :href="$alias.user(item.user.zone)" target="_blank">
                    <img :src="$resize(item.user.avatar, { width: 72 })">
                    <div class="oneline" v-text="item.user.nickname"></div>
                  </a>
                </li>
              </ul>
              <no-content v-else-if="cartoonInfo.noMore">
                <el-button @click="openFeedbackForCartoon" type="primary" round>求漫画</el-button>
              </no-content>
              <el-button
                :loading="cartoonInfo.loading"
                v-if="!cartoonInfo.noMore"
                class="load-more-btn"
                @click="getCartoons(false)"
                type="info"
                plain
              >{{ cartoonInfo.loading ? '加载中' : '加载更多' }}</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="偶像">
            <div id="roles">
              <ul>
                <li class="role" v-for="item in roles.data" :key="item.id">
                  <div class="clearfix">
                    <div class="avatar">
                      <v-img :src="item.avatar" width="90" height="90"></v-img>
                    </div>
                    <div class="summary">
                      <div class="info">
                        <span class="name" v-text="item.name"></span>
                        <span class="intro">：{{ item.intro }}</span>
                      </div>
                      <el-button
                        @click="handleStarRole(item)"
                        type="warning"
                        class="star"
                        size="mini"
                        plain>为TA应援</el-button>
                    </div>
                  </div>
                  <div class="footer" v-if="item.fans_count">
                  <span>
                    粉丝:
                    {{ $utils.shortenNumber(item.fans_count) }}
                  </span>
                    ·
                    <span>
                    金币:
                    {{ $utils.shortenNumber(item.star_count) }}
                  </span>
                    ·
                    <span v-if="item.lover">
                    守护者:
                    <a target="_blank" :href="$alias.user(item.lover.zone)">
                      {{ item.lover.nickname }}
                      <v-img :src="item.lover.avatar" width="20" height="20"></v-img>
                    </a>
                  </span>
                    ·
                    <span class="load-list" @click="showRoleDetail(item, 'new')">最新应援</span>
                    ·
                    <span class="load-list" @click="showRoleDetail(item, 'hot')">最多应援</span>
                  </div>
                </li>
              </ul>
              <el-button
                :loading="rolesState.loading"
                v-if="!roles.noMore"
                class="load-more-btn"
                @click="getRoles"
                type="info"
                plain
              >{{ rolesState.loading ? '加载中' : '加载更多' }}</el-button>
              <template v-if="roles.noMore">
                <div v-if="roles.data.length" class="load-more-roles">
                  <el-button @click="openFeedbackForRole" type="primary" round>没有你喜欢的角色？</el-button>
                </div>
                <no-content v-else>
                  <el-button @click="openFeedbackForRole" type="primary" round>求偶像</el-button>
                </no-content>
              </template>
              <v-modal
                class="role-fans-modal"
                v-model="openRolesModal"
                :header-text="`${currentRole.name} · 应援团`"
                :footer="false"
                :loading="loadingRoleFans"
                :no-more="currentRoleFans.noMore"
                :scroll="fetchCurrentRoleFans"
              >
                <li
                  v-for="item in currentRoleFans.data"
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
          </el-tab-pane>
          <el-tab-pane label="相册">
            <image-waterfall
              :loading="imagesState.loading"
              :role="roles.data"
              @fetch="getImages(false)"
            ></image-waterfall>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import PostShowItem from '~/components/items/PostShow'
  import ImageWaterfall from '~/components/lists/ImageWaterfall'
  import ImageApi from '~/api/imageApi'

  export default {
    name: 'bangumi-show',
    async asyncData ({ route, store, ctx }) {
      const id = route.params.id
      await Promise.all([
        store.dispatch('bangumi/getBangumi', { ctx, id }),
        store.dispatch('bangumi/getPosts', { ctx, id })
      ])
    },
    components: {
      PostShowItem,
      ImageWaterfall
    },
    head () {
      if (!this.id) {
        return
      }
      let keywords = this.info.alias
      this.tags.forEach(tag => {
        keywords += `,${tag.name}`
      })
      const name = this.info.name
      keywords += `${keywords}, ${name}动漫, ${name}动画片, ${name}全集, ${name}在线观看, ${name}吧`
      return {
        title: `${name} - 番剧`,
        meta: [
          { hid: 'description', name: 'description', content: this.info.summary },
          { hid: 'keywords', name: 'keywords', content: keywords }
        ]
      }
    },
    computed: {
      id () {
        return parseInt(this.$route.params.id, 10)
      },
      info () {
        return this.$store.state.bangumi.info
      },
      tags () {
        return this.info.tags
      },
      followers () {
        return this.info.followers
      },
      videos () {
        return this.$store.state.bangumi.videos
      },
      posts () {
        return this.$store.state.bangumi.posts
      },
      roles () {
        return this.$store.state.bangumi.roles
      },
      images () {
        return this.$store.state.image.waterfall
      },
      currentRoleFans () {
        return this.$store.state.cartoonRole.fans[this.focusRoleSort]
      },
      displayFollowers () {
        return this.followers.slice(0, 7)
      },
      cartoonInfo () {
        return this.$store.state.bangumi.cartoon
      }
    },
    data () {
      return {
        postState: {
          loading: false,
          init: true
        },
        videoState: {
          loading: false,
          init: false
        },
        cartoonState: {
          loading: false,
          init: false
        },
        rolesState: {
          loading: false,
          init: false
        },
        imagesState: {
          loading: false,
          init: false
        },
        openRolesModal: false,
        loadingRoleFans: false,
        focusRoleSort: 'new',
        currentRole: {},
        loadingFollow: false,
        openFollowersModal: false,
        loadingFollowers: false,
        noMoreFollowers: false,
        fetchFollowersCount: 10
      }
    },
    methods: {
      async follow () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.loadingFollow) {
          return
        }
        this.loadingFollow = true
        try {
          await this.$store.dispatch('bangumi/follow', {
            ctx: this,
            id: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFollow = false
        }
      },
      handleTabClick (tab) {
        const label = tab.label
        if (label === '帖子') {
          if (!this.postState.init) {
            this.getPosts()
          }
        } else if (label === '漫画') {
          this.getCartoons(true)
        } else if (label === '视频') {
          if (!this.videoState.init) {
            this.getVideos()
          }
        } else if (label === '偶像') {
          if (!this.rolesState.init) {
            this.getRoles()
          }
        } else if (label === '相册') {
          this.getImages(true)
          if (!this.rolesState.init) {
            this.getRoles()
          }
        }
      },
      async getRoles () {
        if (this.rolesState.loading) {
          return
        }
        this.rolesState.loading = true
        this.rolesState.init = true

        try {
          await this.$store.dispatch('bangumi/getRoles', {
            ctx: this,
            bangumiId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.rolesState.loading = false
        }
      },
      async getVideos () {
        if (this.videoState.loading) {
          return
        }
        this.videoState.loading = true
        this.videoState.init = true

        try {
          await this.$store.dispatch('bangumi/getVideos', {
            ctx: this,
            id: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.videoState.loading = false
        }
      },
      async getPosts () {
        if (this.postState.loading || this.posts.noMore) {
          return
        }
        this.postState.loading = true

        try {
          await this.$store.dispatch('bangumi/getPosts', {
            ctx: this,
            id: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.postState.loading = false
        }
      },
      async getCartoons (isFirstRequest) {
        if (isFirstRequest && this.cartoonInfo.list.length) {
          return
        }
        if (this.cartoonState.loading) {
          return
        }
        this.cartoonState.loading = true

        try {
          await this.$store.dispatch('bangumi/getCartoons', {
            ctx: this,
            bangumiId: this.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.cartoonState.loading = false
        }
      },
      async getImages (force) {
        if (this.imagesState.loading) {
          return
        }
        this.imagesState.loading = true

        try {
          await this.$store.dispatch('image/getBangumiImages', {
            ctx: this,
            id: this.id,
            force
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.imagesState.loading = false
        }
      },
      showRoleDetail (role, sort) {
        this.currentRole = role
        this.openRolesModal = true
        this.focusRoleSort = sort
        this.fetchCurrentRoleFans(true)
      },
      async fetchCurrentRoleFans (reset = false) {
        if (this.loadingRoleFans) {
          return
        }
        this.loadingRoleFans = true
        try {
          await this.$store.dispatch('cartoonRole/getFansList', {
            ctx: this,
            bangumiId: this.id,
            roleId: this.currentRole.id,
            sort: this.focusRoleSort,
            reset
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingRoleFans = false
        }
      },
      async handleStarRole (role) {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (!this.$store.state.user.coin) {
          this.$toast.error('金币不足')
          return
        }
        try {
          await this.$store.dispatch('bangumi/starRole', {
            bangumiId: this.id,
            roleId: role.id,
            ctx: this,
            hasStar: role.has_star
          })
          this.$store.commit('USE_COIN')
          this.$toast.success(`+${role.has_star}s`)
        } catch (e) {
          this.$toast.error(e)
        }
      },
      openCreatePostModal () {
        this.$channel.$emit('show-create-post-modal')
      },
      openFeedbackForResource () {
        this.$channel.$emit('open-feedback', {
          type: 5,
          desc: `我想看《${this.info.name}》的视频第 ? 集`
        })
      },
      openFeedbackForCartoon () {
        this.$channel.$emit('open-feedback', {
          type: 7,
          desc: `我想看《${this.info.name}》的漫画第 ? 话`
        })
      },
      openFeedbackForRole () {
        this.$channel.$emit('open-feedback', {
          type: 6,
          desc: `我想要为《${this.info.name}》的 ? 应援`
        })
      },
      async fetchMoreFollowers () {
        if (this.loadingFollowers || this.noMoreFollowers) {
          return
        }
        this.loadingFollowers = true
        try {
          const data = await this.$store.dispatch('bangumi/getFollowers', {
            ctx: this,
            bangumiId: this.id,
            take: this.fetchFollowersCount
          })
          this.noMoreFollowers = data.length < this.fetchFollowersCount
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFollowers = false
        }
      },
      handleLikeCartoon (e, image) {
        if (!this.$store.state.login) {
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        if (image.user_id === this.$store.state.user.id) {
          this.$toast.info('不能为自己的图片点赞')
          return
        }
        const btn = e.currentTarget
        if (!image.liked) {
          this.$confirm('原创图片点赞需要金币, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.submitToggleLikeCartoon(btn, image)
          }).catch(() => {})
          return
        }
        this.submitToggleLikeCartoon(btn, image)
      },
      async submitToggleLikeCartoon (btn, image) {
        btn.setAttribute('disabled', 'disabled')
        // do like
        const api = new ImageApi(this)
        try {
          const result = await api.toggleLike({ id: image.id })
          if (image.creator && result) {
            this.$store.commit('USE_COIN')
          }
          this.$toast.success('操作成功')
          this.$store.commit('bangumi/TOGGLE_LIKE_CARTOON', {
            id: image.id,
            result
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          btn.removeAttribute('disabled')
        }
      }
    },
    mounted () {
      this.$channel.$on('get-page-bangumi-for-post-create', () => {
        this.$channel.$emit('set-page-bangumi-for-post-create', {
          id: this.info.id,
          name: this.info.name,
          avatar: this.info.avatar
        })
      })
      this.noMoreFollowers = this.followers.length < this.fetchFollowersCount
      setTimeout(() => {
        document.getElementById('tab-1').click()
      }, 1000)
    }
  }
</script>
