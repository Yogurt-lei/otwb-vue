//用户信息
<template>
  <div>
    <el-dropdown placement="bottom" @command="handleCommand">
      <span class="el-dropdown-link">
        <img class="portrait" src="@/assets/portrait.jpg"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled>{{$store.state.userInfo.nick}}</el-dropdown-item>
        <el-dropdown-item divided command="logout">{{$t('system.UserInfo.logout')}}</el-dropdown-item>
        <el-dropdown-item command="changePwd">{{$t('system.UserInfo.changePwd.modifyPwd')}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog center :title="$t('system.UserInfo.changePwd.modifyPwd')" :visible.sync="pwdDialogVisible" :before-close="closeDialog">
      <el-form status-icon ref="form" :model="form" label-position="right" label-width="150px" size="medium" :rules="pwdFormRules">
        <el-form-item :label="$t('system.UserInfo.changePwd.nick')">
          <el-input disabled :value="$store.state.userInfo.nick"></el-input>
        </el-form-item>
        <el-form-item :label="$t('system.UserInfo.changePwd.oldPwd')" prop="oldPwd">
          <el-input clearable type="password" v-model="form.oldPwd"></el-input>
        </el-form-item>
        <el-form-item :label="$t('system.UserInfo.changePwd.newPwd')" prop="newPwd">
          <el-input clearable type="password" v-model="form.newPwd"></el-input>
        </el-form-item>
        <el-form-item :label="$t('system.UserInfo.changePwd.newPwd2')" prop="newPwd2">
          <el-input clearable type="password" v-model="form.newPwd2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">{{$t('reset')}}</el-button>
        <el-button type="primary" @click="submitForm('form')">{{$t('save')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from '@/plugins/axios';
  import CookieUtil from '@/utils/CookieUtil';
  import {MessageBox, Dialog} from "element-ui";

  export default {
    data() {
      let validateOldPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$i18n.t('system.UserInfo.changePwd.inputOriginPassword')));
        } else {
          callback();
        }
      };
      let validateNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$i18n.t('system.UserInfo.changePwd.inputNewPassword')));
        } else {
          if (this.form.newPwd !== '') {
            this.$refs.form.validateField('newPwd2');
          }
          callback();
        }
      };
      let validateNewPwd2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$i18n.t('system.UserInfo.changePwd.confirmNewPassword')));
        } else if (value !== this.form.newPwd) {
          callback(new Error(this.$i18n.t('system.UserInfo.changePwd.notEqualForTwiceInput')));
        } else {
          callback();
        }
      };
      return {
        pwdDialogVisible: false,
        form: {
          oldPwd: '',
          newPwd: '',
          newPwd2: ''
        },
        pwdFormRules: {
          oldPwd: [
            {validator: validateOldPwd, trigger: 'blur'}
          ],
          newPwd: [
            {validator: validateNewPwd, trigger: 'blur'}
          ],
          newPwd2: [
            {validator: validateNewPwd2, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'logout': {
            this.logout();
          }
            break;
          case 'changePwd': {
            this.openChangePwdDialog();
          }
            break;
          default:
            break;
        }
      },
      //登出注销
      logout() {
        MessageBox.confirm(this.$i18n.t('system.UserInfo.confirmLogout'), this.$i18n.t('prompt'), {
          confirmButtonText: this.$i18n.t('system.UserInfo.reLogin'),
          cancelButtonText: this.$i18n.t('cancel'),
          type: 'warning'
        }).then(() => {
          //删除cookie并跳到登录页
          axios({
            method: 'post',
            url: '/api/system/doLogout',
            params: {}
          }).then(() => {
            // 重新实例化router
            location.reload();
            CookieUtil.delCookie('uid');
            this.$router.push('/login');
          });
        });
      },
      openChangePwdDialog() {
        this.pwdDialogVisible = true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // TODO by Yogurt_lei: 提交到后台 更新密码
          } else {
            return false;
          }
        });
      },
      closeDialog(done) {
        this.resetForm('form');
        done();
      }
    }
  }
</script>
<style scoped>
  .el-dropdown {
    color: white;
    font-size: 16px;
  }

  .portrait {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }

</style>
