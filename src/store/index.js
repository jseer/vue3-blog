import { createStore } from 'vuex';
import { login, register, getUser } from '@/api';
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
      await login(payload)
    },
    async register(_,payload) {
      await register(payload)
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
