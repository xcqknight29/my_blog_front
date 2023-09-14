<template>
  <div class="ReaderApp">
    <header class="page_header">这里是顶栏菜单</header>
    <RouterView class="search_result"></RouterView>
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

.search_result {
  width:70%;
  margin:0 auto;
}
</style>

<script>
import {RouterView} from 'vue-router'
export default {
  name:'ReaderApp',
  components: {RouterView},
}
</script>