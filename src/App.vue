<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
    font-weight: 400;
    text-align: center;
    background: url(./assets/login_bg.jpg);
    width: 100%;
    min-height: 1310px;
    background-size: cover;
    border-radius: 15px;
  }

  div {
    background-color: rgba(255, 255, 255, 0);
  }

</style>
