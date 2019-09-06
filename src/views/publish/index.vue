<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <!-- model 是绑定数据  rules是绑定的校验规则  ref绑定表单实例-->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:80px"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="formData.content" type="textarea" :rows="10"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <!-- 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <!-- label 是显示值 value是真实值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish">发表文章</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 发布文章/articles
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // 设置默认为无图
          images: [] //
        },
        channel_id: null
      },
      // 校验规则
      publishRules: {
        title: [
          {
            required: true,
            message: '标题不能为空'
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空'
          }
        ],
        channel_id: [
          {
            required: true,
            message: '频道不能为空'
          }
        ]
      }
    }
  },
  methods: {
    // 发表文章的方法
    publish () {
      // 校验整个表单 获取el-form 实例
      // validate 是一个方法
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft: false }, // draft是草稿 设置为false 默认设置为不是草稿
            data: this.formData // data 是body数据和表单呢数据一致
          }).then(() => {
            // 发布成功后 编程式导航跳转到文章列表页面
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 通过id获取文章详情
    getArticleById (articleId) {
      this.$axios({
        // 此时的id是字符串了
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params // 获取id
    if (articleId) {
    // 调用方法发请求
      this.getArticleById(articleId)
    }
  }
}
</script>

<style>
</style>
