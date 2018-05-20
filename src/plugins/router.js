// 路由配置
import Vue from 'vue';
import Router from 'vue-router';
import Login from '~app/system/Login';
import UserInfo from '~app/system/UserInfo';
import HelloVue from '~app/HelloVue';
import Main from '~app/layout/Main';
import Province from '~app/base/Province';
import City from '~app/base/City';

Vue.use(Router);

// 配置路由
export default new Router({
  routes: [
    {
      path: '/',
      component: HelloVue,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/userInfo',
      component: UserInfo,
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          name: 'Province',
          path: '/base/provinceList',
          component: Province,
          meta: {title: 'base.Province', noCache: true}
        },
        {
          name: 'City',
          path: '/base/cityList',
          component: City,
          meta: {title: 'base.City', noCache: true}
        }
      ]
    },
  ]
});
