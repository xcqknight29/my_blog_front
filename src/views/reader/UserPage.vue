<!-- 用户主页 -->
<template>
  <div>
    <!-- 基本信息 -->
    <div>
      <!-- 标题‘***的主页’ -->
      <div class="user_username">{{ userMessage.name+'的主页' }}</div>
      <!-- 用户停用？ -->
      <div v-if="!userMessage.is_active" class="user_isactive">
        <ElIcon color="#606266"><Warning/></ElIcon>
        <ElText>用户停用</ElText>
      </div>
      <!-- 该用户身份 -->
      <div>
        <div v-if="userMessage.competence===2">管理员</div>
        <div v-else-if="userMessage.competence===1">博主</div>
        <div v-else-if="userMessage.competence===0">读者</div>
        <div v-else>游客</div>
      </div>
      <!-- 名称 -->
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
.user_username {font-size:20px;font-weight:bolder;}
.user_isactive {display:flex;align-items: center;}
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
  name:'UserPage',
  data() { return {
    page:1,
    size:20,
    username:'',
    userMessage:{
      // username:'aaaaaa',
      // name:'aaa',
      // is_active:true,
      // competence:0,
      // last_login:'2023-09-08 09:30:50',
      // join_date:'2023-09-09 11:20:23',
    },
    articleList:[],
  }},
  created(){
    this.username = this.$route.params.username
    this.getUserMessage()
    this.getArticleByAuthor()
  },
  methods:{
    async getUserMessage() {
      const params = {username: this.username}
      const result = await this.$sendAndThrow('get', 'reader/user', params)
      if(result) {
        this.userMessage = result.data
      }
    },
    async getArticleByAuthor() {
      const params = {username:this.username, page:this.page, size:this.size}
      const result = await this.$sendAndThrow('get', 'reader/articleByAuthor', params)
      if(result) {
        this.articleList = result.data
      }
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