<template>
    <div id="MainApp">
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
    import MenuList from '../components/MenuList.vue'

    export default {
        name: 'MainApp',
        components: {
            MenuList
        }
    }
</script>

<style>
#MainApp {
    height: 100%;
}
.el-container {
    height: 100%;
}
</style>