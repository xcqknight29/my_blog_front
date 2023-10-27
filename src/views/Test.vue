<template>
    <button @click="createPerson">createPerson</button>
    {{ message }}
    <button @click="addTestData">添加测试文章</button>
</template>

<script>
export default {
    name: 'Test',
    data() {
        return {
            message: ''
        }
    },
    mounted() {
        if(!document.cookie.match("(^| )csrftoken=([^;]*)(;|$)")){
            console.log(this.getCSRFToken());
        } else {
            console.log(document.cookie.match("(^| )csrftoken=([^;]*)(;|$)")[2]);
        }
    }, 
    methods: {
        async getCSRFToken() {
            return await this.axios({
                method: 'get',
                url: 'myapp/api/gettoken/',
            });
        },
        async createPerson() {
            let message = await this.axios({
                method: 'post',
                url: 'myapp/person/',
                data:  {first_name: 'Sam', last_name: 'ccc'},
                headers: {'X-CSRFtoken': document.cookie.match("(^| )csrftoken=([^;]*)(;|$)")[2]},
            })
            console.log(message);
        },
        async addTestData() {
            for (let i = 0; i < 100; i++) {
                const data = {
                    title: 'Test Article - '+i,
                    classification: 1,
                    content: 'This is a test article',
                };
                const [error, result] = await this.$send('post', '/writer/article', null, data);
            }
        },
    },
}
</script>