<!-- 展示一个分类下的文章 -->

<template>
<div>
  <div class="class_title">{{ this.className }}</div>
  <!-- 文章列表 -->
  <div>
    <div class="class_article" v-for="(item,index) in articleList" :key="index">
      <ElLink class="article_title" @click="toArticle(item.id)">{{ item.title }}</ElLink><br>
      <div>{{ item.create_time }}</div>
      <div>{{ item.last_update }}</div>
      <div>
        <div v-for="(tag,index) in item" :key="index">{{ tag.tag_name }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.class_title {
  font-size:24px;
  color:#242323;
  background-color:#b7b7b7;
  margin:10px 0;
  padding:20px;
}
.class_article {
  color:#242323;
  background-color:#b7b7b7;
  margin:10px 0;
  padding:20px;
  font-size:10px;
}
.article_title {color:#323131;font-size:19px;}
.article_title:hover {color:#2e95fc;}
</style>

<script>
export default {
  name:'ClassPage',
  data(){return{
    className:'',
    page:1,
    size:20,
    articleList:[],
  }},
  mounted() {
    this.className = this.$route.params.className
    this.getArticleByClass()
  },
  methods:{
    async getArticleByClass() {
      const params = {className: this.className, page:this.page, size:this.size}
      const result = await this.$sendAndThrow('get', 'reader/articleByClass', params)
      if(result) {
        this.articleList = result.data
      }
      if(result.data.length) {
        this.className = result.data[0].classification_name
      }
    },
    toArticle(articleId) {
      this.$router.push({name:'reader-article', params:{articleId:articleId}})
    },
  },
}
</script>