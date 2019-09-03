<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item to="{path:'/'}">
      <el-breadcrumb-item>
          <slot name="title"></slot>
      </el-breadcrumb-item>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
