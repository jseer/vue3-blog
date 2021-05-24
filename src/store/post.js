import { createPost, getPost, queryPost, updatePost, publishPost, deletePost } from '@/api'
export default {
    namespaced: true,
    state: {
        postList: [],
        postTotal: 0,
    },
    mutations: {
        setPostList(state, { list, total }) {
            state.postList = list;
            state.postTotal = total;
        }
    },
    actions: {
        async create(_, payload) {
            await createPost(payload);
        },
        async query({commit}, payload) {
            const {list, total} = await queryPost(payload);
            commit('setPostList', {list, total})
        },
        async get({commit}, payload) {
            return getPost(payload);
        },
        async update({commit}, payload) {
            return updatePost(payload);
        },
        async delete(_, payload) {
            return deletePost(payload);
        },
        async publish(_, payload) {
            return publishPost(payload);
        },
    }
}