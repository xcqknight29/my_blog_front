<template>
<el-container>
    <el-aside>
        <MenuList class="menulist"></MenuList>
        <UserMessage class="usermessage"></UserMessage>
    </el-aside>
    <el-main>
        <RouterView></RouterView>
    </el-main>
</el-container>
</template>

<script>
import { RouterView } from 'vue-router'
import MenuList from '../components/MenuList.vue'
import UserMessage from '../components/UserMessage.vue'

export default {
    name: 'MainApp',
    components: {
        MenuList,
        UserMessage,
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
.el-aside {
    width: 21vw;
}
</style>