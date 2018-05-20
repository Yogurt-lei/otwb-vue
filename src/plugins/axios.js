//封装axios请求
import axios from 'axios';
import store from './store';
import qs from 'qs'
import {Message} from "element-ui";

const service = axios.create({
  // 请求超时时间
  timeout: 100000,
  transformRequest: [function (data) {
    return qs.stringify(data);
  }],
  transformResponse: [function (data) {
    return qs.parse(data);
  }],
  data: {},
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  responseType: 'json'
});

// request拦截器
service.interceptors.request.use(config => {
  config.headers.Accept = 'application/json';
  // 每次请求携带userId
  let uid = store.state.userInfo.uid;
  if (uid) {
    config.headers['uid'] = uid;
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error);
  Message({
    showClose: true,
    message: error,
    type: "error"
  });
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 0) { //0位成功就callback
      return Promise.resolve(res.data);
    } else {
      console.log(error);
      Message({
        showClose: true,
        message: JSON.stringify(res),
        type: "error"
      });
      return Promise.reject(res);
    }
  },
//下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
//如通过xmlhttprequest 状态码标识 逻辑可写在下面error中

//     if (res.code !== 20000) {
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       });
//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.@dispatch('FedLogOut').then(() => {
//             location.reload();// 为了重新实例化vue-router对象 避免bug
//           });
//         })
//       }
//       return Promise.reject('error');
//     } else {
//       return response.data;
//     }
  error => {
    console.log(error);
    Message({
      showClose: true,
      message: JSON.stringify(error),
      type: "error"
    });
    return Promise.reject(error)
  }
);

export default service
