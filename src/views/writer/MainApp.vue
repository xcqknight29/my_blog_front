<template>
<el-container>
    <el-aside>
        <menu-list class="menulist" :selectedItem="selectedItem"></menu-list>
        <user-message class="usermessage"></user-message>
    </el-aside>
    <el-main>
        <router-view @menuJump="menuJump"></router-view>
    </el-main>
</el-container>
</template>

<style scoped>
.page_footer{ height:200px; }
.footer_block {
    width:30%;
    display:inline-block;
}
.footer_reader_menu { display:inline-flex; }
.footer_menu { list-style-type:none; }
.footer_link { color:#f4f4f4; }
#MainApp { height: 100%; }
.el-container { height: 100%; }
.el-aside { width: 21vw; }
</style>

<script>

import { RouterView } from 'vue-router'
import MenuList from '@/components/MenuList.vue'
import UserMessage from '@/components/UserMessage.vue'

export default {

    name: 'MainApp',

    components: {
        RouterView,
        MenuList,
        UserMessage,
    },

    data() { return{
        selectedItem: 0,
    } },

    methods:{
        menuJump(selectIndex) {
            this.selectedItem = selectIndex
        }
    },

}

</script>
