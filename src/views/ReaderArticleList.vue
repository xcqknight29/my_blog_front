<template>
<div id="app">
  <div class="search_block">
    <ElInput class="search_input"></ElInput>
    <ElButton class="search_button">search</ElButton>
  </div>
  <div>
    <div v-for="(article, index) in articles" :key="index">
      <ElLink class="article_title" ref="">{{ article.title }}</ElLink><br>
      <ElText class="small_text">{{ article.create_time }}</ElText><br>
      <div><ElText class="small_text">by </ElText><ElLink>{{ article.author }}</ElLink></div>
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
  width:8%;
}
.article_title{font-size:18px;}
.small_text{font-size:12px;}
.article_tag{margin:0 5px;}
</style>

<script>
export default {
  name: 'ReaderArticleList',
  components:{ElInput,ElButton,ElLink,ElText,ElTag},
  data() {
    return {
      articles: [
        {
          id: '1',
          title: '示例文章 1',
          author: 'John Doe',
          classification_name: '测试分类',
          tag: [
            { id: 1, tag_name: 'tag1' },
            { id: 2, tag_name: 'tag2' },
            { id: 3, tag_name: 'tag3' },
          ],
          create_time: '2023-08-15 10:30:00',
        },
        {
          id: '1',
          title: '示例文章 2',
          author: 'Jane Smith',
          classification_name: '测试分类',
          tag: [
            { id: 1, tag_name: 'tag1' },
            { id: 2, tag_name: 'tag2' },
            { id: 3, tag_name: 'tag3' },
          ],
          create_time: '2023-08-16 10:30:00',
        },
        {
          id: '1',
          title: '示例文章 3',
          author: 'Bob Johnson',
          classification_name: '测试分类',
          tag: [
            { id: 1, tag_name: 'tag1' },
            { id: 2, tag_name: 'tag2' },
            { id: 3, tag_name: 'tag3' },
          ],
          create_time: '2023-08-17 10:30:00',
        }
      ]
    };
  }
}
</script>