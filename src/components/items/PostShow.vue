<style lang="scss">
  .post-show-item {
    float: none;
    padding: 10px 10px 10px 65px;
    position: relative;

    &:not(:last-child) {
      border-bottom: 1px dotted #e4e6eb;
    }

    .header {
      position: relative;
      height: 32px;

      .bangumi-avatar {
        display: block;
        float: left;
        margin-right: 10px;
        margin-top: 4px;

        img {
          display: block;
          width: 24px;
          height: 24px;
        }
      }

      .user-avatar {
        display: block;
        float: left;
        margin-right: 7px;

        img {
          display: block;
          border: 1px solid #F0F0F0;
          @include avatar(32px);
        }
      }

      .title {
        font-size: 14px;
        line-height: 32px;
        display: block;
      }

      .time {
        float: right;
        display: block;
        line-height: 32px;
        color: #999;
        font-size: 12px;
        margin-left: 10px;
      }
    }

    .content {
      margin-top: 3px;
      color: #666;
      font-size: 12px;
      @include twoline(22px);

      &.min-height {
        min-height: 44px;
      }

      a {
        font-size: 12px;
        line-height: 22px;
        color: #262626;
        font-weight: 600;
      }
    }

    .images {
      height: 90px;
      overflow: hidden;
      margin-top: 10px;
      margin-bottom: 15px;

      .image-box {
        margin-right: 10px;
        height: 100%;
        position: relative;
        float: left;
        cursor: zoom-in;

        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: #fff;
          opacity: 0;
        }

        &:hover {
          &:after {
            opacity: 0.1;
          }
        }

        img {
          height: 100%;
          width: auto;
        }
      }
    }

    .counter {
      position: absolute;
      left: 0;
      top: 12px;
      width: 50px;
      height: 30px;
      line-height: 26px;
      font-size: 12px;
      text-align: center;
      background-color: RGB(247, 247, 247);
      display: block;
      border: 1px solid #e4e6eb;
      border-radius: 3px;
    }

    .footer {
      text-align: right;
      font-size: 13px;
      color: $color-text-light;

      .done {
        color: $color-blue-normal;
      }

      .v-share {
        display: inline-block;

        .share-btn {
          color: $color-text-light;
          font-size: 12px;
        }
      }

      span {
        margin-left: 15px;
        line-height: 20px;
        font-size: 12px;
      }

      i {
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
</style>

<template>
  <li class="post-show-item">
    <div class="header clearfix">
      <el-tooltip v-if="bangumiPage" effect="dark" :content="item.user.nickname" placement="top">
        <a class="user-avatar" :href="$alias.user(item.user.zone)" target="_blank">
          <v-img :src="item.user.avatar" width="32" height="32"></v-img>
        </a>
      </el-tooltip>
      <el-tooltip effect="dark" :content="item.bangumi.name" placement="top" v-else>
        <a class="bangumi-avatar" :href="$alias.bangumi(item.bangumi.id)" target="_blank">
          <v-img :src="item.bangumi.avatar" width="32" height="32"></v-img>
        </a>
      </el-tooltip>
      <el-tooltip effect="dark" :content="`发表于：${item.created_at}`" placement="top" v-if="item.updated_at !== item.created_at">
        <span class="time">
          回复于: <v-time v-model="item.updated_at"></v-time>
        </span>
      </el-tooltip>
      <span class="time" v-else>
        发表于: <v-time v-model="item.updated_at"></v-time>
      </span>
      <a class="title oneline href-fade-blue" target="_blank" :href="$alias.post(item.id)" v-text="item.title"></a>
    </div>
    <p class="content" :class="{ 'min-height': !item.images.length }" v-text="item.desc" v-if="bangumiPage"></p>
    <p class="content" :class="{ 'min-height': !item.images.length }" v-else>
      <a target="_blank" :href="$alias.user(item.user.zone)">{{ item.user.nickname }}</a>
      :
      {{ item.desc }}
    </p>
    <div class="images clearfix" v-if="item.images.length">
      <div
        class="image-box"
        v-for="(image, index) in item.images"
        :key="index"
        @click="$previewImages(item.images, index)"
      >
        <v-img
          :src="image.url"
          height="90"
          mode="2"
          :aspect="$computeImageAspect(image)"
        ></v-img>
      </div>
    </div>
    <span class="counter" v-text="item.comment_count"></span>
    <div class="footer">
      <v-share
        type="button"
        :url="`/post/${item.id}`"
        :title="item.title"
        :desc="item.desc"
      ></v-share>
      <span :class="{ 'done': item.marked }">
        <i class="iconfont icon-buoumaotubiao44"></i>
        收藏数&nbsp;({{ item.mark_count }})
      </span>
      <span :class="{ 'done': item.liked }">
        <i class="iconfont icon-guanzhu"></i>
        喜欢数&nbsp;({{ item.like_count }})
      </span>
      <span>
        <i class="iconfont icon-ai-eye"></i>
        阅读数&nbsp;({{ item.view_count }})
      </span>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'PostShowItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      bangumiPage () {
        return this.$route.name === 'bangumi-show'
      }
    }
  }
</script>
