import Api from '~/api/postApi';
import CommentApi from '~/api/commentApi';

const state = () => ({
    trending: {
        take: 10,
        new: {
            data: [],
            noMore: false
        },
        hot: {
            data: [],
            noMore: false
        }
    },
    show: {
        init: true,
        take: 10,
        page: 0,
        info: {
            bangumi: null,
            user: null,
            post: null
        },
        data: {
            list: [],
            noMore: false
        },
        seenIds: []
    }
});

const mutations = {
    setPost(state, data) {
        if (state.show.init) {
            state.show.info = {
                bangumi: data.bangumi,
                user: data.user,
                post: data.post
            };
            state.show.init = false;
        }
        state.show.page = state.show.page + 1;
    },
    setComment(state, { id, data }) {
        state.show.data.list.forEach((item, index) => {
            if (item.id === id) {
                state.show.data.list[index].comments.push(data);
                state.show.data.list[index].__seen_comment_ids.push(data.id);
                state.show.data.list[index].comment_count++;
            }
        });
    },
    setComments(state, { id, data }) {
        const list = state.show.data.list;
        let index = 0;
        list.forEach((post, idx) => {
            if (post.id === id) {
                index = idx;
            }
        });
        const seenIds = list[index].__seen_comment_ids;
        data.forEach(item => {
            if (seenIds.indexOf(item.id) === -1) {
                state.show.data.list[index].comments.push(item);
                state.show.data.list[index].__seen_comment_ids.push(item.id);
            }
        });
        state.show.data.list[index].__comment_page = list[index].__comment_page + 1;
    },
    delComment(state, { postId, commentId }) {
        state.show.data.list.forEach((post, index) => {
            if (post.id === postId) {
                state.show.data.list[index].comments.forEach((comment, subIndex) => {
                    if (comment.id === commentId) {
                        state.show.data.list[index].comments.splice(subIndex, 1);
                        state.show.data.list[index].comment_count--;
                    }
                });
            }
        });
    },
    setTrending(state, { data, sort }) {
        state.trending[sort] = {
            data: state.trending[sort].data.concat(data.list),
            noMore: data.noMore
        };
    },
    TOGGLE_LIKE_POST(state, { result }) {
        state.show.info.post.liked = result;
        result ? state.show.info.post.like_count++ : state.show.info.post.like_count--;
    },
    TOGGLE_LIKE_COMMENT(state, { id, result }) {
        state.show.data.list.forEach((item, index) => {
            if (item.id === id) {
                state.show.data.list[index].liked = result;
                result
                    ? state.show.data.list[index].like_count++
                    : state.show.data.list[index].like_count--;
            }
        });
    },
    TOGGLE_MARK(state, result) {
        state.show.info.post.marked = result;
        result ? state.show.info.post.mark_count++ : state.show.info.post.mark_count--;
    },
    REPLY_POST(state, data) {
        state.show.data.list.push(data);
        state.show.seenIds.push(data.id);
        state.show.info.post.comment_count++;
        state.show.data.total++;
        const images = data.images;
        if (images.length) {
            state.show.info.post.preview_images = state.show.info.post.preview_images.concat(
                images
            );
        }
    },
    followBangumi(state, result) {
        state.show.info.bangumi.followed = result;
    },
    DELETE_POST_COMMENT(state, { commentId }) {
        state.show.data.list.forEach((item, index) => {
            if (item.id === commentId) {
                state.show.data.list.splice(index, 1);
                state.show.info.post.comment_count--;
            }
        });
    }
};

const actions = {
    async getPost({ state, commit }, { id, ctx, only, reply }) {
        const api = new Api(ctx);
        const length = state.show.data.list.length;
        const data = await api.show({
            id,
            only,
            page: state.show.page,
            take: state.show.take,
            replyId: length ? null : reply
        });
        commit('setPost', data);
    },
    async getComments({ state, commit }, { id, ctx }) {
        let page = 0;
        state.show.data.list.forEach(item => {
            if (item.id === id) {
                page = item.__comment_page;
            }
        });
        const api = new CommentApi(ctx);
        const data = await api.list({
            type: 'post',
            id,
            page
        });
        data && commit('setComments', { id, data });
    },
    async setComment({ commit }, { id, targetUserId, content, ctx }) {
        const api = new CommentApi(ctx);
        const data = await api.reply({
            type: 'post',
            id,
            targetUserId,
            content
        });
        commit('setComment', { data, id });
    },
    // eslint-disable-next-line no-empty-pattern
    async create({}, params) {
        const api = new Api(params.ctx);
        const id = await api.create(params);
        return id;
    },
    async reply({ commit }, params) {
        const api = new Api(params.ctx);
        const data = await api.reply(params);
        commit('REPLY_POST', data);
    },
    // eslint-disable-next-line no-empty-pattern
    async deletePost({}, { ctx, id }) {
        const api = new Api(ctx);
        await api.deletePost(id);
    },
    async deleteComment({ commit }, { ctx, postId, commentId }) {
        const api = new CommentApi(ctx);
        await api.delete({
            type: 'post',
            id: commentId
        });
        commit('delComment', { postId, commentId });
    },
    async getTrending({ state, commit }, { sort, ctx }) {
        if (state.trending[sort].noMore) {
            return;
        }
        const api = new Api(ctx);
        const data = await api.trending({
            sort,
            take: state.trending.take,
            seenIds: state.trending[sort].data.length
                ? state.trending[sort].data.map(item => item.id).join(',')
                : null
        });
        commit('setTrending', { sort, data });
    },
    async toggleLike({ commit }, { ctx, id }) {
        const api = new Api(ctx);
        const result = await api.toggleLike(id);
        commit('TOGGLE_LIKE_POST', { result });
    },
    async toggleLikeComment({ commit }, { ctx, id }) {
        const api = new CommentApi(ctx);
        const result = await api.toggleLike({
            type: 'post',
            id
        });
        commit('TOGGLE_LIKE_COMMENT', { id, result });
    },
    async toggleMark({ commit }, { ctx, id }) {
        const api = new Api(ctx);
        const result = await api.toggleMark(id);
        commit('TOGGLE_MARK', result);
    },
    async deletePostComment({ commit }, { ctx, postId, commentId }) {
        const api = new Api(ctx);
        await api.deleteComment({ postId, commentId });
        commit('DELETE_POST_COMMENT', { commentId });
    }
};

const getters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
