<!-- 关于 -->
<template>
  <h1>ABOUT</h1>
</template>

<script>
export default {
  name:'AboutPage',
  created() {
    this.$emit('menuChange',4)
  },
}
</script>