<template>
<div id="app">
  <div class="search_block">
    <ElInput class="search_input" v-model="input" v-on:keyup.enter="searchSubmit"></ElInput>
    <button class="search_button" @click="searchSubmit">search</button>
    <!-- <ElButton class="search_button" @click="searchSubmit">search</ElButton> -->
  </div>
  <div>
    <div v-for="(article, index) in articles" :key="index">
      <ElLink class="article_title" @click="toArticlePage(article.id)">{{ article.title }}</ElLink><br>
      <ElText class="small_text">{{ article.create_time }}</ElText><br>
      <div><ElText class="small_text">by </ElText><ElLink @click="toUserPage(article.author)">{{ article.author_name }}</ElLink></div>
      <ElText>{{ article.classification_name }}</ElText><br>
      <div>
        <ElTag class="article_tag" type="info" v-for="(tag,index) in article.tag" :key="index">{{ tag.tag_name }}</ElTag>
      </div><br>
    </div><br>
  </div>
</div>
</template>

<style scoped>
.search_block {
  width:50%;
  margin:10px auto 50px auto;
}
.search_input {width:80%;}
.search_button {
  margin:0 10px;
  padding: 0 5px;
  color: #606266;
  height:30px;
  border:1px solid #dcdfe6;
  border-radius: 3px;
  background-color: #ffffff;
  transition: 0.8s;
}
.search_button:hover {
  border-color: #626262;
}
.article_title{font-size:18px;}
.small_text{font-size:12px;}
.article_tag{margin:0 5px;}
</style>

<script>
export default {
  name: 'ArticleSearch',
  data() {
    return {
      input:'',
      content:'',
      page:1,
      size:20,
      total:0,
      articles: [],
    };
  },
  created() {
    this.$emit('menuChange',1)
    this.searchSubmit()
  },
  methods: {
    async searchSubmit() {
      this.content = this.input
      this.getArticleList()
    },
    async getArticleList() {
      const params = {inputContent:this.content?this.content:undefined, page:this.page, size:this.size}
      const result = await this.$sendAndThrow('get', 'writer/article', params)
      this.articles = result.data
      this.total = result.data.length
    },
    toArticlePage(articleId) {
      this.$router.push({name: 'reader-article', params: {articleId: articleId}})
    },
    toUserPage(authorId) {
      this.$router.push({name: 'reader-userPage', params: {id:authorId}})
    },
  },
}
</script>