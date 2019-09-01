<template>
  <!-- 最外层容器 -->
  <el-container>
    <!-- 左侧导航 -->
    <el-aside style="width:200px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- 右侧上部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 右侧主要区域-->
      <el-main>右侧主体</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside.vue'
import layoutHeader from '../../components/home/layout-header.vue'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>
</style>
