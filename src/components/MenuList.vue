<!-- 侧边栏菜单组件 -->

<template>
  <el-menu router default-active="test">
    <el-menu-item-group title="管理文章" class="line_bot_dashed">
      <el-menu-item index="/list">文章列表</el-menu-item>
      <el-menu-item index="/write">写文章</el-menu-item>
      <el-menu-item index="/class">管理分类</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group class="line_bot_dashed">
      <el-menu-item index="/user">管理用户</el-menu-item>
      <el-menu-item index="/timeline">时间线</el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<script>
export default {
  name: 'MenuList',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
.line_bot_dashed {
  border-bottom: 1px dashed var(--el-border-color);
}
</style>