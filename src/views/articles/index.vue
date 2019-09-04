<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <el-form style="margin-left:40px">
      <el-form-item label="文章状态:">
        <el-radio-group>
          <el-radio>全部</el-radio>
          <el-radio>草稿</el-radio>
          <el-radio>待审核</el-radio>
          <el-radio>审核通过</el-radio>
          <el-radio>审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total-info">共找到1459条符合条件的内容</div>
    <div class="article-list">
      <!-- 循环项 -->
      <div v-for="(item,index) in list" :key="index" class="article-item">
        <!-- 左侧内容 -->
        <div class="left">
          <!-- images 这个是一个数组 第一项是图片地址
          如果这个数组不为空也就是数组存在数组长度 就取index=0的一项
          如果为空的话选用默认图片地址 本地图片地址的路径要转成base64字符串格式-->
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
          <div class="info">
            <span class="title">{{item.title}}</span>
            <!-- 因为文章状态比较多 所有用过滤器来转换 -->
            <el-tag style="width:60px">{{ item.status|statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span>
            <i class="el-icon-delete"></i>
            删除
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      defaultImg: require('../../assets/img/avatar.jpg') // 转成base64字符串的格式
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(res => {
        console.log(res)
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getArticles()
  },
  filters: {
    // 定义一个过滤器 改变文字状态的显示
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿' // 因为是过滤器 所以必须要有返回值
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break // default 固定结尾 以上几种情况都没有出现的话代码停止
      }
    }
  }
}
</script>

<style lang="less" scoped>
.total-info {
  border-bottom: 1px dashed #ccc;
  padding: 15px;
  font-size: 14px;
  color: #323745;
}
.article-list {
  .article-item {
    display: flex;
    justify-content: space-between; //子元素在两头放
    padding: 15px 0;
    border-bottom: 1px solid #f2f3f5;
    .left {
      display: flex; //flex 布局的默认就是左右布局
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        height: 100px;
        display: flex;
        flex-direction: column; //垂直方向布局
        justify-content: space-around; //均匀布局先中间再两边
        margin-left: 10px;
        .title {
          font-size: 14px;
          color: #333;
        }
        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      font-size: 14px;
      span {
        color: #333;
        margin-right: 8px;
        cursor: pointer; //当鼠标放上去的时候样式改变变成小手
      }
    }
  }
}
</style>
