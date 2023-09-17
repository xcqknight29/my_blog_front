<!-- 首页 -->
<template>
  <h1>这里是我的个人博客，现在首页没有太多的内容，可以点击菜单切换页面看看。</h1>
</template>

<script>
export default {
  name:'HomePage',
  created() {
    this.$emit('menuChange',0)
  },
}
</script>