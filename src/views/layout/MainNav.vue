<!--左侧导航栏-->
<template>
  <div>
    <el-aside width="auto" class="el-menu">
      <el-menu router default-active="1-1" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">区域信息</span>
          </template>
          <el-menu-item-group>
            <router-link to="/base/provinceList">
              <el-menu-item index="/base/provinceList">省</el-menu-item>
            </router-link>
            <router-link to="/base/cityList">
              <el-menu-item index="/base/cityList">市</el-menu-item>
            </router-link>
            <el-menu-item index="/base/zoneList" disabled>区</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-button type="primary" v-show="!isCollapse" icon="el-icon-d-arrow-left" circle
               @click="switchCollapse"></el-button>
    <el-button type="primary" v-show="isCollapse" icon="el-icon-d-arrow-right" circle
               @click="switchCollapse"></el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: false,
      }
    },
    methods: {
      switchCollapse() {
        this.isCollapse = !this.isCollapse;
      },
    }
  }
</script>
<style scoped>
  .el-menu-vertical-demo {
    min-height: 400px;
  }

  a {
    text-decoration: none;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .el-button.is-circle {
    margin-left: 0;
    position: relative;
  }
</style>
