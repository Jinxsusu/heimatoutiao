<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="全部素材" name="all">全部素材</el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">收藏图片</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'// 设置tab标签默认选中all一栏
    }
  }
}
</script>

<style>
</style>
