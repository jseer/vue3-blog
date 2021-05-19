import { createStore } from 'vuex';
import { login, register, getCaptcha } from '@/api';

export default createStore({
  state: {
    isCollapse: false,
  },
  mutations: {
    onCollapse(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {
    async login(_,payload) {
      await login(payload)
    },
    async register(_,payload) {
      await register(payload)
    },
  },
  modules: {
  }
})
