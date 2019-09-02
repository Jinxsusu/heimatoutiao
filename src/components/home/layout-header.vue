<template>
  <el-row class="layout-header" type="flex" justify="space-between">
    <!-- span 是给col的宽度 UI将页面分为24分 -->
    <el-col :span="6" class="left">
      <i class="el-icon-s-unfold icon"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class="right">
      <img class="head-img" :src="userInfo.photo ? userInfo.photo :defaultImg" alt />
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // 发送请求获取用户数据
    getUserInfo () {
      // 发送请求
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    },
    handleCommand (command) {
      if (command === 'account') {
        console.log('账户信息')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/82heimatoutiao'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  padding: 8px 0;
  .left {
    width: 300px;
    .icon {
      font-size: 22px;
      margin-right: 3px;
    }
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .head-img {
      border-radius: 50%;
      margin-right: 5px;
      width: 35px;
      height: 35px;
    }
  }
}
</style>
