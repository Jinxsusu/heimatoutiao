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
        <quill-editor style="height:400px;width:800px" v-model="formData.content" type="textarea" :rows="10"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" style="margin-top:100px" prop="cover">
        <!-- 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
        <el-radio-group @change='changeCoverTpye' v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <!-- 封面组件  给父亲绑定 -->
        <cover-image @onClickImg="receiveImg" :images="formData.cover.images"></cover-image>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <!-- label 是显示值 value是真实值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发表文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    let func = function (rule, value, callBack) {
      if (value.type === 1) {
        (value.images.length === 1 && value.images[0]) ? callBack() : callBack(new Error('对不起,您未设置单图的封面'))
      } else if (value.type === 3) {
        if (value.images.length === 3 && value.images[0] && value.images[1] && value.images[2]) {
          callBack()
        } else {
          callBack(new Error('对不起,您未设置全三图的封面'))
        }
        // if(value.images.length===3&& !value.images.some(item => !item))
      } else {
        // 无图或者自动 []
        if (value.images.length > 0) {
          callBack(new Error('对不起,您的封面设置有误'))
        } else {
          callBack()
        }
      }
    }
    return {
      // 发布文章/articles
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          // 封面类型 -1:自动，0-无图，1-1张，3-3张
          type: 0,
          images: []
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
        ],
        // 自定义校验规则检测封面图片 是一个函数
        cover: [{
          validator: func
        }]
      }
    }
  },
  methods: {
    // 接收子组件传过来的值
    receiveImg (url, index) {
      // alert('这是cover-image传过来的地址' + url)
      // 拿到地址 和index 遍历 images数组
      // this.formData.cover.images.map(function (item, i) {
      //   if (i === index) {
      //     // 如果有index传过来的话 就返回url
      //     return url
      //   }
      //   return item
      //   // 如果没有的话 就不变
      // }) map返回的是新数组 再赋值给老数组 老数组的话也是一项一项的url地址
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },

    // 发表文章的方法
    publish (draft) {
      // 校验整个表单 获取el-form 实例
      // validate 是一个方法
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          // 只有校验成功后才会判断有没有新增还是修改
          let { articleId } = this.$route.params // 获取id 获取参数 $route 编程式导航 $router
          this.$axios({
            // 因为传的参数是一样的 所有两个方法可以合并
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft }, // draft是草稿 设置为false 默认设置为不是草稿
            data: this.formData // data 是body数据和表单呢数据一致
          }).then(() => {
            // 发布成功后 编程式导航跳转到文章列表页面
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 切换封面类型 根据当前类型
    changeCoverTpye () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']// 有一张封面 待选择
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 有三张封面待选择
      } else {
        this.formData.cover.images = []// 其他情况无图 默认为空
      }
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
