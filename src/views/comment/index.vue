<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <!-- 面包屑的具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list" stripe>
      <el-table-column width="400" label="标题" prop="title"></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改评论</el-button>
          <el-button
            @click="openOrClose(obj.row)"
            size="small"
            type="text"
            :style="{color :obj.row.comment_status ? '#E6A23C':'#409EFF'}"
          >{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:15px 0">
      <!-- current-page 是当前页码  page-sizes 每页显示多少条  total是总条数 -->
      <el-pagination
        @current-change="changePage"
        :current-page="page.page"
        :page-size="page.pageSize"
        background
        layout="prev, pager, next"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      list: [],
      page: {
        page: 1, // 当前页码
        pageSize: 10, // 当前每页条数
        total: 0 // 总条数
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 更新当前页面
      this.page.page = newPage
      this.getComments()
    },
    openOrClose (row) {
      let msg = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${msg}评论?`, '提示').then(() => {
        // 调用接口
        this.$axios({
          method: 'put',
          url: 'comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } // 修改状态取反
        }).then(res => {
          this.getComments() // 成功之后 重新调用拉取数据的方法
        })
      })
    },
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      // this.loading = true
      // query参数 就相当于 get参数 路径参数 url参数
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.loading = false // 响应数据之后 改成false
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
