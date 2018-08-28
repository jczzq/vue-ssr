<style lang="scss">
#__share-logo {
    display: none;
}
</style>

<template>
    <div id="app">
        <img id="__share-logo"
             class="share-image"
             src="https://image.calibur.tv/owner/logo-new/logo.png?imageMogr2/auto-orient/strip|imageView2/1/w/150/h/150"
             alt="logo">
        <router-view></router-view>
    </div>
</template>

<script>
import { qiniu, script, env } from 'env';

export default {
    name: 'Entry',
    head: {
        title: '天下漫友是一家',
        titleTemplate: titleChunk => {
            return titleChunk ? `${titleChunk} - calibur` : '天下漫友是一家 - calibur';
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
            { hid: 'description', name: 'description', content: '一个兴趣使然的二次元综合网站' },
            {
                hid: 'keywords',
                name: 'keywords',
                content:
                    'calibur，咖喱棒, 动漫，ACG，二次元，视频，番剧，动画，新番，神作, 排行榜, 贴吧, 盖楼, 应援, 帖子, 在线'
            }
        ],
        link: [{ rel: 'shortcut icon', type: 'image/x-icon', href: `${qiniu.host}/favicon.ico` }],
        script: [
            env !== 'development'
                ? { innerHTML: script.baiduStat, type: 'text/javascript', async: true }
                : '',
            env !== 'development'
                ? { innerHTML: script.baiduPush, type: 'text/javascript', async: true }
                : ''
        ].filter(_ => _),
        __dangerouslyDisableSanitizers: 'script'
    }
};
</script>
