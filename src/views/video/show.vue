<style lang="scss">
#video-show {
    $meta-height: 30px;
    $meta-margin-bottom: 8px;

    #video-metas {
        margin-bottom: 20px;
        overflow: hidden;
        position: relative;
        min-height: 30px;

        .season-title {
            padding-bottom: 10px;
            margin-left: 10px;
        }
    }

    .video-placeholder {
        height: 600px;
        background-color: #000;
    }

    .video-info {
        margin-top: 30px;
    }

    .bangumi-panel {
        float: left;
    }

    .v-share {
        height: 40px;
        float: right;
    }

    .video-report {
        float: right;
        margin-right: 15px;
        margin-top: 2px;
    }
}
</style>

<template>
    <div id="video-show"
         class="main">
        <v-banner></v-banner>
        <div class="container">
            <nav>
                <h1 class="breadcrumb"
                    v-if="bangumi && video">
                    <a :href="$alias.index"
                       target="_blank">主站</a>
                    <a :href="$alias.bangumi(bangumi.id)"
                       target="_blank"
                       v-text="bangumi.name"></a>
                    第{{ video.part }}话&nbsp;{{ video.name }}
                </h1>
            </nav>
            <div id="video-metas">
                <template v-if="season && showAll">
                    <div v-for="(items, idx) in list" :key="idx">
                        <h6 class="season-title"
                            v-text="season.name[idx]"></h6>
                        <v-part :list="items.data"
                                :alias="$alias.video"
                                :is-first="idx === 0"
                                :force-all="true"
                                :all-data="videos"
                                v-model="showAll">
                            <template slot-scope="{ item }">
                                <span>{{ item.part - items.base }}</span>{{ item.name }}
                            </template>
                        </v-part>
                    </div>
                </template>
                <v-part :list="videos"
                        :all-data="videos"
                        :alias="$alias.video"
                        v-model="showAll"
                        v-else>
                    <template slot-scope="{ item }">
                        <span>{{ item.part }}</span>{{ item.name }}
                    </template>
                </v-part>
            </div>
            <no-ssr class="video-placeholder">
                <v-video :source="computeVideoSrc"
                         :other-src="useOtherSiteSource"
                         :video="`${bangumi.name} 第 ${video.part} 话 ${video.name}`"
                         :poster="$resize(video.poster)"
                         :next="nextPartVideo"
                         @playing="handlePlaying"></v-video>
            </no-ssr>
            <div class="clearfix video-info">
                <v-bangumi-panel class="bangumi-panel"
                                 :id="bangumi.id"
                                 :name="bangumi.name"
                                 :avatar="bangumi.avatar"
                                 :summary="bangumi.summary"
                                 :followed="bangumi.followed"
                                 @follow="handleFollowAction"></v-bangumi-panel>
                <v-share type="panel"></v-share>
                <el-button type="warning"
                           size="medium"
                           class="video-report"
                           round
                           @click="handleVideoReportClick">资源报错</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import vVideo from '~/components/Video';
import VideoApi from '~/api/videoApi';
import vPart from '~/components/lists/Parts';

export default {
    name: 'video-show',
    head() {
        return {
            title: `${this.bangumi.name} : 第${this.video.part}话 ${this.video.name} - 视频`,
            meta: [
                { hid: 'description', name: 'description', content: this.bangumi.summary },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `${this.bangumi.name}，第${this.video.part}话，${
                        this.video.name
                    }，在线观看 动画片大全 动漫在线播放 日本动漫 好看的动漫 二次元网站`
                }
            ]
        };
    },
    components: {
        vVideo,
        vPart
    },
    async asyncData({ route, store, ctx }) {
        await store.dispatch('video/getShow', {
            id: route.params.id,
            ctx
        });
    },
    computed: {
        id() {
            return parseInt(this.$route.params.id, 10);
        },
        videoPackage() {
            return this.$store.state.video;
        },
        video() {
            return this.videoPackage.info;
        },
        list() {
            return this.videoPackage.list.videos;
        },
        videos() {
            if (!this.season) {
                return this.list;
            }
            let result = [];
            this.list.forEach(videos => {
                result = result.concat(videos.data);
            });
            return result;
        },
        bangumi() {
            return this.videoPackage.bangumi;
        },
        season() {
            return this.$store.state.video.season;
        },
        nextPartVideo() {
            let lastId = 0;
            if (this.season) {
                let videos = [];
                this.list.forEach(season => {
                    videos = videos.concat(season.data);
                });
                lastId = videos[videos.length - 1].id;
            } else {
                lastId = this.list[this.list.length - 1].id;
            }
            if (lastId === this.id) {
                return '';
            }
            let nextId = 0;
            if (this.season) {
                this.list.forEach(season => {
                    season.data.forEach(part => {
                        if (part.id === this.id + 1) {
                            nextId = part.id;
                        }
                    });
                });
            } else {
                this.list.forEach(part => {
                    if (part.id === this.id + 1) {
                        nextId = part.id;
                    }
                });
            }
            if (!nextId) {
                return '';
            }
            return `/video/${nextId}`;
        },
        useOtherSiteSource() {
            if (this.bangumi.others_site_video) {
                return true;
            }
            const resource = this.video.resource;
            if (!resource) {
                return true;
            }
            return !(
                (resource.video[720] && resource.video[720].src) ||
                (resource.video[1080] && resource.video[1080].src)
            );
        },
        computeVideoSrc() {
            const video = this.video;
            return this.useOtherSiteSource
                ? video.url
                : video.resource
                    ? (video.resource.video[720] && video.resource.video[720].src) ||
                      (video.resource.video[1080] && video.resource.video[1080].src) ||
                      video.url
                    : video.url;
        }
    },
    data() {
        return {
            showAll: false,
            firstPlay: true
        };
    },
    methods: {
        handlePlaying() {
            if (this.firstPlay) {
                this.firstPlay = false;
                const api = new VideoApi(this);
                api.playing(this.id);
            }
        },
        handleVideoReportClick() {
            this.$channel.$emit('open-feedback', {
                type: 4,
                desc: `【PC】-《${this.bangumi.name}》视频有错误，视频 id：${this.id}：错误详情为：`
            });
        },
        handleFollowAction(result) {
            this.$store.commit('video/FOLLOW_ALBUM_BANGUMI', { result });
        }
    },
    mounted() {
        this.$channel.$on('get-page-bangumi-for-post-create', () => {
            this.$channel.$emit('set-page-bangumi-for-post-create', {
                id: this.bangumi.id,
                name: this.bangumi.name,
                avatar: this.bangumi.avatar
            });
        });
    }
};
</script>
