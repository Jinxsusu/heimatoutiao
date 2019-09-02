<template>
  <!-- 有且只有一个根标签 -->
  <!-- 头部logo图片 -->
  <div class="layout-aside">
    <div class="title">
      <img src="../../assets/img/logo_admin.png" />
    </div>
    <el-menu style="border:none"
    background-color="#323745"
    text-color="#adafb5"
    active-text-color="#ffd04b"
    router>
    <!-- el-menu支持路由模式 -->
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- <el-menu-item>是有折叠的菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-order"></i>
        </template>
        <span slot="title">内容管理</span>
        <el-menu-item index='/home/publish'>发布文章</el-menu-item>
        <el-menu-item index='/home/articles'>内容列表</el-menu-item>
        <el-menu-item index='/home/comment'>评论列表</el-menu-item>
        <el-menu-item index='/home/meterial'>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <!-- 为了区分不同的下拉菜单 -->
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index='/home/fansdata'>图文数据</el-menu-item>
        <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fansimg'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoded>
.layout-aside {
  width: 200px;
  height: 100vh;
  background: #323745;
  .title {
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img {
      height: 30px;
    }
  }
}
</style>
