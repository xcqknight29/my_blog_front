<!-- 分类列表 可通过本页进入分类页面 -->
<template>
<div>
  <!-- 最热门分类 -->
  <div class="classes_block">
    <div class="classes_title">热门分类</div>
    <div class="class_item" v-for="(item,index) in hotClasses" :key="index">
      <ElLink class="item_name" @click="toClassPage(item.classification_name)">{{ item.classification_name }}</ElLink>
    </div>
  </div>
  <!-- 最新投稿 -->
  <div class="classes_block">
    <div class="classes_title">最新分类</div>
    <div class="class_item" v-for="(item,index) in newClasses" :key="index">
      <ElLink class="item_name" @click="toClassPage(item.classification_name)">{{ item.classification_name }}</ElLink>
    </div>
  </div>
  <!-- 搜索 -->
  <div class="classes_block">
    <div class="classes_title">搜索分类</div>
    <div class="search_block">
      <input class="search_input" v-model="input" v-on:keyup.enter="getClassesBySearch">
      <ElButton class="search_button" @click="getClassesBySearch">搜索</ElButton>
    </div>
    <div>
      <div class="class_item" v-for="(item,index) in searchClasses" :key="index">
        <ElLink class="item_name" @click="toClassPage(item.classification_name)">{{ item.classification_name }}</ElLink>
      </div>
    </div>
    <div>
      <ElPagination/>
    </div>
  </div>
  
</div>
</template>

<style scoped>
.classes_block {
  margin:30px;
  padding:20px;
  font-size:30px;
  font-weight:bold;
  color:#282828;
  background-color:#b7b7b7;
  border-radius:3px;
}
.class_item{
  display:inline-block;
  width:30%;
  height:60px;
  margin:10px;
  background-color:#e7e7e7;
  border-radius:4px;
}
.item_name{
  font-size:24px;
  color:#353535;
  margin:10px 10%;
}
.item_name:hover{color:#409eff;}
.search_block{
  display:flex;
  align-items: center;
  margin:10px;
}
.search_input{
  display:inline-block;
  height:30px;
  border:0px;
  border-radius:4px;
  padding:0 10px;
  width:70%;
}
.search_input:focus{
  outline:0px;
}
.search_button{
  margin:0 20px;
  width:70px;
  color:#d7d7d7;
  background-color:#757575;
}
</style>

<script>
export default {
  name:'ClassList',
  data(){return{
    input:'',
    page:1,
    size:9,
    total:0,
    hotClasses:[],
    newClasses:[],
    searchClasses:[],
  }},
  created() {
    this.$emit('menuChange',2)
    this.getHotClasses()
    this.getNewClasses()
    this.getClassesBySearch()
  },
  methods:{
    async getHotClasses() {
      const result = await this.$sendAndThrow('get', 'reader/hotClass')
      this.hotClasses = result.data
    },
    async getNewClasses() {
      const result = await this.$sendAndThrow('get', 'reader/newClass')
      this.newClasses = result.data
    },
    async getClassesBySearch() {
      const params = {className:this.input?this.input:undefined, page:this.page, size:this.size}
      const result = await this.$sendAndThrow('get', 'reader/searchClass', params)
      this.searchClasses = result.data
      this.total = result.data.length
    },
    toClassPage(className) {
      this.$router.push({name:'reader-classPage', params:{className:className}})
    },
  },
}
</script>