<!-- 用户列表 -->

<template>
    <div>
        <div class="conp_header">
            <el-button class="butt_add" type="primary" @click="addUser">添加用户</el-button>
        </div>
        <div>
            <el-table :data="userList">
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="username" label="账号"></el-table-column>
                <el-table-column label="账号状态">
                    <template #default="scope">
                        <el-tag v-if="scope.row.is_active" type="success">启用</el-tag>
                        <el-tag v-else type="info">停用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="last_login" label="最后登录"></el-table-column>
                <el-table-column prop="join_date" label="注册时间"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button @click="toUserPage(scope.row.username)">主页</el-button>
                        <el-button @click="editUser(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog style="width:400px;height:350px;" :title="title" v-model="editDialog">
                <el-form :model="formData">
                    <el-form-item label="用户名" label-width="60px">
                        <el-input v-model="formData.username" :disabled="usernameDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" label-width="60px">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="账号启用" label-width="70px">
                        <el-switch v-model="formData.is_active"></el-switch>
                    </el-form-item>
                    <el-form-item label="身份">
                        <el-select v-model="formData.competence">
                            <el-option :key="0" label="读者" :value="0"></el-option>
                            <el-option :key="1" label="博主" :value="1"></el-option>
                            <el-option :key="2" label="管理员" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="dialog_footer">
                        <el-button @click="editCancel">取消</el-button>
                        <el-button type="primary" @click="handleSubmit">确定</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<style scoped>
.conp_header { min-height: 50px;}
.butt_add {
    position: absolute;
    right: 6%;
}
.dialog_footer {
    position: absolute;
    right: 20px;
    bottom: 20px;
}
</style>

<script>

export default {

    name: 'UserList',

    emits: ['menuJump'],

    data() {
        return {
            page: 1,
            size: 20,
            editDialog: false,
            title: '',
            isEdit: false,
            usernameDisabled: false,
            formData: {
                "username": "test user",
                "name": "test user",
                "is_active": true,
                "competence": 0
            },
            userList: [
                /*{
                  username:'aaaaaa',
                  name:'aaa',
                  is_active:true,
                  competence:0,
                  last_login:'2023-09-08 09:30:50',
                  join_date:'2023-09-09 11:20:23',
                },*/
            ],
        }
    },

    mounted() {
        this.getUserPage()
        this.$emit('menuJump', 3)
    },

    methods: {

        toUserPage(username) {
            this.$router.push({ name: 'reader-userPage', params: { username: username } })
        },

        async getUserPage() {
            const params = { page: this.page, size: this.size }
            const [error, result] = await this.$send('get', 'writer/user', params)
            if (error) {
                this.$message({ type: 'error', message: error })
                return
            }
            this.userList = result.data.data
            this.total = result.data.total
        },

        addUser() {
            // this.cleanForm()
            this.title = '添加用户'
            this.isEdit = false
            this.editDialog = true
        },

        editUser(row) {
            this.cloneData(row, this.formData)
            this.title = '编辑用户'
            this.isEdit = true
            this.editDialog = true
        },

        editCancel() {
            this.editDialog = false
            this.cleanForm()
        },

        async handleSubmit() {
            let method
            if (this.isEdit) {
                method = 'put'
            } else {
                method = 'post'
            }
            const data = {
                username: this.formData.username,
                name: this.formData.name,
                is_active: this.formData.is_active,
                competence: this.formData.competence,
            }
            const result = await this.$sendAndThrow(method, 'writer/user', null, data)
            if (result) {
                this.$message({ type: 'success', message: '添加成功' })
                this.getUserPage()
                this.editDialog = false
            }
        },

        // async addSubmit() {
        //   const data = {
        //     username: this.formData.username,
        //     name: this.formData.name,
        //     is_active: this.formData.is_active,
        //     competence: this.formData.competence,
        //   }
        //   const result = await this.$sendAndThrow('post', 'writer/user', null, data)
        //   if(result) {
        //     this.$message({type: 'success', message: '添加成功'})
        //     this.getUserPage()
        //     this.editDialog = false
        //   }

        // },
        // async editSubmit() {
        //   const data = {
        //     username: this.formData.username,
        //     name: this.formData.name,
        //     is_active: this.formData.is_active,
        //     competence: this.formData.competence,
        //   }
        //   const result = await this.$sendAndThrow('put', 'writer/user', null, data)
        //   if(result) {
        //     this.$message({type: 'success', message: '修改成功'})
        //     this.getUserPage()
        //     this.editDialog = false
        //   }

        // },

        cleanForm() {
            this.formData = {
                "id": 0,
                "username": "",
                "name": "",
                "is_active": false,
                "competence": 0
            }
        },

        cloneData(data, target) {
            // this.formData.id = row.id
            // this.formData.last_login = row.last_login
            // this.formData.join_date = row.join_date
            // this.formData.username = row.username
            // this.formData.name = row.name
            // this.formData.is_active = row.is_active
            // this.formData.competence = row.competence
            target.username = data.username
            target.name = data.name
            target.is_active = data.is_active
            target.competence = data.competence
        },

    },

}
</script>
