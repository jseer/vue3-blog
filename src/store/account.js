import { queryUser, updateUser } from '@/api'
export default {
    namespaced: true,
    state: {
        userList: [],
        userTotal: 0,
    },
    mutations: {
        setUserList(state, { list, total }) {
            state.userList = list;
            state.userTotal = total;
        }
    },
    actions: {
        async queryUser({commit}, payload) {
            const { list, total } = await queryUser(payload);
            commit('setUserList', { list, total })
        },
        async updateUser({commit}, payload) {
            await updateUser(payload);
        }
    }
}