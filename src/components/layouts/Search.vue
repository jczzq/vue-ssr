<style lang="scss">
  .search-box {
    position: relative;
    line-height: 1;

    .search-ctx {
      border: 0;
      height: 100%;
      vertical-align: middle;

      &:focus {
        &~.search-history {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    .search-btn {
      vertical-align: middle;
    }

    .search-history {
      position: absolute;
      right: 0;
      top: 120%;
      height: 192px;
      width: 267px;
      background-color: $color-white;
      border: 1px solid $color-gray-normal;
      opacity: 0;
      visibility: hidden;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.16) 0 2px 4px;
      font-size: 12px;
      padding-bottom: 5px;

      &:hover {
        opacity: 1;
        visibility: visible;
      }

      .hr {
        margin: 0 20px;
      }

      ul {
        li {
          height: 30px;
          width: 100%;
          position: relative;

          &:hover {
            background-color: $color-gray-normal;
          }

          a {
            padding: 5px 40px 5px 10px;
            line-height: 20px;
            display: block;
          }

          .del {
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            width: 30px;
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            text-align: center;
            cursor: pointer;

            &:hover {
              color: $color-blue-normal;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="search-box">
    <input class="search-ctx"
           type="search"
           autocomplete="off"
           spellcheck="false"
           v-model.trim="keywords"
           @keydown.enter="query()"
           :placeholder="placeholder"
           :autofocus="auto">
    <button class="search-btn" @click="query()"></button>
    <div class="search-history" v-if="history && list.length">
      <v-hr text="历史搜索"></v-hr>
      <ul>
        <li v-for="item in list">
          <a class="oneline" v-text="item" @click="query(item)"></a>
          <span class="del" @click.stop="del(item)">&times;</span>
        </li>
      </ul>
    </div>
    <div class="search-suggest" v-if="suggest"></div>
  </div>
</template>

<script>
  import SearchApi from '~/api/searchApi'

  export default {
    name: 'v-search',
    props: {
      placeholder: {
        default: '搜索二次元的一切'
      },
      auto: {
        type: Boolean,
        default: false
      },
      history: {
        type: Boolean,
        default: false
      },
      suggest: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        keywords: '',
        list: [],
        cacheKey: 'search-history',
        maxLen: 5
      }
    },
    mounted () {
      this.list = this.get()
    },
    methods: {
      query (words) {
        const q = words || this.keywords
        if (!q.length) {
          return
        }
        const api = new SearchApi()
        const searchWindow = window.open()
        api.index({ q }).then((data) => {
          if (data) {
            this.set(q)
            searchWindow.location = data
          } else {
            searchWindow.location = '/bangumi/news?from=search'
          }
        }).catch(() => {
          searchWindow.location = '/bangumi/news?from=search'
        })
      },
      set (q) {
        setTimeout(() => {
          const list = this.get()
          const index = list.indexOf(q)
          if (index !== -1) {
            list.splice(index, 1)
          }
          list.unshift(q)
          if (list.length > this.maxLen) {
            list.pop()
          }
          this.list = list
          try {
            localStorage.setItem(this.cacheKey, JSON.stringify(list))
          } catch (e) {}
        }, 0)
      },
      get () {
        try {
          return JSON.parse(localStorage.getItem(this.cacheKey)) || []
        } catch (e) {
          return []
        }
      },
      clear () {
        try {
          localStorage.removeItem(this.cacheKey)
        } catch (e) {}
      },
      del (q) {
        const list = this.get()
        const index = list.indexOf(q)
        list.splice(index, 1)
        try {
          localStorage.setItem(this.cacheKey, JSON.stringify(list))
        } catch (e) {}
        this.list.splice(index, 1)
      }
    }
  }
</script>
