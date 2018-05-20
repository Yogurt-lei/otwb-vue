const tagsView = {
  state: {
    //用户访问过的页面
    visitedViews: [],
    //实际 keep-alive 的路由
    cachedViews: []
  },
  mutations: {
    /**
     * 添加访问过页面 配置了meta.noCache为false 也添加到cacheViews中
     */
    addView: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) {
        return;
      }
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'default-tabName'
      });
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    /**
     * 删除当前页面 cacheViews中有也删除
     */
    delView: (state, view) => {
      for (let [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }

      for (let i in state.cachedViews) {
        if (i === view.name) {
          let index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    /**
     * 删除其他
     */
    delOtherView: (state, view) => {
      for (let [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1);
          break;
        }
      }

      for (let i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, i + 1);
          break
        }
      }
    },
    /**
     * 删除所有
     */
    delAllView: (state, view) => {
      state.cachedViews = [];
      state.visitedViews = [];
    }
  },
  /**
   * 提交异步操作
   */
  actions: {
    delView({commit, state}, view) {
      return new Promise((resolve) => {
        commit('delView', view);
        resolve([...state.visitedViews]);
      })
    },
    delOtherView({commit, state}, view) {
      return new Promise((resolve) => {
        commit('delOtherView', view);
        resolve([...state.visitedViews]);
      })
    },
    delAllView({commit, state}) {
      return new Promise((resolve) => {
        commit('delAllView');
        resolve([...state.visitedViews]);
      })
    }
  }
};

export default tagsView
