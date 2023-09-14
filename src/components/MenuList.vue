<!-- 侧边栏菜单组件 -->
<template>
    <el-menu router :default-active="selectedItem">
        <el-menu-item-group title="管理文章" class="line_bot_dashed">
            <el-menu-item index="1" route="/writer/list">文章列表</el-menu-item>
            <el-menu-item index="2" route="/writer/edit">写文章</el-menu-item>
            <el-menu-item index="3" route="/writer/class">管理分类</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group class="line_bot_dashed">
            <el-menu-item index="4" route="/writer/userList">管理用户</el-menu-item>
            <el-menu-item index="5" route="/writer/timeline">时间线</el-menu-item>
        </el-menu-item-group>
    </el-menu>
</template>

<script>
export default {
    name:'MenuList',
    props:{selectedItem:String},
    data() {return {
        
    }},
}
</script>

<style>
.line_bot_dashed {
    border-bottom: 1px dashed var(--el-border-color);
}
</style>