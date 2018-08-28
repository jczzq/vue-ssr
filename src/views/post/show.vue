<style lang="scss">
#post-show {
    .title-wrap {
        height: 56px;
        border-bottom: 1px solid #bbbdbf;

        h1 {
            font-weight: 400;
            font-size: 16px;
            margin-left: 20px;
            line-height: 55px;
            overflow: hidden;
        }

        .control {
            float: right;
            line-height: 55px;
            margin-left: 15px;

            .floor {
                font-size: 12px;
                color: #5a5e66;
                margin-left: 10px;
            }
        }
    }

    .post-main {
        .user {
            width: 180px;
            float: left;

            .avatar {
                display: block;
                margin: 20px auto 5px auto;
                border: 1px solid $color-gray-normal;
                @include avatar(80px);
            }

            .nickname {
                display: block;
                background: #fff;
                width: 98px;
                height: 28px;
                line-height: 24px;
                margin: 0 auto;
                text-align: center;
            }
        }

        .content {
            background: #fff;
            padding: 22px 0 14px;
            border-top: 1px solid #e5e9ef;
            overflow: hidden;

            .main {
                min-height: 80px;
            }

            .image {
                width: 100%;
                height: auto;
                margin-bottom: 12px;
                cursor: zoom-in;
            }

            .text-area {
                line-height: 24px;
                padding: 2px 0;
                font-size: 14px;
                overflow: hidden;
                word-wrap: break-word;
            }

            .likes-wrap {
                text-align: center;
                margin: 50px 0;
            }

            .footer {
                color: #99a2aa;
                line-height: 26px;
                font-size: 12px;

                .info-bar {
                    height: 40px;
                    line-height: 40px;

                    .delete-btn,
                    .floor-count,
                    .like-btn {
                        margin-right: 20px;
                    }

                    .v-share {
                        float: right;
                    }
                }
            }
        }
    }

    .load-post-btn {
        margin-top: 20px;
        margin-bottom: 20px;
        width: 100%;
    }

    .col-aside {
        padding: 20px;

        .bangumi-panel {
            margin-top: 30px;
            margin-left: 30px;
        }
    }

    .create-post-form {
        margin-left: -50px;

        button {
            width: 100%;
        }
    }

    #comment-wrap {
        .sub-comment-list-wrap {
            background-color: #f7f8fa;
            position: relative;
            margin-left: 180px;

            .sub-comment-list {
            }

            .comments {
                padding: 4px 15px;

                li {
                    display: block;
                    width: 100%;
                }

                .avatar {
                    @include avatar(32px);
                }
            }

            .comment-reply-area {
                padding: 0 15px 10px;
                height: 45px;
                line-height: 35px;

                .open-comment {
                    float: right;
                    font-size: 13px;
                    margin-top: 10px;
                }

                .total {
                    margin-left: 10px;
                }
            }
        }

        #comment-list-footer {
            margin-left: 180px;
            margin-right: 5px;
        }
    }
}
</style>

