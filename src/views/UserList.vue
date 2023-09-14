<!-- 用户列表 -->

<template>
<div>
  <ElTable :data="userList">
    <ElTableColumn prop="name" label="名称"></ElTableColumn>
    <ElTableColumn prop="username" label="账号"></ElTableColumn>
    <ElTableColumn label="账号状态">
      <template #default="scope">
        <ElTag v-if="scope.row.is_active" type="success">启用</ElTag>
        <ElTag v-else type="info">停用</ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="last_login" label="最后登录"></ElTableColumn>
    <ElTableColumn prop="join_date" label="注册时间"></ElTableColumn>
    <ElTableColumn label="主页">
      <template #default="scope">
        <ElButton @click="toUserPage(scope.row.username)">跳转</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</div>
</template>

<script>
export default {
    name: 'UserList',
    components: {},
    data() { return {
      page:1,
      size:20,
      userList:[
        // {
        //   username:'aaaaaa',
        //   name:'aaa',
        //   is_active:true,
        //   competence:0,
        //   last_login:'2023-09-08 09:30:50',
        //   join_date:'2023-09-09 11:20:23',
        // },
      ],
    }},
    mounted() {
      this.$emit('menuJump','4')
      this.getUserPage()
    },
    methods:{
      toUserPage(username) {
        this.$router.push({name:'reader-userPage', params:{username:username}})
      },
      async getUserPage() {
        const params = {page:this.page, size:this.size}
        const [error,result] = await this.$send('get', 'writer/user', params)
        if(error) {
          this.$message({type:'error', message:error})
          return
        }
        this.userList = result.data
      },
    },
}
</script>

