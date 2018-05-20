// 状态管理
import Vue from 'vue';
import Vuex from 'vuex';
import tagsView from './modules/tagsView';

Vue.use(Vuex);

// 定义需要存储的内容
const state = {
  // 后台请求的地址
  domain: 'http://localhost:8080/otwb/',
  // 模型
  model: 'otwb',
  // 保存用户信息
  userInfo: {
    uid: '',
    nick: '',
    portrait: ''
  },
};

export default new Vuex.Store({
  // 状态保存
  state,
  // 变化的时候更新
  mutations: {
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  },
  modules: {
    tagsView
  }
});
