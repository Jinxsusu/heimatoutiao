<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <el-form style="margin-left:40px">
      <el-form-item label="文章状态:">
        <el-radio-group @change="changeCondition" v-model="searchForm.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <!-- 绑定频道数据 -->
        <el-select @change="changeCondition" v-model="searchForm.channel_id">
          <!-- 循环生成 -->
          <!-- 显示的是label显示的item的name value是id(标识 是真实值) -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <!-- value-format 设置绑定日期的格式 -->
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="searchForm.dateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total-info">共找到{{page.total}}条符合条件的内容</div>
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
            <!-- 因为文章状态比较多 所以用过滤器来转换 插值表达式的内容 -->
            <el-tag style="width:60px" :type="item.status|statusType">{{ item.status|statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span  @click="modeifyItem(item)">
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span @click="delItem(item)">
            <i class="el-icon-delete"></i>
            删除
          </span>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center">
      <el-pagination
        style="margin:10px 0"
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.page"
        :page-size="page.pageSize"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      defaultImg: require('../../assets/img/avatar.jpg'), // 转成base64字符串的格式
      searchForm: {
        // 定义一个表单数据对象
        // 把这个对象的一项一项的内容绑定到每一项搜索框
        status: 5, // 绑定文章状态 文章状态:全部的是空
        // 但是设置为null的话 默认全部选不到
        // 所以我们设置一个不存在的是值5 然后绑定到标签上
        channel_id: null, //
        dateRange: [] // 时间选择器 格式是数组格式 显示的时间不是北京时间
      },
      channels: [], // 频道列表的数据
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 动态路由携带参数 在路由表上
    modeifyItem (item) {
      // 编程式导航 跳转到发布式导航
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getConditionArticles()
    //   // 当页码改变的时候 搜索条件也要满足
    //   let params = {
    //     status: this.searchForm.status === 5 ? null : this.searchForm.status,
    //     channel_id: this.searchForm.channel_id,
    //     begin_pubdate:
    //       this.searchForm.dateRange.length > 0
    //         ? this.searchForm.dateRange[0]
    //         : null,
    //     end_pubdate:
    //       this.searchForm.dateRange.length > 1
    //         ? this.searchForm.dateRange[1]
    //         : null,
    //     page: this.page.page,
    //     per_page: this.page.pageSize
    //   }
    //   this.getArticles(params)
    },
    changeCondition () {
      // 第一次获取文章内容的时候 params为空
      // 当执行changeCondition方法的时候我们传入了刚刚定义好的params 然后又执行getArticles()
      // 频道 状态 日期 都是绑定这个方法
      // 定义params对象 条件都要写在一起 满足综合条件返回结果
      this.page.page = 1
      this.getConditionArticles()
    //   let params = {
    //     // 这个传的是搜索部分的现在的数据
    //     // 当文章状态是全部的时候 我们设置为5 要让他重新改成null
    //     status: this.searchForm.status === 5 ? null : this.searchForm.status,
    //     channel_id: this.searchForm.channel_id,
    //     begin_pubdate:
    //       this.searchForm.dateRange.length > 0
    //         ? this.searchForm.dateRange[0]
    //         : null,
    //     end_pubdate:
    //       this.searchForm.dateRange.length > 1
    //         ? this.searchForm.dateRange[1]
    //         : null, // dateRange 是一个数组 它的第一项是begin_pubdate 下标为0 ,如果它没有操作的话就是空 ,如果设置了的话数组长度就要>0 用三元表达式表示如下
    //     // 当搜索条件改变的时候页码也要跟着改变从1开始
    //     page: this.page.page,
    //     per_page: this.page.pageSize
    //   }
    //   this.getArticles(params)
    },
    // 删除文章
    delItem (item) {
      // 提示用户
      this.$confirm('您是否要删除此文章?', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `articles/${item.id.toString()}` // id数字过大=>bigNumber类型=>tiString()方法处理一下
        }).then(() => {
          this.getConditionArticles()
        })
      })
    },
    // 封装代码 组合条件加页码
    getConditionArticles () {
      let params = {
        // 这个传的是搜索部分的现在的数据
        // 当文章状态是全部的时候 我们设置为5 要让他重新改成null
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate:
          this.searchForm.dateRange.length > 0
            ? this.searchForm.dateRange[0]
            : null,
        end_pubdate:
          this.searchForm.dateRange.length > 1
            ? this.searchForm.dateRange[1]
            : null, // dateRange 是一个数组 它的第一项是begin_pubdate 下标为0 ,如果它没有操作的话就是空 ,如果设置了的话数组长度就要>0 用三元表达式表示如下
        // 当搜索条件改变的时候页码也要跟着改变从1开始
        page: this.page.page,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },

    // 查询文章列表内容
    getArticles (params) {
      // 第一次获取文章内容的时候 params为空
      // 当执行changeCondition方法的时候我们传入了刚刚定义好的params 然后又执行getArticles()
      this.$axios({
        url: '/articles',
        params: params
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 获取文章频道数据
    getChannels () {
      // 发送请求
      this.$axios({
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getArticles() // 获取
    this.getChannels() // 获取频道数据
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
    },
    // 定义类型过滤器
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning' // 因为是过滤器 所以必须要有返回值
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
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
