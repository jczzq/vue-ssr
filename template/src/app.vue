<style lang="scss">
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Entry',
  head: {
    title: 'Hi',
    titleTemplate: title => {
      return `${title || 'Hi'} - pulse`;
    },
    htmlAttrs: {
      lang: 'zh-CN'
    },
    bodyAttrs: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'force-rendering', content: 'webkit' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'pulse'
      }
    ],
    link: [{ rel: 'shortcut icon', type: 'image/x-icon', href: `/favicon.ico` }],
    script: [].filter(_ => _),
    __dangerouslyDisableSanitizers: 'script'
  }
};
</script>
