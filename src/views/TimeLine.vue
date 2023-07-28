<!-- 展示文章创建时间线 -->

<template>
  <el-timeline>
    <el-timeline-item size="large" placement="top" v-for="articleItem in articleList" :timestamp="articleItem.createTime">
      <el-card shadow="hover" style="width:60%;">
        <el-text style="font-size:1.2em;">创建了：</el-text><br/>
        <el-link class="link_article">{{ articleItem.title }}</el-link>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script>


export default {
  name: "TimeLine",
  components: {
    
  },
  data() {
    return {
      articleList: [
        {title: 'aaaa', createTime: '2023-07-21'},
        {title: 'bbb', createTime: '2023-07-01'},
        {title: 'cccc', createTime: '2023-06-23'},
        {title: 'ddd', createTime: '2022-12-01'},
        {title: 'eeeee', createTime: '2000-09-29'},
        {title: 'aaaa', createTime: '2023-07-21'},
        {title: 'bbb', createTime: '2023-07-01'},
        {title: 'cccc', createTime: '2023-06-23'},
        {title: 'ddd', createTime: '2022-12-01'},
        {title: 'eeeee', createTime: '2000-09-29'},
        {title: 'aaaa', createTime: '2023-07-21'},
        {title: 'bbb', createTime: '2023-07-01'},
        {title: 'cccc', createTime: '2023-06-23'},
        {title: 'ddd', createTime: '2022-12-01'},
        {title: 'eeeee', createTime: '2000-09-29'},
        {title: 'aaaa', createTime: '2023-07-21'},
        {title: 'bbb', createTime: '2023-07-01'},
        {title: 'cccc', createTime: '2023-06-23'},
        {title: 'ddd', createTime: '2022-12-01'},
        {title: 'eeeee', createTime: '2000-09-29'},
      ]
    };
  },
  methods: {
    
  },
}

</script>

<style>
.link_article {
  left: 15px;
  font-size: 1.2em;
}
</style>