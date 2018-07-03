<style lang="scss">
  .image-cropper {
    img {
      max-width: 100%;
    }
  }

  .image-crop-footer {
    margin-top: 20px;
    text-align: right;

    .submit {
      margin-left: 20px;
    }
  }
  /*!
 * Cropper.js v1.1.3
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015-2017 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2017-10-21T09:27:29.883Z
 */
  $outline-color: transparent;

  .cropper-container {
    direction: ltr;
    font-size: 0;
    line-height: 0;
    position: relative;
    -ms-touch-action: none;
    touch-action: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .cropper-container img {
    /*
     * Avoid margin top issue (Occur only when margin-top <= -height)
     */
    display: block;
    height: 100%;
    image-orientation: 0deg;
    max-height: none !important;
    max-width: none !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100%;
  }

  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .cropper-crop-box span {
    margin: 0 !important;
  }

  .cropper-wrap-box,
  .cropper-canvas {
    overflow: hidden;
  }

  .cropper-drag-box {
    background-color: #fff;
    opacity: 0;
  }

  .cropper-modal {
    background-color: transparent;
    cursor: default;
  }

  .cropper-view-box {
    display: block;
    height: 100%;
    outline: 1px solid $outline-color;
    overflow: hidden;
    width: 100%;
  }

  .cropper-dashed {
    border: 0 dashed #eee;
    display: block;
    opacity: .5;
    position: absolute;
  }

  .cropper-dashed.dashed-h {
    border-bottom-width: 1px;
    border-top-width: 1px;
    height: 33.33333%;
    left: 0;
    top: 33.33333%;
    width: 100%;
  }

  .cropper-dashed.dashed-v {
    border-left-width: 1px;
    border-right-width: 1px;
    height: 100%;
    left: 33.33333%;
    top: 0;
    width: 33.33333%;
  }

  .cropper-center {
    display: block;
    height: 0;
    left: 50%;
    opacity: .75;
    position: absolute;
    top: 50%;
    width: 0;
  }

  .cropper-center:before,
  .cropper-center:after {
    background-color: #eee;
    content: ' ';
    display: block;
    position: absolute;
  }

  .cropper-center:before {
    height: 1px;
    left: -3px;
    top: 0;
    width: 7px;
  }

  .cropper-center:after {
    height: 7px;
    left: 0;
    top: -3px;
    width: 1px;
  }

  .cropper-face,
  .cropper-line,
  .cropper-point {
    display: block;
    height: 100%;
    opacity: .1;
    position: absolute;
    width: 100%;
  }

  .cropper-line {
    background-color: $outline-color;
  }

  .cropper-line.line-e {
    cursor: e-resize;
    right: -3px;
    top: 0;
    width: 5px;
  }

  .cropper-line.line-n {
    cursor: n-resize;
    height: 5px;
    left: 0;
    top: -3px;
  }

  .cropper-line.line-w {
    cursor: w-resize;
    left: -3px;
    top: 0;
    width: 5px;
  }

  .cropper-line.line-s {
    bottom: -3px;
    cursor: s-resize;
    height: 5px;
    left: 0;
  }

  .cropper-point {
    background-color: $outline-color;
    height: 5px;
    opacity: .75;
    width: 5px;
  }

  .cropper-point.point-e {
    cursor: e-resize;
    margin-top: -3px;
    right: -3px;
    top: 50%;
  }

  .cropper-point.point-n {
    cursor: n-resize;
    left: 50%;
    margin-left: -3px;
    top: -3px;
  }

  .cropper-point.point-w {
    cursor: w-resize;
    left: -3px;
    margin-top: -3px;
    top: 50%;
  }

  .cropper-point.point-s {
    bottom: -3px;
    cursor: s-resize;
    left: 50%;
    margin-left: -3px;
  }

  .cropper-point.point-ne {
    cursor: ne-resize;
    right: -3px;
    top: -3px;
  }

  .cropper-point.point-nw {
    cursor: nw-resize;
    left: -3px;
    top: -3px;
  }

  .cropper-point.point-sw {
    bottom: -3px;
    cursor: sw-resize;
    left: -3px;
  }

  .cropper-point.point-se {
    bottom: -3px;
    cursor: se-resize;
    height: 20px;
    opacity: 1;
    right: -3px;
    width: 20px;
  }

  @media (min-width: 768px) {
    .cropper-point.point-se {
      height: 15px;
      width: 15px;
    }
  }

  @media (min-width: 992px) {
    .cropper-point.point-se {
      height: 10px;
      width: 10px;
    }
  }

  @media (min-width: 1200px) {
    .cropper-point.point-se {
      height: 5px;
      opacity: .75;
      width: 5px;
    }
  }

  .cropper-point.point-se:before {
    background-color: $outline-color;
    bottom: -50%;
    content: '';
    display: block;
    height: 200%;
    opacity: 0;
    position: absolute;
    right: -50%;
    width: 200%;
  }

  .cropper-invisible {
    opacity: 0;
  }

  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }

  .cropper-hide {
    display: block;
    height: 0;
    position: absolute;
    width: 0;
  }

  .cropper-hidden {
    display: none !important;
  }

  .cropper-move {
    cursor: move;
  }

  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }

