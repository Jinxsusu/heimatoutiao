<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <el-form style="margin-left:40px">
      <el-form-item label="文章状态:">
        <el-radio-group v-model="radio">
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
          <img src="../../assets/img/404.png" alt />
          <div class="info">
            <span class="title">有内鬼交易取消</span>
            <el-tag style="width:60px">已发表</el-tag>
            <span class="date">2019-10-11 08:15:22</span>
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
      list: [1, 2, 3, 4, 5, 6, 7]
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
        .title{
          font-size:14px;
          color:#333
        }
        .date{
          color: #999;
          font-size: 12px
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
