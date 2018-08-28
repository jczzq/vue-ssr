<style lang="scss">
#bangumi-news {
    $time-size: 30px;
    .subtitle {
        margin-left: $time-size / 2;
    }

    .col-main {
        margin-left: 15px;
    }

    .el-tabs {
        padding-left: $time-size / 2;

        .el-tabs__nav {
            width: 100%;
            display: flex;
            flex-direction: row;
            text-align: center;

            .el-tabs__item {
                flex: 1;
            }
        }
    }

    .bangumi {
        width: 195px;
        margin: 0 10px 20px 0;
        float: left;

        figure {
            position: relative;

            > a {
                margin-right: 8px;
                width: 65px;
                height: 65px;
                display: block;
                float: left;
                position: relative;
                z-index: 1;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            figcaption {
                padding: 5px 0 5px 73px;
                z-index: 0;
                font-size: 12px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .name {
                    @include twoline(13px);
                }

                span {
                    color: $color-text-light;
                    line-height: 18px;

                    .part {
                        border-radius: 9px;
                        color: $color-white;
                        text-align: center;
                        padding: 0 4px;
                        height: 18px;
                        min-width: 36px;
                        max-width: 50px;
                        margin-left: 5px;
                        display: inline-block;
                        vertical-align: top;

                        &.new {
                            background-color: $color-pink-normal;
                        }

                        &.old {
                            background-color: $color-dark-light;
                        }
                    }
                }
            }
        }
    }
}
</style>

<template>
    <div id="bangumi-news">
        <v-banner></v-banner>
        <div class="container">
            <aside class="col-aside"></aside>
            <div class="col-main">
                <div class="breadcrumb-links">
                    <router-link :to="$alias.bangumiNews">新番放送</router-link>
                    <router-link :to="$alias.bangumiTimeline">时间轴</router-link>
                    <router-link :to="$alias.bangumiTag()">分类索引</router-link>
                </div>
                <h2 class="subtitle">新番放送表</h2>
                <el-tabs v-model="thisWeek">
                    <el-tab-pane v-for="(tab, index) in showtime"
                                 :key="index"
                                 :name="tab"
                                 :label="tab">
                        <ul v-if="released[index] && released[index].length">
                            <li v-for="item in released[index]"
                                class="bangumi"
                                :key="item.id">
                                <figure class="clearfix">
                                    <a target="_blank"
                                       :href="$alias.bangumi(item.id)">
                                        <img class="face"
                                             :src="$resize(item.avatar, { width: 180 })"
                                             :alt="item.name">
                                    </a>
                                    <figcaption class="abs">
                                        <a :href="$alias.bangumi(item.id)"
                                           class="name href-fade-blue"
                                           target="_blank"
                                           v-text="item.name"></a>
                                        <span>
                                            更新至
                                            <a v-if="item.released_video_id"
                                               :class="[item.update ? 'new' : 'old']"
                                               :href="$alias.video(item.released_video_id)"
                                               target="_blank"
                                               class="part oneline">
                                                {{ item.end ? '已完结' : `${item.released_part}话` }}
                                            </a>
                                            <strong class="part oneline"
                                                    :class="[item.update ? 'new' : 'old']"
                                                    v-else>
                                                {{ item.end ? '已完结' : `${item.released_part}话` }}
                                            </strong>
                                        </span>
                                    </figcaption>
                                </figure>
                            </li>
                        </ul>
                        <no-content v-else>
                            <el-button @click="openFeedbackForResource"
                                       type="primary"
                                       round>求资源</el-button>
                        </no-content>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
const weeklys = ['最新', '一', '二', '三', '四', '五', '六', '日'];

export default {
    name: 'bangumi-news',
    head: {
        title: '新番放送 - 番剧'
    },
    async asyncData({ store, ctx }) {
        await store.dispatch('bangumi/getReleased', ctx);
    },
    computed: {
        released() {
            return this.$store.state.bangumi.released;
        }
    },
    data() {
        return {
            showtime: weeklys,
            thisWeek: weeklys[new Date().getDay() || 7]
        };
    },
    methods: {
        openFeedbackForResource() {
            this.$channel.$emit('open-feedback', {
                type: 5,
                desc: '我想看新番：'
            });
        }
    },
    mounted() {
        if (this.$route.query.from === 'search') {
            this.$toast.info('您搜索的资源未被收录');
        }
    }
};
</script>
