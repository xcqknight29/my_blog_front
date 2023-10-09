<!-- 阅读文章 -->

<template>
<div class="read_article">
  <div class="article_title">{{ title }}</div>
  <ElText>by </ElText><ElLink class="article_author">{{ author }}</ElLink><br>
  <ElText>as </ElText><ElLink class="article_class">{{ classification }}</ElLink><br>
  <ElText class="article_createtime">{{ 'from '+createTime }}</ElText><br>
  <ElText class="article_lastupdate">{{ 'last update '+lastUpdate }}</ElText>
  <!-- <div class="article_tag"></div> -->
  <Markdown class="markdown_it" :source="content"></Markdown>
</div>
</template>

<style scoped>
.read_article {
  background-color:#eeeeee;
  border:solid #aaaaaa 2px;
  border-radius:2px;
  padding:20px;
  margin:5px auto;
}
.article_title {
  font-size:30px;
  font-weight:bold;
}
.markdown_it {}
</style>

<script>
import Markdown from 'vue3-markdown-it'
export default {
  name: 'ReadArticle',
  components: {Markdown},
  data() { return {
    articleId:0,
    title:'',
    author:'',
    classification:'',
    tag:'',
    createTime:'',
    lastUpdate:'',
    content:'',
  }},
  mounted() {
    this.articleId = this.$route.params.articleId
    this.getArticleContent()
  },
  methods: {
    async getArticleContent() {
      const method = 'get'
      const url = 'writer/edit'
      const params = {articleId:this.articleId}
      const [error,result] = await this.$send(method,url,params)
      if (error) {
        this.$message({type:'error', message:error})
        return
      }
      const data = result.data
      this.title = data.title
      this.author = data.author_name
      this.classification = data.classification_name
      this.tag = data.tag
      this.createTime = data.create_time
      this.lastUpdate = data.last_update
      this.content = data.content
    }
  },
}
</script>