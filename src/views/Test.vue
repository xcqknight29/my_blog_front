<template>
    <button @click="createPerson">createPerson</button>
    {{ message }}
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
        }
    },
}
</script>