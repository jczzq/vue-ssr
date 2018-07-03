import Vue from 'vue'
import env from 'env'
import Alias from '~/assets/js/alias'
import Utils from '~/assets/js/utils'
import ImageLazy from '~/assets/js/imagelazy'
import NoSSR from '~/assets/js/nossr'
import Modal from '~/components/Modal'
import Banner from '~/components/layouts/Banner'
import Time from '~/assets/js/timeago'
import BangumiPanel from '~/components/panels/BangumiPanel'
import NoContent from '~/components/NoContent'
import Hr from '~/components/base/Hr'
import Share from '~/components/base/Share'

import {
  InfiniteScroll
} from 'mint-ui'

import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tabs,
  TabPane,
  Tag,
  Form,
  FormItem,
  Input,
  Button,
  DatePicker,
  Switch,
  Alert,
  Row,
  Col,
  Checkbox,
  Radio,
  RadioGroup,
  RadioButton,
  Tooltip,
  Select,
  Option,
  OptionGroup,
  Upload,
  Pagination,
  Carousel,
  CarouselItem,
  Badge,
  Popover
} from 'element-ui'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Alert)
Vue.use(Col)
Vue.use(Row)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(InfiniteScroll)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Badge)
Vue.use(Popover)
Vue.component(ImageLazy.name, ImageLazy)
Vue.component(Share.name, Share)
Vue.component(Modal.name, Modal)
Vue.component(NoSSR.name, NoSSR)
Vue.component(Banner.name, Banner)
Vue.component(Time.name, Time)
Vue.component(BangumiPanel.name, BangumiPanel)
Vue.component(NoContent.name, NoContent)
Vue.component(Hr.name, Hr)
Vue.component(Share.name, Share)

Vue.use({
  install (Vue, options) {
    Vue.prototype.$utils = Utils

    Vue.prototype.$cdn = env.cdn

    Vue.prototype.$channel = new Vue()

    Vue.prototype.$alias = Alias

    Vue.prototype.$resize = (url, options = {}) => {
      if (!url) {
        return ''
      }

      if (/imageMogr2/.test(url)) {
        return url
      }

      const link = /^http/.test(url) ? url : `${env.cdn.image}${url}`
      const canUseWebP = () => {
        if (Vue.prototype.$isServer) {
          return false
        }
        if (window.supportWebP !== undefined) {
          return window.supportWebP
        }

        const elem = document.createElement('canvas')

        if (elem.getContext && elem.getContext('2d')) {
          const support = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
          window.supportWebP = support
          return support
        }

        return false
      }

      const format = canUseWebP() ? '/format/webp' : ''
      const mode = options.mode === undefined ? 1 : options.mode

      if ((mode === 1 && !options.width) || (!options.width && !options.height)) {
        return `${link}?imageMogr2/auto-orient/strip${format}`
      }

      let width
      let height

      if (mode === 1) {
        width = `/w/${options.width}`
        height = options.height ? `/h/${options.height}` : `/h/${options.width}`
      } else {
        width = options.width ? `/w/${options.width}` : ''
        height = options.height ? `/h/${options.height}` : ''
      }

      return `${link}?imageMogr2/auto-orient/strip|imageView2/${mode}${width}${height}${format}`
    }
  }
})

Vue.mixin({
  methods: {
    $computeImageAspect (image) {
      const width = image.width
      const height = image.height

      if (!width || !height) {
        return 0
      }

      return height / width
    }
  }
})
