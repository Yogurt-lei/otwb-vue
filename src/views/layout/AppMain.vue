<!--主内容区-->
<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
    }
  }
</script>
<style>
  #main {
    background: #fff;
    width: 100%;
    min-height: 1310px;
  }

  .el-main {
    padding: 0;
  }

  .el-table .odd-row {
    background: white;
  }

  .el-table .even-row {
    background: #f5f5f5;
  }

  .el-pagination {
    margin-top: 10px;
  }
</style>
