<template>
  <div class="ReaderApp">
    <header class="page_header">
      <ul class="navbar">
        <li 
        class="menu_item" 
        v-for="(menuItem, index) in readerMenu"
        :key="index"
        @click="selectMenuItem(menuItem.routeName)"
        :class="{ 'active': selectedIndex === index }">
          <div>{{ menuItem.title }}</div>
        </li>
      </ul>
    </header>
    <RouterView class="search_result" @menuChange="menuChange"></RouterView>
    <footer class="page_footer">
      <div class="footer_block footer_info">
        <span>myblog,xcqknight29</span>
      </div>
      <div class="footer_block footer_menu">
        <div class="menu_title">读者菜单</div>
        <ul>
          <li class="footer_item" v-for="(item,index) in readerMenu" :key="index">
            <ElLink class="footer_link" @click="selectMenuItem(item.routeName)">{{ item.title }}</ElLink>
          </li>
        </ul>
      </div>
      <div class="footer_block footer_menu">
        <div class="menu_title">博主菜单</div>
        <ul>
          <li class="footer_item" v-for="(item,index) in writerMenu" :key="index">
            <ElLink class="footer_link" @click="selectMenuItem(item.routeName)">{{ item.title }}</ElLink>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.ReaderApp {}
.page_header {
  width:100%;
  padding:15px 30px 20px 30px;
  margin:0 auto;
  font-size:18px;
  color:#f4f4f4;
  background-color:#353535;
}
/* 顶栏样式 */
.navbar {
  background-color: #333;
  color: #fff;
  padding: 10px;
}
/* 菜单项样式 */
.menu_item {
  display: inline-block;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
}
.menu_item:hover {
  color: #00bcd4;
}
/* 选中菜单项的样式 */
.active {
  color: #00bcd4;
  font-weight: bold;
}
.search_result {
  min-height:720px;
  width:70%;
  margin:0 auto;
}
.page_footer{
  color:#f4f4f4;
  background-color:#353535;
  height:200px;
  display: flex;
}
.footer_block {
  width:30%;
  display:inline-block;
}
/* .footer_menu {display:inline-flex;} */
.menu_title{
  margin:20px 30px;
  font-size:17px;
}
.footer_info{
  text-align: center;
  padding: 10% 0 30px 0;
}
.footer_item{list-style-type:none;}
.footer_link{color:#f4f4f4;}
</style>

<script>
import {RouterView} from 'vue-router'
export default {
  name:'ReaderApp',
  components: {RouterView},
  data(){return{
    readerMenu:[
      {title:'首页',routeName:'reader-homepage'},
      {title:'搜索',routeName:'reader-search'},
      {title:'分类',routeName:'reader-classList'},
      {title:'个人',routeName:'reader-selfPage'},
      // {title:'关于',routeName:'reader-aboutPage'},
    ],
    writerMenu:[
      {title:'博文',routeName:'writer-list'},
      {title:'编辑',routeName:'writer-edit'},
      {title:'分类',routeName:'writer-class'},
      {title:'用户',routeName:'writer-userList'},
      {title:'时间线',routeName:'writer-timeline'},
    ],
    selectedIndex:0,
  }},
  methods:{
    selectMenuItem(routeName) {
      this.$router.push({name:routeName})
    },
    menuChange(index) {
      this.selectedIndex = index
    },
  },
}
</script>