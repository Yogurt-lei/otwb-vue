// 主界面管理
import Vue from 'vue';
import App from '@/App';
import router from '@/plugins/router';
import store from '@/plugins/store';
import i18n from '@/plugins/i18n';
import icons from '@/plugins/icons';
import ElementUI from 'element-ui';
// element-ui css
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;

Vue.use(ElementUI,{
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  el: '#app',
  router,      // 挂载router
  components: {App},
  template: '<App/>',
  store,
  i18n,
  render: h => h(App),
  //进入页面时检查是否登录
  create() {
    this.checkLogin();
  },
  // 监听路由检查登录 比如session过期
  watch: {
    "$router": 'checkLogin'
  },
  methods: {
    checkLogin() {
      // 登录态判断
      if (!this.getCookie('uid')) {
        Router.push('/login');
      } else {
        router.push('/main');
      }
    }
  }
});
