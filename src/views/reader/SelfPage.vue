<!-- 个人页面 -->
<template>
<div>
  <div class="self_title">个人主页</div>
  <div>
    <div class="self_message">
      <div class="message_item">{{ '用户名: '+userMessage.name }}</div>
      <div class="message_item">{{ '账号: '+userMessage.username }}</div>
    </div>
    <div class="self_message">
      <div class="message_item">{{ '加入时间: '+userMessage.join_date }}</div>
      <div class="message_item">
        <div v-if="userMessage.competence===0">权限: 读者</div>
        <div v-else-if="userMessage.competence===1">权限: 博主</div>
        <div v-else-if="userMessage.competence===2">权限: 管理员</div>
        <div v-else></div>
      </div>
    </div>
  </div>
  <!-- 文章列表 -->
  <div>
    <div class="user_article" v-for="(item,index) in articleList" :key="index">
      <ElLink class="article_title" @click="toArticle(item.id)">{{ item.title }}</ElLink><br>
      <ElLink class="article_class" @click="toClass(item.classification)">{{ item.classification_name }}</ElLink>
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
.self_title {
  font-size:24px;
  font-weight:bold;
  color:#242323;
  background-color:#b7b7b7;
  padding:10px;
  margin:10px 0 0 0;
}
.self_message {
  display:flex;
  height:31px;
  margin:10px 0;
}
.message_item {
  height:30px;
  width:50%;
  margin:auto 1%;
  line-height:30px;
  padding:0 0 0 20px;
  color:#242323;
  border:#ffffff 3px solid;
  background-color:#dbdbdb;
}
.user_article {
  color:#242323;
  background-color:#b7b7b7;
  margin:10px 0;
  padding:20px;
  font-size:10px;
}
.article_title {color:#323131;font-size:19px;}
.article_title:hover {color:#2e95fc;}
.article_class {color:#323131;font-size:11px;}
.article_class:hover {color:#2e95fc;}
</style>

<script>
export default {
  name:'SelfPage',
  data(){return{
    userMessage:[],
    articleList:[],
  }},
  async created() {
    this.$emit('menuChange',3)
    await this.getSelfMessage()
    await this.getSelfArticle()
  },
  methods:{
    async getSelfMessage() {
      const result = await this.$sendAndThrow('get', 'reader/self')
      this.userMessage = result.data
    },
    async getSelfArticle() {
      const params = {username: this.userMessage.username}
      const result = await this.$sendAndThrow('get', 'reader/articleByAuthor', params)
      this.articleList = result.data
    },
    toArticle(articleId) {
      this.$router.push({name:'reader-article', params:{articleId:articleId}})
    },
    toClass(classId) {
      this.$router.push({name: 'reader-classPage', params:{classId:classId}})
    },
  },
}
</script>