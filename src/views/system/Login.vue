<template>
  <div id="container" @keyup.enter="validate">
    <div id="login" class="box_bg">
      <h1>OTWB</h1>
      <h5 v-if="lang==='zh'">>>欢迎使用本系统</h5>
      <h5 v-else>>>welcome to use this system</h5>
      <div style="background-color: rgba(255, 255, 255, 0);">
        <p>
          <i class="icon-user"></i>
          <input type="text" required="required" v-if="lang==='zh'" placeholder="账 号" v-model="account"/>
          <input type="text" required="required" v-else placeholder="Account" v-model="account"/>
        </p>
        <p>
          <i class="icon-password"></i>
          <input type="password" required="required" v-if="lang==='zh'" placeholder="密  码" v-model="password"/>
          <input type="password" required="required" v-else placeholder="Password" v-model="password"/>
        </p>
        <p v-show="this.enableCaptcha">
          <i class="icon-code"></i>
          <input type="text" v-model="captcha" style="width: 140px;float: left;margin-left: 50px" v-if="lang==='zh'"
                 placeholder="验证码"/>
          <input type="text" v-model="captcha" style="width: 140px;float: left;margin-left: 50px" v-else
                 placeholder="Captcha"/>
          <img style="width: 110px;height:43px;border-radius: 6px;margin-right: 25px" @click="updateCaptcha"
               :src="captchaImg"/>
        </p>
        <p style="padding-top: 5px;">
          <i class="icon-earth"></i>
          <span style="color: #FFF;font-weight: bold" v-show="lang==='zh'">选择语言</span>
          <span style="color: #FFF;font-weight: bold" v-show="lang==='en'">language</span>
          <el-select v-model="lang">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </p>
        <p style="margin-top:15px">
          <el-button v-if="lang==='zh'" type="primary" @click="validate">登录</el-button>
          <el-button v-else type="primary" @click="validate">Login</el-button>
        </p>
      </div>
      <Loading v-if="isLoging" marginTop="30px" marginLeft="150px"></Loading>
    </div>
  </div>
</template>
<script>
  import axios from '@/plugins/axios';
  import CookieUtil from '@/utils/CookieUtil';
  import Loading from '~app/system/Loading';
  import {Notification} from "element-ui";

  export default {
    data() {
      return {
        // 默认不启用 根据后台配置决定是否启用
        enableCaptcha: false,
        captcha: '',
        captchaImg: '',
        isLoging: false,
        account: '',
        password: '',
        options: [{
          value: 'zh', label: '中文'
        }, {
          value: 'en', label: 'English'
        }],
        // 默认中文
        lang: 'zh',
      }
    },
    mounted() {
      this.whetherEnableCaptcha();
    },
    components: {
      Loading,
    },
    methods: {
      /**
       * 验证登录
       */
      validate() {
        let validatePassed = false;
        if (this.lang === 'zh') {
          if (this.account === '') {
            Notification({
              message: '账号不正确.',
              type: 'error',
              duration: 2000
            });
          } else if (this.password === '') {
            Notification({
              message: '密码不正确.',
              type: 'error',
              duration: 2000
            });
          } else {
            if (this.enableCaptcha) {
              if (this.captcha === '' || this.captcha.length !== 4) {
                Notification({
                  message: '验证码不正确',
                  type: 'error',
                  duration: 2000
                });
              } else {
                validatePassed = true;
              }
            } else {
              validatePassed = true;
            }
          }
        } else {
          if (this.account === '') {
            Notification({
              message: 'Incorrect account',
              type: 'error',
              duration: 2000
            });
          } else if (this.password === '') {
            Notification({
              message: 'Incorrect password',
              type: 'error',
              duration: 2000
            });
          } else {
            if (this.enableCaptcha) {
              if (this.captcha === '' || this.captcha.length !== 4) {
                Notification({
                  message: 'Incorrect captcha',
                  type: 'error',
                  duration: 2000
                });
              } else {
                validatePassed = true;
              }
            } else {
              validatePassed = true;
            }
          }
        }
        if (validatePassed) {
          this.doLogin();
        }
      },
      /**
       * 更新验证码
       */
      updateCaptcha() {
        this.captchaImg = '/api/system/captcha?d=' + Math.random();
      },
      whetherEnableCaptcha() {
        axios({
          method: 'get',
          url: '/api/system/config',
          params: {'key': 'enable-captcha'}
        }).then((data) => {
          this.enableCaptcha = data;
          if (this.enableCaptcha) {
            this.updateCaptcha();
          }
        });
      },
      /**
       * 登录
       */
      doLogin() {
        let param = {
          account: this.account,
          password: hex_md5(this.password),
          captcha: this.captcha,
          lang: this.lang
        };

        // 开始登录
        this.isLoging = true;
        axios({
          method: 'post',
          url: '/api/system/doLogin',
          params: param
        }).then((user) => {
          this.isLoging = false;
          // 登录成功保存用户id 设置过期时间
          let expireDays = 1000 * 60 * 60 * 24 * 15;
          CookieUtil.setCookie('uid', user.uid, expireDays);
          // 保存信息到store
          this.userInfo = {
            nick: user.nick,
            uid: user.nick,
            portrait: user.portrait
          };
          localStorage.setItem("lang", this.lang);
          //提交到Store
          this.$store.commit('updateUserInfo', this.userInfo);
          //跳转到主界面
          this.$router.push('/main');
        }, () => {
          this.isLoging = false;
        });
      }
      ,
    }
  }
</script>
<style scoped>
  #container {
    background: url(../../assets/login_bg.jpg);
    width: 100%;
    min-height: 1310px;
    background-size: cover;
  }

  .el-button{
    width:280px;
  }

  .el-select {
    width: 205px;
    border-radius: 4px;
  }

  .el-input__icon {
    height: 45px;
  }

  img {
    cursor: pointer;
  }

  .icon-user, .icon-password, .icon-code {
    background: url(../../assets/icon-login.png) no-repeat;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 15px;
    left: 20px;
    z-index: 2;
    margin-left: 40px;
  }

  .icon-user {
    background-position: -5px -5px;
    margin-top: 33px;
  }

  .icon-password {
    background-position: -31px -5px;
  }

  .icon-code {
    background-position: -56px -5px;
  }

  .icon-earth {
    width: 23px;
    height: 40px;
    z-index: 2;
    background: url(../../assets/icon-earth.png) no-repeat center center;
    padding-left: 20px;
  }

  #login {
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -150px;
    margin-left: -200px;
    width: 400px;
    height: 380px;
  }

  .box_bg {
    padding: 20px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.3);
  }

  #login h1, h5 {
    color: #fff;
    text-shadow: 0 0 10px;
    letter-spacing: 1px;
    text-align: center;
    margin: 10px auto;
  }

  div, p {
    position: relative;
    padding-bottom: 5px;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  h5 {
    float: right;
    padding-right: 10px;
  }

  input {
    text-indent: 2em;
    width: 278px;
    height: 20px;
    margin-bottom: 10px;
    outline: none;
    font-size: 13px;
    text-shadow: 1px 1px 1px;
    border: 1px solid #fff;
    border-radius: 4px;
    background-color: #fff;
    padding: 10px;
  }

</style>
