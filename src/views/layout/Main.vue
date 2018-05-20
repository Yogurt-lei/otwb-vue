<!--登录成功后进入的首页-->
<template>
  <div id="main">
    <MainHeader></MainHeader>
    <el-container>
      <MainNav></MainNav>
      <div class="app-wrapper">
        <TagsView></TagsView>
        <AppMain></AppMain>
      </div>
    </el-container>
  </div>
</template>
<script>
  import MainHeader from '~app/layout/MainHeader';
  import MainNav from '~app/layout/MainNav';
  import TagsView from '~app/layout/TagsView';
  import AppMain from '~app/layout/AppMain';

  export default {
    data() {
      return {
        selectedTag: {},
        visible: false,
        top: 0,
        left: 0,
      }
    },
    mounted() {
      this.changeLocale();
    },
    components: {MainHeader, MainNav, TagsView, AppMain},
    methods: {
      // 设置语言
      changeLocale() {
        this.$i18n.locale = localStorage.lang;
      },
    },
  }
</script>
<style scoped>
  #main {
    background: #fff;
    width: 100%;
    min-height: 1310px;
  }

  .app-wrapper {
  @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
