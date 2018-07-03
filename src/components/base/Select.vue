<style lang="scss">
  .v-select-wrap {
    position: relative;

    .v-select-text-area-wrap {
      height: 100%;
      overflow: hidden;

      .v-select-selected-item-wrap {
        float: left;
        height: 100%;

        .v-select-selected-item {
          display: block;
          padding: 15px;
          margin: 0 5px;
          height: 100%;
          float: left;
          cursor: pointer;
        }
      }


      .v-select-input-wrap {
        height: 100%;
        overflow: hidden;

        .v-select-input {
          width: 100%;
          height: 100%;
        }
      }
    }

    .v-select-submit-wrap {
      float: right;
      height: 100%;
      cursor: pointer;

      svg {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        transition-duration: 300ms;
      }

      &.open svg {
        transform: rotate(180deg);
      }
    }

    .v-select-options-wrap {
      width: 100%;
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 100%;
      z-index: 999;

      .v-select-options-item {
        &:hover {
          cursor: pointer;
        }

        &.selected {
        }

        &.disabled {
          cursor: not-allowed;
        }
      }
    }

    .zoom-in-top-enter-active,
    .zoom-in-top-leave-active {
      opacity: 1;
      transform: scaleY(1);
      transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
      transform-origin: center top;
    }
    .zoom-in-top-enter,
    .zoom-in-top-leave-active {
      opacity: 0;
      transform: scaleY(0);
    }
  }
</style>

<template>
  <div class="v-select-wrap">
    <div
      class="v-select-submit-wrap"
      @click.stop="handleSubmitClick"
      :class="{ 'open': show }"
    >
      <slot name="tail">
        <svg viewBox="0 0 10 6"
             aria-hidden="true">
          <path d="M8.716.217L5.002 4 1.285.218C.99-.072.514-.072.22.218c-.294.29-.294.76 0 1.052l4.25 4.512c.292.29.77.29 1.063 0L9.78 1.27c.293-.29.293-.76 0-1.052-.295-.29-.77-.29-1.063 0z"></path>
        </svg>
      </slot>
    </div>
    <div class="v-select-text-area-wrap" v-if="enter" @click="handleTextAreaFocus">
      <ul class="v-select-selected-item-wrap" v-if="haveSelected" @click.stop>
        <li
          v-for="item in selectedList"
          :key="item.__uuid__"
          class="v-select-selected-item"
        >
          <slot name="selected">
            <span class="v-selected-selected-cancel" v-if="multi" @click="handleSelectedCancel(item)">&times;</span>
            {{ item[`${showLabel}`] }}
          </slot>
        </li>
      </ul>
      <div class="v-select-placeholder" v-else-if="!show">
        <slot name="placeholder">
          {{ placeholder }}
        </slot>
      </div>
      <div class="v-select-input-wrap">
        <input
          class="v-select-input"
          v-model="input"
          @keyup.enter="handleSubmitClick"
          type="text">
      </div>
    </div>
    <div class="v-select-text-area-wrap" v-else>
      <div class="v-select-input-wrap" @click="handleTextAreaFocus">
        <ul class="v-select-selected-item-wrap" v-if="haveSelected">
          <li
            v-for="item in selectedList"
            :key="item.__uuid__"
            class="v-select-selected-item"
          >
            <slot name="selected">
              <span class="v-selected-selected-cancel" v-if="multi" @click="handleSelectedCancel(item)">&times;</span>
              {{ item[`${showLabel}`] }}
            </slot>
          </li>
        </ul>
        <div class="v-select-placeholder" v-else>
          <slot name="placeholder">
            {{ placeholder }}
          </slot>
        </div>
      </div>
    </div>
    <transition name="zoom-in-top">
      <ul class="v-select-options-wrap" ref="ul" v-show="show">
        <slot name="options">
          <li
            v-for="item in list"
            class="v-select-options-item"
            :class="{
              'selected': item[`${selectedLabel}`],
              'disabled': item[`${disabledLabel}`]
            }"
            :key="item.__uuid__"
            @click="handleOptionClick(item)"
          >
            {{ item[`${showLabel}`] }}
          </li>
        </slot>
      </ul>
    </transition>
  </div>
</template>

