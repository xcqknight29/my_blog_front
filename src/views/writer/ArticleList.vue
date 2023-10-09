<template>
    <el-container>
        <el-header>
            <el-input class="float-left inp_short" placeHolder="在此输入想要查询的文章关键词" v-model="input">
                <template #suffix>
                    <el-icon size="small" style="cursor: pointer" @click="clearInput">
                        <Close />
                    </el-icon>
                </template>
            </el-input>
            <el-icon size="large" color="#66b1ff" style="top: 4px; left: 4px; cursor: pointer;" @click="getArticle">
                <Search />
            </el-icon>
        </el-header>
        <el-main>
            <el-table :data="tableData">
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="author_name" label="作者"></el-table-column>
                <el-table-column prop="classification_name" label="分类"></el-table-column>
                <el-table-column prop="last_update" label="上次修改"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column> 
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button @click="toWrite(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "ArticleList",
    emits: ['menuJump'],
    data() {
        return {
            page: 1,
            total: 0,
            size: 20,
            input: '',
            tableData: [],
        }
    },
    mounted() {
        this.getArticle()
    },
    methods: {
        async getArticle() {
            const method = 'get'
            const url = '/writer/article'
            const params = {page:this.page, size:this.size, input:this.input}
            const [error,result] = await this.$send(method, url, params)
            if (error) {
                this.$message({type: 'error', message: error})
            } else {
                this.tableData = result.data
            }
        },
        clearInput() {
            this.input = ''
        },
        toWrite(row) {
            this.$emit('menuJump','2')
            this.$router.push({name:'writer-edit', params:{articleId:row.id}})
        },
    }
}
</script>

<style>
.float-right {
    float: right;
}

.inp_short {
    max-width: 300px;
}
</style>