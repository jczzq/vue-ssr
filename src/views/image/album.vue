<style lang="scss">
#image-album {
    background-color: #edecea;
    $banner-height: 350px;

    #banner {
        position: relative;
        width: 100%;
        overflow: hidden;
        z-index: 1;
        height: $banner-height;

        .img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            z-index: -1;
        }

        .container {
            background-color: transparent;
            margin-bottom: 0;
            height: 100%;
        }

        .panel {
            position: absolute;
            top: 100px;
            left: 0;
            color: #fff;
            min-width: 260px;
            max-width: 500px;
            background-color: rgba(30, 30, 34, 0.8);
            padding: 20px;

            h1 {
                font-size: 32px;
                font-weight: 300;
                line-height: 48px;
            }

            p {
                margin-top: 5px;
                line-height: 20px;
            }
        }

        .follow {
            position: absolute;
            right: 20%;
            top: 50%;
            transform: translateY(-50%);
        }

        .v-share {
            position: absolute;
            right: 40px;
            bottom: 10px;
        }
    }

    .container {
        background-color: #fff;
        padding: 30px 27px;
    }

    @media (min-width: 1050px) {
        .container {
            width: 936px;
            margin-bottom: 100px;
        }
    }

    nav {
        border: 1px solid #d8d8d8;
        padding: 30px 20px 0;
        margin-bottom: 20px;
    }

    .images-wrap {
        margin-bottom: 20px;

        .image-package {
            position: relative;

            .sort-btn {
                position: absolute;
                right: 20px;
                width: 50px;
                height: 50px;
                font-size: 30px;
                text-align: center;
                line-height: 50px;
                background-color: rgba(0, 0, 0, 0.3);
                color: #fff;
                opacity: 0;
                transition: 0.4s;
                box-shadow: 0 0 1pc 1px rgba(255, 255, 255, 0.2);

                &:hover {
                    background-color: rgba(0, 0, 0, 0.6);
                }
            }

            .delete-btn {
                left: 20px;
                top: 20px;
                right: auto;
            }

            .to-prev {
                top: 20px;
            }

            .to-next {
                bottom: 20px;
            }

            &:hover {
                .sort-btn {
                    opacity: 1;
                }
            }
        }
    }

    .footer {
        min-height: 260px;
        position: relative;

        .publish-time {
            font-size: 14px;
            color: #8590a6;
        }

        .v-parts {
            margin-top: 20px;
        }

        .like-panel {
            text-align: center;
            margin-bottom: 20px;
            margin-top: 50px;
        }

        .bangumi-panel {
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}
</style>

<template>
    <div id="image-album">
        <section id="banner">
            <div class="img bg"
                 :style="{ backgroundImage: `url(${$resize(info.poster, { width: 1920, mode: 0 })})` }"></div>
            <div class="container">
                <div class="panel">
                    <h1 class="title">《{{ info.name }}》</h1>
                    <p class="author">
                        UP：
                        <a :href="$alias.user(user.zone)"
                           target="_blank"
                           v-text="user.nickname"></a>
                        &nbsp;·&nbsp; 共：{{ info.image_count }}张
                    </p>
                </div>
            </div>
            <v-share type="panel"></v-share>
        </section>
        <div class="container">
            <nav>
                <h1 class="breadcrumb">
                    <a :href="$alias.index"
                       target="_blank">主站</a>
                    <a v-if="bangumi"
                       :href="$alias.bangumi(bangumi.id)"
                       target="_blank"
                       v-text="bangumi.name"></a>
                    <a href="javascript:;">{{ info.is_cartoon ? '漫画' : '相簿' }}</a>
                    {{ info.name }}
                </h1>
            </nav>
            <div class="images-wrap">
                <div class="image-package"
                     v-for="(img, idx) in images"
                     :key="img.id">
                    <v-img class="image"
                           width="500"
                           mode="2"
                           :src="img.url"
                           :aspect="$computeImageAspect(img)"></v-img>
                    <template v-if="isMine">
                        <el-tooltip placement="top"
                                    effect="dark"
                                    content="删除">
                            <button class="sort-btn delete-btn el-icon-close"
                                    @click="handleImageDelete(idx)"></button>
                        </el-tooltip>
                        <el-tooltip placement="right"
                                    effect="dark"
                                    content="上移">
                            <button class="sort-btn to-prev el-icon-caret-top"
                                    v-if="idx"
                                    @click="handleSortBtnClick(idx, false)"></button>
                        </el-tooltip>
                        <el-tooltip placement="right"
                                    effect="dark"
                                    content="下移">
                            <button class="sort-btn to-next el-icon-caret-bottom"
                                    v-if="idx !== images.length - 1"
                                    @click="handleSortBtnClick(idx, true)"></button>
                        </el-tooltip>
                    </template>
                </div>
            </div>
            <div class="footer">
                <div class="publish-time">
                    UP：
                    <a :href="$alias.user(user.zone)"
                       target="_blank"
                       v-text="user.nickname"></a>
                    &nbsp;·&nbsp;
                    <span v-if="info.updated_at === info.created_at">
                        发布于：
                        <v-time v-model="info.created_at"></v-time>
                    </span>
                    <el-tooltip placement="top"
                                effect="dark"
                                :content="`发布于：${info.created_at}`"
                                v-else>
                        <span>
                            编辑于：
                            <v-time v-model="info.updated_at"></v-time>
                        </span>
                    </el-tooltip>
                </div>
                <v-parts v-if="cartoon.length"
                         :list="cartoon"
                         :alias="$alias.imageAlbum"
                         :all-data="cartoon"
                         v-model="showAllPart">
                    <span slot-scope="{ item }"
                          v-text="item.name"></span>
                </v-parts>
                <v-bangumi-panel class="bangumi-panel"
                                 v-else-if="bangumi"
                                 :id="bangumi.id"
                                 :name="bangumi.name"
                                 :avatar="bangumi.avatar"
                                 :summary="bangumi.summary"
                                 :followed="bangumi.followed"
                                 @follow="handleFollowAction"></v-bangumi-panel>
                <div class="like-panel">
                    <el-button v-if="info.liked"
                               :type="info.is_creator ? 'warning' : 'danger'"
                               @click="handleAlbumLike"
                               round
                               plain
                               :loading="loadingFollowAlbum">
                        <i class="iconfont icon-guanzhu"></i> {{ likeAlbumBtnText }}
                    </el-button>
                    <el-button :type="info.is_creator ? 'warning' : 'danger'"
                               round
                               @click="handleAlbumLike"
                               :loading="loadingFollowAlbum"
                               v-else>
                        <i class="iconfont icon-guanzhu"></i> {{ likeAlbumBtnText }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '~/api/imageApi';
import vParts from '~/components/lists/Parts';

export default {
    name: 'image-album',
    async asyncData({ store, route, ctx }) {
        await store.dispatch('image/getAlbumData', {
            ctx,
            id: route.params.id
        });
    },
    head() {
        const category = `${this.info.is_cartoon ? '漫画' : '相簿'}`;
        return {
            title: `${this.info.name} - ${category}`,
            meta: [
                { hid: 'description', name: 'description', content: this.bangumi.summary },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `${this.info.name}，${this.bangumi.name}，${category}，${
                        this.user.nickname
                    }`
                }
            ]
        };
    },
    components: {
        vParts
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        album() {
            return this.$store.state.image.albumShow;
        },
        info() {
            return this.album.info;
        },
        images() {
            return this.album.images;
        },
        cartoon() {
            return this.album.cartoon;
        },
        previewImages() {
            return this.images.map(_ => _.url);
        },
        user() {
            return this.album.user;
        },
        bangumi() {
            return this.album.bangumi;
        },
        likeAlbumBtnText() {
            const text = this.info.is_creator
                ? this.info.liked ? '已赞赏' : '赞赏'
                : this.info.liked ? '已喜欢' : '喜欢';

            return this.info.like_count ? `${text}(${this.info.like_count})` : text;
        },
        isMine() {
            return this.$store.state.login ? this.user.id === this.$store.state.user.id : false;
        }
    },
    data() {
        return {
            loadingFollowAlbum: false,
            loadingEditImages: false,
            showAllPart: false
        };
    },
    methods: {
        handleFollowAction(result) {
            this.$store.commit('image/FOLLOW_ALBUM_BANGUMI', { result });
        },
        async handleAlbumLike() {
            if (!this.$store.state.login) {
                this.$channel.$emit('sign-in');
                return;
            }
            if (this.isMine) {
                this.$toast.info('不能为自己的相簿点赞');
                return;
            }
            if (this.loadingFollowAlbum) {
                return;
            }
            this.loadingFollowAlbum = true;
            if (this.info.is_creator && !this.info.liked) {
                this.$confirm('原创相簿点赞需要金币, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.submitLikeRequest();
                    })
                    .catch(() => {});
                return;
            }
            this.submitLikeRequest();
        },
        async submitLikeRequest() {
            const api = new Api(this);
            try {
                const result = await api.toggleLike({
                    id: this.id
                });
                this.$store.commit('image/ALBUM_LIKE', { result });
                this.$toast.success('操作成功');
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.loadingFollowAlbum = false;
            }
        },
        async handleSortBtnClick(index, toNext) {
            if (this.loadingEditImages) {
                this.$toast.error('正在操作，请稍候...');
                return;
            }
            this.loadingEditImages = true;
            try {
                await this.$store.dispatch('image/sortAlbumImage', {
                    prev: toNext ? index : index - 1,
                    next: toNext ? index + 1 : index,
                    ctx: this,
                    id: this.id
                });
                this.$toast.success('操作成功');
            } catch (e) {
                this.$toast.error(e);
            } finally {
                this.loadingEditImages = false;
            }
        },
        handleImageDelete(index) {
            if (this.loadingEditImages) {
                this.$toast.error('正在操作，请稍候...');
                return;
            }
            this.$confirm('删除后无法找回, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    this.loadingEditImages = true;
                    try {
                        await this.$store.dispatch('image/deleteAlbumImage', {
                            index,
                            ctx: this,
                            id: this.id
                        });
                    } catch (e) {
                        this.$toast.error(e);
                    } finally {
                        this.loadingEditImages = false;
                    }
                })
                .catch(e => {});
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
