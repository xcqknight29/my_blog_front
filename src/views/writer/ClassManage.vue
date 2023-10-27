<!-- 管理分类 -->
<template>
    <div>
        <div class="compHeader">
            <ElButton class="addButt" type="primary" @click="showDialog = true">添加分类</ElButton>
            <el-dialog title="添加分类" width="30%" v-model="showDialog">
                <div class="dialog_main">
                    <div class="main_label">分类名</div>
                    <el-input class="main_input" placeholder="在这里输入分类名" v-model="input"></el-input>
                </div>
                <div class="dialog_footer">
                    <el-button @click="showDialog = false">取消</el-button>
                    <el-button type="primary" @click="submitNewClass">提交</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <ElTable :data="tableData">
                <ElTableColumn prop="classification_name" label="分类名"></ElTableColumn>
                <ElTableColumn prop="article_num" label="文章数"></ElTableColumn>
                <ElTableColumn label="修改">
                    <template template #default="scope">
                        <ElButton @click="editClass(scope.row)">编辑分类</ElButton>
                    </template>
                </ElTableColumn>
            </ElTable>
        </div>
        <div>
            <ElPagination layout="prev, pager, next" :page-size="10" v-model:current-page="page" @update:current-page="pageChange" :total="total"></ElPagination>
        </div>
    </div>
</template>

<style scoped>
.compHeader{
    min-height: 50px;
}
.addButt{
    position: absolute;
    right: 15%;
}
.dialog_main {
    margin: 0 0 30px 0;
    display: flex;
    align-items: center;
}
.main_label {
    width: 30%;
}
.main_input {
    margin: 0 20px 0 0;
}
.dialog_footer {
    height: 32px;
    text-align: right;
}
</style>

<script>
export default {
    name: 'ClassManager',
    data() {
        return {
            showDialog: true,
            input: '',
            page: 1,
            total: 0,
            tableData: [],
        }
    },
    mounted() {
        this.getClass()
    },
    methods: {
        async getClass() {
            const params = {
                page: this.page,
                size: 10,
            }
            const result = await this.$sendAndThrow('get', 'writer/classification', params, null)
            if(!result) return
            this.tableData = result.data.data
            this.total = result.data.total
        },
        pageChange(page) {
            this.page = page
            this.getClass()
        },
        editClass(row) {
            this.$router.push({name: 'writer-class-edit', params: {cname: row.classification_name}})
        },
        async submitNewClass() {
            const data = {
                classification_name: this.input
            }
            const [error, result] = await this.$send('post', 'writer/classification', null, data)
            if (error) {
                this.$message({type: 'error', message: '添加失败，请检查分类是否已重复'})
                return
            }
            this.$message({type: 'success', message: '添加成功'})
            this.showDialog = false
        },
    },
}
</script>

