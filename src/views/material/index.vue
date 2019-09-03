<template>
  <el-card class="material">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTag">
      <el-tab-pane label="全部素材" name="all">
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i :style="{color:item.is_collected ?'red':''}" class="el-icon-star-on"></i>
              <i class="el-icon-delete"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="changePage"
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.page"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 设置tab标签默认选中all一栏
      list: [], // 图片列表信息
      page: {
        page: 1,
        pageSize: 12,
        total: 0
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()// 请求最新的数据
    },
    // 切换标签
    changeTag () {
      this.page.page = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: 'user/images',
        params: {
          page: this.page.page,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        console.log(res)
        this.page.total = res.data.total_count // 将数据中的图片总数赋值给总页码
        this.list = res.data.results // 接收数据
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.material {
  .card-list {
    display: flex;
    flex-wrap: wrap; //换行
    justify-content: center;
    border-radius: 5px;
    .img-card {
      position: relative;
      width: 160px;
      height: 160px;
      margin: 30px;
      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 30px;
        background-color: #f4f5f6;
        font-size: 18px;
      }
    }
  }
}
</style>
