import { createStore } from 'vuex';
import { login, register, getUser, logout } from '@/api';
import account from './account';
import post from './post';

export default createStore({
  state: {
    isCollapse: false,
    userInfo: null,
  },
  mutations: {
    onCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    async login(_,payload) {
      return login(payload)
    },
    async logout({commit},payload) {
      await logout(payload)
      commit('setUserInfo', null)
    },
    async register(_,payload) {
      return register(payload)
    },
    async getUser({commit},payload) {
      const userInfo = await getUser(payload);
      commit('setUserInfo', userInfo);
      return userInfo;
    },
  },
  modules: {
    account,
    post,
  }
})
