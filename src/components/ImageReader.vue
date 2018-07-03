<style lang="scss">
  #image-reader-modal {
    .v-modal {
      max-width: 90%;
      max-height: 90%;
      min-width: 80%;
      height: 700px;
      box-shadow: none;
      background-color: #000;

      > main {
        overflow: auto;
        padding: 0;
        height: 100%;
      }

      img {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: block;
        max-width: 100%;
        max-height: 100%;
        width: auto;
      }
    }

    .el-carousel {
      background-color: #000;
      max-height: 100%;

      .el-carousel__container {
        height: 100%;
      }

      .el-carousel__indicators {
        display: none;
      }
    }

    #download-btn {
      position: absolute;
      bottom: 15px;
      color: #fff;
      text-align: center;
      opacity: 0.8;
      left: 50%;
      margin-left: -51px;
      z-index: 100;
      text-shadow: 0 1px 10px gray;
      padding: 6px 20px;
      border-radius: 20px;
      border: 1px solid #fff;
      background-color: rgba(0,0,0,.4);
      font-size: 15px;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>

<template>
  <v-modal
    v-model="open"
    id="image-reader-modal"
    :header="false"
    :footer="false"
    :close="false"
  >
    <el-carousel
      v-if="maxHeight"
      :autoplay="false"
      :arrow="length > 1 ? 'always' : 'never'"
      :initial-index="index"
      :height="`${maxHeight}`"
      :style="{ height: `${maxHeight}px` }"
      @change="handleCarouselChange"
    >
      <el-carousel-item
        v-for="(item, idx) in images"
        :key="`${idx}-${item}`"
      >
        <v-img
          :src="computeImageSize(item)"
          :id="`image-reader-${idx}`"
        ></v-img>
      </el-carousel-item>
    </el-carousel>
    <a id="download-btn" target="_blank" :href="imageHref" :download="imageName" @click.stop>下载原图</a>
  </v-modal>
</template>

<script>
  export default {
    name: 'image-reader',
    data () {
      return {
        images: [],
        index: 0,
        open: false,
        maxWidth: 0,
        maxHeight: 0,
        maxWidthHeightRate: 0,
        maxHeightWidthRate: 0,
        length: 0
      }
    },
    computed: {
      imageHref () {
        if (!this.images.length) {
          return ''
        }
        return this.images[this.index].url
      },
      imageName () {
        return this.imageHref ? `calibur-tv-${Date.now()}.${this.imageHref.split('.').pop()}` : ''
      }
    },
    mounted () {
      this.computeMaxSize()
      window.addEventListener('resize', () => {
        this.computeMaxSize()
      })
      this.$channel.$on('open-image-reader', ({ images, index }) => {
        if (!images) {
          return
        }
        this.images = Array.isArray(images) ? images : [images]
        this.index = index || 0
        this.length = this.images.length
        this.open = true
        setTimeout(() => {
          const length = images.length
          // 如果图片大于一张，要 hack 懒加载
          if (length > 1) {
            if (length - 1 === index) {
              // 预览的是最后一张，加载上一张
              this.$channel.$emit(`image-load-image-reader-${index - 1}`)
            } else if (index === 0) {
              // 预览的是第一张，加载下一张
              this.$channel.$emit(`image-load-image-reader-1`)
            } else {
              // 预览的是中间的图，加载上一张和下一张
              this.$channel.$emit(`image-load-image-reader-${index + 1}`)
              this.$channel.$emit(`image-load-image-reader-${index - 1}`)
            }
          }
        }, 500)
      })
    },
    methods: {
      computeMaxSize () {
        this.maxWidth = parseInt(document.body.offsetWidth * 0.9, 10)
        this.maxHeight = parseInt(document.body.offsetHeight * 0.9, 10)
        this.maxWidthHeightRate = this.maxWidth / this.maxHeight
        this.maxHeightWidthRate = this.maxHeight / this.maxWidth
      },
      computeImageType (image) {
        const width = image.width
        const height = image.height

        if (!width || !height) {
          return 0
        }

        // 图片太小了，直接返回
        if (width < this.maxWidth && height < this.maxHeight) {
          return 1
        }

        const imageWidthHeightRate = width / height
        const imageHeightWidthRate = height / width

        // 图片太大，但没有溢出屏幕
        if (this.maxWidthHeightRate > imageWidthHeightRate && this.maxHeightWidthRate > imageHeightWidthRate) {
          return 2
        }

        // 图片太长
        if (this.maxHeightWidthRate < imageHeightWidthRate) {
          return 3
        }

        // 图片太宽
        if (this.maxWidthHeightRate < imageWidthHeightRate) {
          return 4
        }

        return 5
      },
      computeImageSize (image) {
        const type = this.computeImageType(image)
        if (type === 4) {
          return this.$resize(image.url, { width: this.maxWidth, mode: 2 })
        }
        return this.$resize(image.url, { height: this.maxHeight, mode: 2 })
      },
      handleCarouselChange (index) {
        this.$nextTick(() => {
          const maxIndex = this.images.length - 1
          if (index === 0) {
            this.$channel.$emit(`image-load-image-reader-1`)
            this.$channel.$emit(`image-load-image-reader-${maxIndex}`)
          } else if (index === maxIndex) {
            this.$channel.$emit(`image-load-image-reader-0`)
            this.$channel.$emit(`image-load-image-reader-${index - 1}`)
          } else {
            this.$channel.$emit(`image-load-image-reader-${index + 1}`)
            this.$channel.$emit(`image-load-image-reader-${index - 1}`)
          }
          this.index = index
        })
      }
    }
  }
</script>
