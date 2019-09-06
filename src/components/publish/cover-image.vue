<template>
  <div class="cover-image">
    <!-- 注册图片的点击事件 -->
    <div @click="showDialog(index)" class="image-item" v-for="(item,index) in  images" :key="index">
      <img :src="item ? item : defaultImg " alt />
    </div>
    <!-- 绑定弹层关闭事件 -->
    <el-dialog @close="dialogVisible=false" :visible="dialogVisible">
      <!-- 设置监听事件 监听传过来的值 -->
      <select-image @onSelectImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
// 根据images 来渲染页面
// images ['']
// images ['','','']
// images []
export default {
  // props 中的数据是只读的

  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 定义一个变量 转换成base
      dialogVisible: false,
      selectIndex: -1 // 保存点击图片的index
    }
  },
  methods: {
    // 接收子组件传过来的值
    receiveImg (url) {
      // alert('这是子组件传过来的地址' + url)
      // url 不能在此页面中修改 要在它的父组件中修改
      // alert('这是select-image传过来的地址' + url)
      this.$emit('onClickImg', url, this.selectIndex) // 把当前点击图片的index传给父组件
      // 传完数据了关闭弹层
      this.dialogVisible = false
    },
    // 显示弹层
    showDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index // 点击图片的时候获取到index 赋值给data中的变量selectIndex
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  .image-item {
    padding: 10px;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
