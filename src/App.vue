<template>
  <div id="app">
    <el-container>
      <el-aside>
        <MenuList></MenuList>
      </el-aside>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {RouterView} from 'vue-router'
  import MenuList from './components/MenuList.vue'

  export default {
    name: 'app',
    components: {
      MenuList
    }
  }
</script>