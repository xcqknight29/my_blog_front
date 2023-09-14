<!-- 展示文章创建时间线 -->

<template>
    <el-timeline>
        <el-timeline-item size="large" placement="top" v-for="articleItem in articleList"
            :timestamp="articleItem.create_time">
            <el-card shadow="hover" style="width:60%;">
                <el-text style="font-size:1.2em;">创建了：</el-text><br />
                <el-link class="link_article">{{ articleItem.title }}</el-link>
            </el-card>
        </el-timeline-item>
    </el-timeline>
</template>

<script>
export default {
    name: "TimeLine",
    data() {
        return {
            articleList: [
                // { title: 'aaaa', createTime: '2023-07-21' },
                // { title: 'bbb', createTime: '2023-07-01' },
                // { title: 'cccc', createTime: '2023-06-23' },
                // { title: 'ddd', createTime: '2022-12-01' },
                // { title: 'eeeee', createTime: '2000-09-29' },
                // { title: 'aaaa', createTime: '2023-07-21' },
                // { title: 'bbb', createTime: '2023-07-01' },
                // { title: 'cccc', createTime: '2023-06-23' },
                // { title: 'ddd', createTime: '2022-12-01' },
                // { title: 'eeeee', createTime: '2000-09-29' },
                // { title: 'aaaa', createTime: '2023-07-21' },
                // { title: 'bbb', createTime: '2023-07-01' },
                // { title: 'cccc', createTime: '2023-06-23' },
                // { title: 'ddd', createTime: '2022-12-01' },
                // { title: 'eeeee', createTime: '2000-09-29' },
                // { title: 'aaaa', createTime: '2023-07-21' },
                // { title: 'bbb', createTime: '2023-07-01' },
                // { title: 'cccc', createTime: '2023-06-23' },
                // { title: 'ddd', createTime: '2022-12-01' },
                // { title: 'eeeee', createTime: '2000-09-29' },
            ]
        };
    },
    created() {
        this.getAllArticles()
    },
    methods: {
        async getAllArticles() {
            const method = 'get'
            const url = 'writer/article'
            const params = {page:1, size:20}
            const [error,result] = await this.$send(method,url,params)
            if(error) {
                this.$message({type:'error', message:error})
                return
            }
            this.articleList = result.data
        }
    },
}

</script>

<style>
.link_article {
    left: 15px;
    font-size: 1.2em;
}
</style>