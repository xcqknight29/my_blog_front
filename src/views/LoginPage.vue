<template>
<el-form 
ref="loginForm"
class="login-form" 
:model="loginFormData" 
:rules="rules" 
label-width="100px" 
label-position="top" 
hide-required-asterisk="true">
    <el-form-item label="用户名" prop="username">
        <el-input 
        class="item-input" 
        type="text" 
        v-model="loginFormData.username" 
        placeholder="在这里输入你的用户名"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input 
        class="item-input" 
        type="password" 
        v-model="loginFormData.password" 
        placeholder="在这里输入你的密码"/>
    </el-form-item>
    <el-form-item>
        <el-button class="submit-button" type="primary" @click="loginSubmit">Go!</el-button>
    </el-form-item>
</el-form>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            rules: {
                username: [
                    {required: true, message: '不要忘记输入用户名哦', trigger: 'blur'},
                    {min: 3, max: 20, message: '用户名过长或过短', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '不要忘记输入密码哦', trigger: 'blur'},
                    {min: 6, max: 20, message: '密码过长或过短', trigger: 'blur'},
                ],
            },
            loginFormData: {
                username: 'admin',
                password: '123456',
            },
        }
    },
    methods: {
        async loginSubmit() {
            const validated = await this.$refs.loginForm.validate(validated=>validated);
            if (!validated) return
            const method = 'post';
            const url = '/writer/login';
            const data = {
                username:this.loginFormData.username,
                password:this.loginFormData.password,
            };
            const [error,result] = await this.$send(method, url, null, data);
            if (error) {
                this.$message({type: 'error', message: error});
            } else {
                this.$message({type: 'success', message: '登录成功'});
                this.$router.push({name: 'writer-list'});
            }
        },
    },
}
</script>

<style>
.login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #CFD3DC;
    border-radius: 8px;
    padding: 20px 50px;
}
.item-input {
    width: 200px;
}
.submit-button {
    margin: 0 auto;
}
</style>