<template>
    <div id="post-show">
        <v-banner></v-banner>
        <div class="container">
            <aside class="col-aside">
                <v-bangumi-panel class="bangumi-panel"
                                 :id="bangumi.id"
                                 :avatar="bangumi.avatar"
                                 :name="bangumi.name"
                                 :followed="bangumi.followed"
                                 :summary="bangumi.summary"
                                 @follow="handleBangumiFollow"></v-bangumi-panel>
            </aside>
            <section class="col-main clearfix">
                <header>
                    <div class="title-wrap">
                        <div class="control">
                            <el-button size="mini"
                                       plain
                                       @click="switchOnlyMaster">{{ onlySeeMaster ? '取消只看楼主' : '只看楼主' }}</el-button>
                            <el-button size="mini"
                                       plain
                                       @click="scrollToReplyForm">回复</el-button>
                            <el-button size="mini"
                                       plain
                                       v-if="isMaster"
                                       @click="deletePost">删除</el-button>
                            <span class="floor">共{{ total }}条</span>
                        </div>
                        <h1 class="oneline"
                            v-text="post.title"></h1>
                    </div>
                </header>
                <main>
                    <el-row class="post-main">
                        <div class="user">
                            <a :href="$alias.user(master.zone)"
                               target="_blank">
                                <v-img class="avatar"
                                       :src="master.avatar"
                                       :width="80"
                                       :height="80"></v-img>
                            </a>
                            <a class="nickname oneline"
                               :href="$alias.user(master.zone)"
                               target="_blank"
                               v-text="master.nickname"></a>
                        </div>
                        <div class="content">
                            <div class="image-package"
                                 v-for="(img, idx) in post.images"
                                 :key="idx"
                                 @click="$previewImages(post.images, idx)">
                                <v-img class="image"
                                       :src="img.url"
                                       width="350"
                                       mode="2"
                                       :aspect="$computeImageAspect(img)"></v-img>
                            </div>
                            <div class="text-area"
                                 v-html="post.content"></div>
                            <div class="likes-wrap">
                                <el-button type="danger"
                                           @click="toggleLike"
                                           :loading="loadingToggleLike"
                                           v-if="post.liked"
                                           round
                                           plain>
                                    <i class="iconfont icon-guanzhu"></i> 已喜欢({{ post.like_count }})
                                </el-button>
                                <el-button type="danger"
                                           @click="toggleLike"
                                           :loading="loadingToggleLike"
                                           round
                                           v-else>
                                    <i class="iconfont icon-guanzhu"></i> 喜欢{{ post.like_count ? `(${post.like_count})` : '' }}
                                </el-button>
                                <el-button type="warning"
                                           @click="toggleMark"
                                           :loading="loadingToggleMark"
                                           v-if="post.marked"
                                           round
                                           plain>
                                    <i class="iconfont icon-buoumaotubiao44"></i> 已收藏({{ post.mark_count }})
                                </el-button>
                                <el-button type="warning"
                                           @click="toggleMark"
                                           :loading="loadingToggleMark"
                                           round
                                           v-else>
                                    <i class="iconfont icon-buoumaotubiao44"></i> 收藏{{ post.mark_count ? `(${post.mark_count})` : '' }}
                                </el-button>
                            </div>
                            <div class="footer">
                                <div class="info-bar">
                                    <span class="floor-count">1楼</span>
                                    <v-time v-model="post.created_at"></v-time>
                                    <v-share type="panel"
                                             :desc="post.desc"></v-share>
                                </div>
                            </div>
                        </div>
                    </el-row>
                    <comment-main type="post"
                                  :id="post.id"
                                  :only-see-master="onlySeeMaster">
                        <post-comment-item slot="comment-item"
                                           slot-scope="{ comment }"
                                           :post="comment"
                                           :master-id="master.id"></post-comment-item>
                        <post-sub-comment-list slot="sub-comment-list"
                                               slot-scope="{ parentComment }"
                                               :parent-comment="parentComment"></post-sub-comment-list>
                        <create-comment-form id="post-reply-form"
                                             slot="footer"
                                             slot-scope="{ reply }"
                                             type="post"
                                             :with-image="true"
                                             @submit="reply"></create-comment-form>
                    </comment-main>
                </main>
            </section>
        </div>
    </div>
</template>

<script>
import CommentMain from '~/components/comments/CommentMain';
import PostCommentItem from '~/components/post/PostCommentItem';
import PostSubCommentList from '~/components/post/PostSubCommentList';
import CreateCommentForm from '~/components/forms/CreateCommentForm';

