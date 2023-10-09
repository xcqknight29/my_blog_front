<!-- 登录页面 -->
<template>
<div class="tologin">
    <div>
        <span class="block color_gred">完成登录后才能访问页面哦</span><br>
        <el-button class="block center" @click="toLoginPage">登录</el-button>
    </div>
</div>
</template>

<script>
export default {
    name: 'ToLogin',
    data() {
        return {}
    },
    methods: {
        toLoginPage() {
            this.$router.push({name: 'login'})
        }
    },
}
</script>

<style>
.tologin {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.block {
    display:block;
}
.center {
    margin: 0 auto;
}
.color_gred {
    color:#606266;
}
</style>