<style lang="scss">
  .vue-pwa-range-container {
    position: relative;
    display: flex;
    box-sizing: border-box;

    & > * {
      display: flex;
      display: -webkit-box;
    }

    .vue-pwa-range {
      overflow: hidden;
      border-radius: 4px;
      position: relative;
      cursor: pointer;
      flex: 1;
    }

    .vue-pwa-range-runway {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: $color-gray-normal;
    }

    .vue-pwa-range-progress {
      position: absolute;
      left: 0;
      display: block;
      background-color: $color-blue-normal;
    }

    .vue-pwa-range-loading {
      position: absolute;
      display: block;
      background-color: $color-blue-light;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      transition: .2s;
      border-radius: 4px;
    }

    .vue-pwa-range-thumb {
      background-color: $color-white;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,.4);
      cursor: pointer;
    }

    .vue-pwa-range-disabled {
      opacity: 0.5;
    }
  }
</style>

<template>
  <div class="vue-pwa-range-container"
       :style="containerStyle"
       :class="{ 'vue-pwa-range-disabled': disabled }"
       @touchmove.stop
       @click.stop>
    <div class="vue-pwa-range"
         ref="content">
      <div class="vue-pwa-range-runway"
           @click.stop="handleClick">
      </div>
      <div class="vue-pwa-range-loading"
           v-if="loading"
           @click.stop="handleClick"
           :style="loadingStyle">
      </div>
      <div class="vue-pwa-range-progress"
           @click.stop="handleClick"
           :style="progressStyle">
      </div>
    </div>
    <div class="vue-pwa-range-thumb"
         :style="thumbStyle"
         ref="thumb"
         @click.stop>
    </div>
  </div>
</template>

<script>
  import draggable from '~/assets/js/draggable.js'

  export default {
    name: 'v-range',
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: Number
      },
      loading: {
        type: Number,
        default: 0
      },
      barsize: {
        type: Number,
        default: 6
      },
      tailsize: {
        type: Number,
        default: 14
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      'value' (val) {
        this.curRange = val
      },
      'curRange' (val) {
        this.$emit('input', val)
      }
    },
    computed: {
      containerStyle () {
        let style = {}
        let size = this.tailsize ? (this.tailsize - this.barsize) / 2 + 'px' : '0px'
        if (this.vertical) {
          style.paddingLeft = size
          style.paddingRight = size
          style.height = '100%'
          style.width = (this.tailsize || this.barsize) + 'px'
        } else {
          style.paddingTop = size
          style.paddingBottom = size
          style.width = '100%'
          style.height = (this.tailsize || this.barsize) + 'px'
        }

        return style
      },
      progressStyle () {
        this.getOffset()

        let style = {}
        let offset = this.progress()

        if (this.vertical) {
          style.width = this.barsize + 'px'
          style.height = offset + '%'
          style.top = 100 - offset + '%'
        } else {
          style.width = offset + '%'
          style.height = this.barsize + 'px'
          style.left = 0
        }

        return style
      },
      loadingStyle () {
        this.getOffset()

        if (this.vertical) {
          return { height: this.loading / this.max * 100 + '%', width: this.barsize + 'px' }
        } else {
          return { width: this.loading / this.max * 100 + '%', height: this.barsize + 'px' }
        }
      },
      thumbStyle () {
        if (!this.tailsize) {
          return {}
        }

        this.getOffset()

        let style = {}

        style.width = this.tailsize + 'px'
        style.height = this.tailsize + 'px'

        if (this.vertical) {
          style.top = 100 - this.progress() - this.offset + '%'
        } else {
          style.left = this.progress() - this.offset + '%'
        }

        return style
      }
    },
    data () {
      return {
        curRange: this.value,
        dragState: null,
        offset: 0
      }
    },
    methods: {
      progress () {
        const value = this.value
        if (typeof value === 'undefined' || value === null || value - this.min === 0) return 0
        return Math.floor((value - this.min) / (this.max - this.min) * 100)
      },
      getOffset () {
        if (this.$refs.content) {
          this.offset = this.tailsize / (this.vertical ? this.$refs.content.offsetHeight : this.$refs.content.offsetWidth) * 50
        }
      },
      handleClick (event) {
        if (this.disabled) return
        this.getOffset()
        this.getPosition(event)
      },
      getPosition (event) {
        const contentBox = this.$refs.content.getBoundingClientRect()
        let delta, newPosition, baseOffset, maxOffset
        if (!this.dragState) {
          this.getThumbPosition()
        }

        if (this.vertical) {
          baseOffset = this.dragState.y
          maxOffset = contentBox.height
          delta = event.pageY - contentBox.top - baseOffset - window.scrollY
        } else {
          baseOffset = this.dragState.x
          maxOffset = contentBox.width
          delta = event.pageX - contentBox.left - baseOffset - window.scrollX
        }

        if (this.step) {
          const stepCount = Math.ceil((this.max - this.min) / this.step)
          newPosition = (baseOffset + delta) - (baseOffset + delta) % (maxOffset / stepCount)
        } else {
          newPosition = baseOffset + delta
        }

        let newProgress = newPosition / maxOffset

        if (newProgress < 0) {
          newProgress = 0
        } else if (newProgress > 1) {
          newProgress = 1
        }

        if (this.vertical) {
          newProgress = 1 - newProgress
        }

        const result = Math.round(this.min + newProgress * (this.max - this.min))

        this.$emit('rangeChangeEvent', result)
        this.curRange = result
      },
      getThumbPosition () {
        const contentBox = this.$refs.content.getBoundingClientRect()
        const thumbBox = this.$refs.thumb.getBoundingClientRect()

        this.dragState = {
          x: thumbBox.left - contentBox.left,
          y: thumbBox.top - contentBox.top
        }
      }
    },
    mounted () {
      this.getOffset()

      draggable(this.$refs.thumb, {
        start: () => {
          if (this.disabled) return
          this.getThumbPosition()
        },
        drag: (event) => {
          this.handleClick(event)
        },
        end: () => {
          if (this.disabled) return
          this.dragState = null
        }
      })

      window.addEventListener('resize', () => {
        this.getOffset()
      })
    }
  }
</script>