export default {
    name: 'post-show',
    async asyncData({ route, store, ctx }) {
        const only = route.query.only ? (parseInt(route.query.only, 10) ? 1 : 0) : 0;
        const id = route.params.id;
        await Promise.all([
            store.dispatch('post/getPost', {
                id,
                ctx,
                only
            }),
            store.dispatch('comment/getMainComments', {
                ctx,
                id,
                type: 'post',
                onlySeeMaster: only,
                seeReplyId: route.query.reply
            })
        ]);
    },
    components: {
        CommentMain,
        PostCommentItem,
        PostSubCommentList,
        CreateCommentForm
    },
    head() {
        return {
            title: `${this.post.title} - 帖子`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.$utils.truncate(this.post.content)
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `calibur,帖子,天下漫友是一家,${this.post.title},${this.bangumi.name}`
                }
            ]
        };
    },
    computed: {
        resource() {
            return this.$store.state.post.show;
        },
        list() {
            return this.$utils.orderBy(this.$store.state.comment.list, 'floor_count');
        },
        noMore() {
            return this.resource.data.noMore;
        },
        bangumi() {
            return this.resource.info.bangumi;
        },
        post() {
            return this.resource.info.post;
        },
        total() {
            return this.$store.state.comment.total + 1;
        },
        master() {
            return this.resource.info.user;
        },
        masterId() {
            return this.master.id;
        },
        onlySeeMaster() {
            return !!parseInt(this.$route.query.only, 10);
        },
        isMaster() {
            if (!this.$store.state.login) {
                return false;
            }
            const currentUserId = this.$store.state.user.id;
            return currentUserId === this.masterId;
        }
    },
    data() {
        return {
            loadingLoadMore: false,
            loadingToggleLike: false,
            loadingToggleMark: false
        };
    },
    methods: {
        scrollToReplyForm() {
            this.$scrollToY(document.getElementById('post-reply-form').offsetTop, 400);
        },
        switchOnlyMaster() {
            window.location = this.$alias.post(this.post.id, {
                only: this.onlySeeMaster ? 0 : 1
            });
        },
        deletePost() {
            this.$confirm('删除后无法找回, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    await this.$store.dispatch('post/deletePost', {
                        ctx: this,
                        id: this.post.id
                    });
                    window.location = this.$alias.bangumi(this.bangumi.id);
                })
                .catch(e => {
                    this.$toast.error(e);
                });
        },
        deletePostComment(id) {
            this.$confirm('删除后无法找回, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    await this.$store.dispatch('post/deletePostComment', {
                        ctx: this,
                        postId: this.post.id,
                        commentId: id
                    });
                    this.$toast.success('删除成功');
                })
                .catch(e => {
                    this.$toast.error(e);
                });
        },
        async toggleLike() {
            if (!this.$store.state.login) {
                this.$channel.$emit('sign-in');
                return;
            }
            if (this.isMaster) {
                this.$toast.info('不能赞赏自己的帖子');
                return;
            }
            if (this.loadingToggleLike) {
                return;
            }
            this.loadingToggleLike = true;
            try {
                const result = await this.$store.dispatch('post/toggleLike', {
                    ctx: this,
                    id: this.post.id
                });
                if (result) {
                    this.$store.commit('USE_COIN');
                }
            } catch (err) {
                this.$toast.error(err);
            } finally {
                this.loadingToggleLike = false;
            }
        },
        async toggleMark() {
            if (!this.$store.state.login) {
                this.$channel.$emit('sign-in');
                return;
            }
            if (this.isMaster) {
                this.$toast.info('不能收藏自己的帖子');
                return;
            }
            if (this.loadingToggleMark) {
                return;
            }
            this.loadingToggleMark = true;
            try {
                await this.$store.dispatch('post/toggleMark', {
                    ctx: this,
                    id: this.post.id
                });
            } catch (err) {
                this.$toast.error(err);
            } finally {
                this.loadingToggleMark = false;
            }
        },
        scrollToReply() {
            const replyId = this.$route.query.reply;
            if (!replyId) {
                return;
            }
            const reply = document.getElementById(`post-reply-${replyId}`);
            if (!reply) {
                return;
            }
            this.$nextTick(() => {
                this.$scrollToY(reply.offsetTop, 400);
            });
        },
        handleBangumiFollow(result) {
            this.$store.commit('post/followBangumi', result);
        }
    },
    mounted() {
        this.scrollToReply();
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
