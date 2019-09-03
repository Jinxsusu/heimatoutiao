<template>
  <el-card>
    <bread-cumb slot="header">
      <!-- 面包屑的具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-cumb>
    <el-table :data="list" stripe>
      <el-table-column width="400" label="标题" prop="title"></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改评论</el-button>
          <el-button @click="openOrClose(obj.row)" size="small" type="text" :style="{color :obj.row.comment_status ? '#E6A23C':'#409EFF'}">
            {{obj.row.comment_status ? '关闭评论' : '打开评论'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    openOrClose (row) {
      let msg = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${msg}评论?`, '提示').then(() => {
        // 调用接口
        this.$axios({
          method: 'put',
          url: 'comments/status',
          params: { article_id: row.id },
          data: { allow_comment: !row.comment_status }// 修改状态取反
        }).then(res => {
          this.getComments() // 成功之后 重新调用拉取数据的方法
        })
      })
    },
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      // query参数 就相当于 get参数 路径参数 url参数
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
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