</style>

<template>
  <section class="image-cropper">
    <main class="image-crop-area">
      <img :src="src" ref="image">
    </main>
    <slot></slot>
    <footer class="image-crop-footer">
      <el-button class="cancel"
                 type="text"
                 @click="handleCancel"
                 :disabled="uploading"
                 v-if="showCancel"
      >{{ textCancel }}</el-button>
      <el-button class="submit"
                 type="primary"
                 :loading="uploading"
                 @click="handleSubmit"
      >{{ textSubmit }}</el-button>
    </footer>
  </section>
</template>

<script>
  import Cropper from 'cropperjs'

  export default {
    name: 'Cropper',
    props: {
      src: {
        required: true,
        type: String
      },
      mode: {
        type: String,
        default: 'avatar',
        validator: val => ~['avatar', 'banner'].indexOf(val)
      },
      scale: {
        type: Number,
        default: 1
      },
      uploading: {
        type: Boolean,
        default: false
      },
      autoScale: {
        type: Boolean,
        default: true
      },
      showCancel: {
        type: Boolean,
        default: true
      },
      textCancel: {
        type: String,
        default: '取消'
      },
      textSubmit: {
        type: String,
        default: '确认'
      },
      scaleRadio: {
        type: Number,
        default: 3.5
      },
      scaleMin: {
        type: Number,
        default: 0
      },
      scaleMax: {
        type: Number,
        default: 100
      },
      fileType: {
        type: String,
        default: 'image/png'
      },
      fileKey: {
        type: String,
        default: 'file'
      },
      cropStyle: {
        type: Object,
        default: function () {
          return {
            modal: true, // 未选中区域的黑色遮罩
            guides: true, // 选中区域的九宫格虚线
            center: true, // 选中区域的中心 + 号
            highlight: true, // 选中区域加白色的遮罩
            background: false // container 内图片未覆盖的区域用"透明色"背景
          }
        }
      },
      preview: {
        type: String,
        default: '' // 预览图片，传一个类名
      },
      aspect: {
        type: Number,
        default: 16 / 9
      }
    },
    watch: {
      scale (val) {
        this.changeZoom((val / 10) + 1)
      }
    },
    data () {
      return {
        cropper: null,
        config: {
          avatar: Object.assign({
            viewMode: 3, // https://github.com/fengyuanchen/cropperjs#viewmode
            dragMode: 'move', // 选取是拖动形式还是新建形式
            aspectRatio: 1, // 裁剪区域比例
            data: null, // https://github.com/fengyuanchen/cropperjs#data
            preview: this.preview, // 预览图片
            responsive: false, // window.resize -> container
            restore: false, // window.resize -> image
            checkCrossOrigin: true, // img cors
            checkOrientation: false, // 图片云的压缩图没有 exif 信息
            autoCrop: true, // 初始化的时候就有了裁剪区域
            autoCropArea: 1, // 初始裁剪区域占图片的比例
            movable: true, // https://github.com/fengyuanchen/cropperjs#movable
            rotatable: true, // 旋转图片？
            scalable: true, // https://github.com/fengyuanchen/cropperjs#scalable
            zoomable: true, // 图片能否 scale
            zoomOnTouch: true, // https://github.com/fengyuanchen/cropperjs#zoomontouch
            zoomOnWheel: true, // 鼠标滚轮滚动时，如果鼠标在裁剪区域内，则改变裁剪
            wheelZoomRatio: 0.1, // https://github.com/fengyuanchen/cropperjs#wheelzoomratio
            cropBoxMovable: false, // 裁剪区域是否可移动
            cropBoxResizable: false, // 裁剪区域是否可变大小
            toggleDragModeOnDblclick: false // 双击切换 dragMode
          }, this.cropStyle),
          banner: Object.assign({

          }, this.cropStyle)
        }
      }
    },
    methods: {
      changeZoom (scale) {
        this.cropper.scale(scale)
      },
      handleCancel () {
        this.cropper.reset()
        this.$emit('cancel')
      },
      handleSubmit () {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          const formData = new FormData()
          const now = Date.now()
          const file = new File([blob], `${now}-${Math.random().toString(36).substring(3, 6)}.${this.fileType.split('/').pop()}`, { type: this.fileType, lastModified: now })
          formData.append(this.fileKey, file)
          this.$emit('submit', formData)
        }, this.fileType)
      }
    },
    mounted () {
      this.cropper = new Cropper(this.$refs.image, Object.assign({
        zoom: (e) => {
          if (this.autoScale) {
            return
          }
          e.preventDefault()
          let result = e.detail.ratio < e.detail.oldRatio
            ? this.scale + this.scaleRadio
            : this.scale - this.scaleRadio
          if (result - this.scaleMin < this.scaleRadio) {
            result = this.scaleMin
          }
          if (this.scaleMax - result < this.scaleRadio) {
            result = this.scaleMax
          }
          if (result >= this.scaleMin || result <= this.scaleMax) {
            this.$emit('update:scale', result)
          }
        }
      }, this.config[this.mode]))
    }
  }
</script>
