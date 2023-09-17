<template>
<div class="user-message">
    <ElLink @click="toReader">to reader</ElLink><br>
    <el-dropdown trigger="click">
        <div class="user-message-block">
            <el-icon color="#424242" size="21px" class="user-message-icon">
                <User />
            </el-icon>
            <span class="user-message-text">
                {{ username }}
            </span>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>用户信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</div>
</template>

<script>
export default {
    name: 'UserMessage',
    data() {
        return {
            username:'这是用户名这是用户名这是用户名这是用户名',
        }
    },
    methods:{
        toReader() {
            this.$router.push({name:'reader-homepage'})
        },
    },
}
</script>

<style>
.user-message {
    position: absolute;
    bottom: 10vh;
    left: 20px; 
}
.user-message-block {
    padding: 6px 7px;
    border-radius: 3px;
    width: 17vw;
    max-height: 23px;
    transition: background-color 0.4s;
    white-space: nowrap;
}
.user-message-block:hover {
    background-color: #c1dfff;
}
.user-message-icon {
    margin-right: 5px;
    float: left;
}
.user-message-text {
    color: #424242;
    line-height: 21px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>