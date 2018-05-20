<template>
  <div class="hello">
    <img src="@/assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>code by yogurt_lei</h2>
    <el-button type="primary" size="medium" round>
      <router-link to="/login">let's start</router-link>
    </el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: 'Welcome to otwb-vue app'
      }
    }
  }
</script>

<style scoped>
  .hello {
    padding-top: 80px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    width: 600px;
    height: 500px;
    position: fixed;
    left: 50%;
    top: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
  }

  .el-button {
    padding: 20px 40px;
    color: white;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 20px;
  }

  button {
    margin-top: 50px;
  }
</style>