<script>
  const privateKeys = [
    '__selected__',
    '__disabled__',
    '__uuid__',
    '__isObj__'
  ]
  const defaultLabels = {
    show: '__label__',
    selected: '__selected__',
    disabled: '__disabled__'
  }
  const createRandomStr = () => Math.random().toString(36).substring(3, 6)
  const encodeOptions = (options, selectedLabel, disabledLabel, setter) => {
    const result = []

    options.forEach((item, index) => {
      if (item.__uuid__) {
        // 如果 option 已经格式化过了
        result.push(item)
      } else {
        // 如果 option 不是 object
        if (typeof item !== 'object') {
          const obj = {
            [defaultLabels.show]: item,
            __uuid__: `${item}-${index}-${createRandomStr()}`,
            __isObj__: false
          }
          setter(obj, defaultLabels.selected, false)
          setter(obj, defaultLabels.disabled, false)
          result.push(obj)
        } else {
          // 如果 option 是 object 并且没有格式化过
          const temp = {}
          Object.keys(item).forEach((key) => {
            if (item.hasOwnProperty(key)) {
              temp[key] = item[key]
            }
            // 如果 option 没有自己的 selected 属性
            if (selectedLabel === defaultLabels.selected) {
              setter(temp, defaultLabels.selected, false)
            }
            // 如果 option 没有自己的 disabled 属性
            if (disabledLabel === defaultLabels.disabled) {
              setter(temp, defaultLabels.disabled, false)
            }
          })
          result.push(Object.assign(temp, {
            __uuid__: `${index}-${createRandomStr()}`,
            __isObj__: true
          }))
        }
      }
    })

    return result
  }

  export default {
    name: 'v-select',
    props: {
      enter: {
        type: Boolean,
        default: false
      },
      options: {
        required: true,
        default: [],
        type: Array
      },
      showLabel: {
        default: defaultLabels.show,
        type: String
      },
      selectedLabel: {
        default: defaultLabels.selected,
        type: String
      },
      disabledLabel: {
        default: defaultLabels.disabled,
        type: String
      },
      multi: {
        default: false,
        type: Boolean
      },
      placeholder: {
        type: [String, Object],
        default: '请选择'
      },
      value: {},
      required: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      abort: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      options (val) {
        this.list = encodeOptions(val, this.selectedLabel, this.disabledLabel, this.$set)
      },
      list: {
        handler (val) {
          this.setSelected(val)
        },
        deep: true
      },
      selected (val) {
        this.$emit('input', val)
      }
    },
    computed: {
      selectedList () {
        const result = []

        this.list.forEach((option) => {
          if (option[this.selectedLabel]) {
            result.push(option)
          }
        })

        return result
      },
      haveSelected () {
        const temp = this.selected
        return temp // eslint-disable-line
          ? this.multi
            ? Array.isArray(temp) && temp.length
            : !!temp
          : false
      }
    },
    data () {
      return {
        show: false,
        list: encodeOptions(this.options, this.selectedLabel, this.disabledLabel, this.$set),
        selected: undefined,
        input: ''
      }
    },
    methods: {
      decodeOption (option) {
        if (option.__isObj__) {
          const temp = {}
          Object.keys(option).forEach((key) => {
            if (option.hasOwnProperty(key) && privateKeys.indexOf(key) === -1) {
              temp[key] = option[key]
            }
          })
          return temp
        }
        return option[this.showLabel]
      },
      setSelected (options) {
        const result = []
        options.forEach((item) => {
          if (item[this.selectedLabel]) {
            result.push(this.decodeOption(item))
          }
        })
        this.selected = this.multi ? result : result[0]
      },
      submitEvent (isEnter) {
        let badges = this.selected
        if (badges && typeof badges !== 'string') {
          const result = []
          const isArray = Array.isArray(badges)
          if (!isArray) {
            badges = [badges]
          }
          badges.forEach((option) => {
            if (typeof item !== 'string') {
              const temp = {}
              Object.keys(option).forEach((key) => {
                if (option.hasOwnProperty(key) && privateKeys.indexOf(key) === -1) {
                  temp[key] = option[key]
                }
              })
              result.push(temp)
            } else {
              result.push(option)
            }
          })
          badges = isArray ? result : result[0]
        }
        if (isEnter) {
          this.$emit('submit', {
            badge: badges,
            value: this.input
          })
        } else {
          this.$emit('submit', badges)
        }
      },
      hackOptionsEncode () {
        // 如果 options 没有设置 selected-label，那么即使 v-model 是有值的，list 也不会处于选中状态，因此要根据 value 来 hack
        if (this.value === undefined || this.value === '') {
          return
        }
        const isStr = typeof this.value === 'string'
        this.list.forEach((item, index) => {
          if (Array.isArray(this.value)) {
            this.value.forEach((value) => {
              if (item[this.showLabel] === (typeof value === 'string' ? value : value[this.showLabel])) {
                this.list[index][this.selectedLabel] = true
              }
            })
          } else if (item[this.showLabel] === (isStr ? this.value : this.value[this.showLabel])) {
            this.list[index][this.selectedLabel] = true
          }
        })
      },
      handleTextAreaFocus () {
        if (this.disabled) {
          return
        }
        if (!this.list.length) {
          return
        }
        if (this.enter) {
          this.show = true
        } else {
          this.show = !this.show
        }
      },
      handleSubmitClick () {
        if (this.disabled) {
          return
        }
        if (this.enter) {
          this.submitEvent(true)
          this.show = false
        } else {
          this.show = !this.show
        }
      },
      handleOptionClick (item) {
        if (item[this.disabledLabel]) {
          return
        }
        if (this.abort) {
          this.show = false
          this.$emit('submit', item[this.showLabel])
          return
        }
        const label = [this.selectedLabel]
        if (!this.multi) {
          this.show = false
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i][label] && this.list[i].__uuid__ !== item.__uuid__) {
              this.list[i][label] = false
            }
          }
        }
        if (this.required && item[label]) {
          if (this.multi) {
            const selected = this.selectedList
            if (selected.length === 1 && selected[0].__uuid__ === item.__uuid__) {
              return
            }
          } else if (item[label]) {
            return
          }
        }
        item[label] = !item[label]
        if (!this.enter && this.required && !this.multi && item[label]) {
          this.submitEvent(false)
        }
      },
      handleSelectedCancel (item) {
        const selected = this.selectedList
        if (this.required && selected.length === 1 && selected[0].__uuid__ === item.__uuid__) {
          return
        }
        item[this.selectedLabel] = false
      }
    },
    mounted () {
      this.setSelected(this.list, true)
      this.hackOptionsEncode()
      document.body.addEventListener('click', (e) => {
        if (!this.show) {
          return
        }
        if (!this.$refs.ul.contains(e.target)) {
          this.show = false
        }
      })
    }
  }
</script>
