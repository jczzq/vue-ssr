import Api from '~/api/videoApi';

export default {
    namespaced: true,
    state: () => ({
        bangumi: null,
        info: null,
        list: null,
        season: null
    }),
    mutations: {
        SET_DATA(state, data) {
            state.list = data.list;
            state.info = data.info;
            state.bangumi = data.bangumi;
            state.season = data.season;
        },
        FOLLOW_ALBUM_BANGUMI(state, { result }) {
            state.bangumi.followed = result;
        }
    },
    actions: {
        async getShow({ commit }, { id, ctx }) {
            const api = new Api(ctx);
            const data = await api.getShow(id);
            commit('SET_DATA', data);
        }
    },
    getters: {}
};
