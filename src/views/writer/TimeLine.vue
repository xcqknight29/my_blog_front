<!-- 展示文章创建时间线 -->

<template>
    <el-timeline v-infinite-scroll="loadArticle">
        <el-timeline-item size="large" placement="top" v-for="articleItem in articleList"
            :timestamp="articleItem.create_time">
            <el-card shadow="hover" style="width:60%;">
                <el-text style="font-size:1.2em;">创建了：</el-text><br />
                <el-link class="link_article" @click="toArticlePage(articleItem.id)">{{ articleItem.title }}</el-link>
            </el-card>
        </el-timeline-item>
    </el-timeline>
</template>

<script>
export default {
    name: "TimeLine",
    data() {
        return {
            page: 1,
            total: 0,
            articleList: [
                // { title: 'aaaa', create_time: '2023-07-21' },
                // { title: 'bbb', create_time: '2023-07-01' },
                // { title: 'cccc', create_time: '2023-06-23' },
                // { title: 'ddd', create_time: '2022-12-01' },
                // { title: 'eeeee', create_time: '2000-09-29' },
                // { title: 'aaaa', create_time: '2023-07-21' },
                // { title: 'bbb', create_time: '2023-07-01' },
                // { title: 'cccc', create_time: '2023-06-23' },
                // { title: 'ddd', create_time: '2022-12-01' },
                // { title: 'eeeee', create_time: '2000-09-29' },
                // { title: 'aaaa', create_time: '2023-07-21' },
                // { title: 'bbb', create_time: '2023-07-01' },
                // { title: 'cccc', create_time: '2023-06-23' },
                // { title: 'ddd', create_time: '2022-12-01' },
                // { title: 'eeeee', create_time: '2000-09-29' },
                // { title: 'aaaa', create_time: '2023-07-21' },
                // { title: 'bbb', create_time: '2023-07-01' },
                // { title: 'cccc', create_time: '2023-06-23' },
                // { title: 'ddd', create_time: '2022-12-01' },
                // { title: 'eeeee', create_time: '2000-09-29' },
            ],
        };
    },
    created() {
        this.$emit('menuJump','5')
    },
    methods: {
        // async getAllArticles() {
        //     const method = 'get'
        //     const url = 'writer/article'
        //     const params = {page:1, size:10}
        //     const [error,result] = await this.$send(method,url,params)
        //     if(error) {
        //         this.$message({type:'error', message:error})
        //         return
        //     }
        //     this.articleList = result.data
        //     this.page++
        // },
        async loadArticle() {
            const params = {page:this.page, size:10}
            const [error, result] = await this.$send('get', 'writer/article', params)
            if (error) {
                this.$message({type: 'info', message: '没有更多内容'})
                return
            }
            this.articleList = this.articleList.concat(result.data.data)
            this.page++
        },
        toArticlePage(id) {
            this.$router.push({name: 'reader-article', params:{articleId: id}})
        },
    },
}

</script>

<style>
.link_article {
    left: 15px;
    font-size: 1.2em;
}
</style>