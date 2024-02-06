<!-- 编辑分类 -->
<template>
    <div>
        <div>
            <span class="text_class">{{ '将分类 '+className+' 更改为 ' }}</span>
            <el-input class="input_class" v-model="input" />
            <el-popover :visible="showEdit" width="180px">
                <template #reference>
                    <el-button 
                        @click="showEditPopover"
                        >修改</el-button>
                </template>
                <div class="pop_block">
                    <div class="pop_text">真的要修改分类名吗？</div>
                    <div class="pop_butt">
                        <el-button 
                            size="small" 
                            @click="showEdit = false"
                            >取消</el-button>
                        <el-button
                            type="primary"
                            size="small"
                            @click="editHandler"
                            >确定</el-button>
                    </div>
                </div>
            </el-popover>
            <el-popover :visible="showDelete" width="180px">
                <template #reference>
                    <el-button 
                        type="warning" 
                        @click="showDeletePopover"
                        >删除</el-button>
                </template>
                <div class="pop_block">
                    <div class="pop_text">真的要删除分类吗？该分类下的文章将被归类到未分类中。</div>
                    <div class="pop_butt">
                        <el-button 
                            size="small" 
                            @click="showDelete = false"
                            >取消</el-button>
                        <el-button 
                            type="primary" 
                            size="small" 
                            @click="submitDelete"
                            >确定</el-button>
                    </div>
                </div>
            </el-popover>
        </div>
        <div>
            <div class="text_class">{{ '该分类下有'+total+'篇博文' }}</div>
            <span class="text_class title_article_list">文章列表</span>
            <div class="block_article_list">
                <div v-for="(article, index) in articleList" :key="index">
                    <el-link class="article_title" @click="toArticlePage(article.id)">{{ article.title }}</el-link><br>
                    <el-text class="small_text">{{ article.create_time }}</el-text><br>
                    <div><el-text class="small_text">by </el-text><ElLink @click="toUserPage(article.author)">{{ article.author_name }}</ElLink></div>
                </div>
                <el-pagination layout="prev, pager, next" v-model:current-page="page" v-model:page-size="size" @update:current-page="pageChange" :total="total"></el-pagination>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text_class {
    color: #606266;
}
.input_class {
    width: 20%;
    margin: 1%;
}
.pop_block {
    /* width: 140px; */
}
.pop_text {
    /* height: 25px; */
    padding: 0.5em;
}
.pop_butt {
    float: right;
}
.title_article_list {
    display: block;
    margin: 20px 0;
}
.block_article_list {
    border: 1px solid #dcdfe6;
    padding: 1%;
}
</style>

<script>

import { sleep } from "../../static/js/sleep_util"

export default {

    name: 'ClassEdit',

    data() { return {
        classId: '',
        className: '',
        articleCount: '',
        input: '',
        showEdit: false,
        showDelete: false,
        page: 1,
        size: 10,
        total: 0,
        articleList: [],
    } },

    mounted() {
        this.className = this.$route.params.cname
        this.getArticle()
    },

    methods: {

        async getArticle() {
            const params = {
                className: this.className,
                page: this.page,
                size: this.size,
            }
            const result = await this.$sendAndThrow('get', 'reader/articleByClass', params)
            if(!result) return
            this.total = result.data.total
            this.articleList = result.data.data
        },

        pageChange(currentPage) {
            this.page = currentPage
            this.getArticle()
        },

        // 显示编辑分类确认窗口
        showEditPopover() {
            this.showEdit = !this.showEdit
            this.showDelete = false
        },

        editHandler() {
            if (!this.input) {
                this.$message({type: 'info', message: '请输入修改后的分类名'})
                return
            }
            if (this.input === this.className) {
                this.$message({type: 'info', message: '修该后的分类名不能与修改前一致'})
                return
            }
            this.submitEdit()
        },

        async submitEdit() {
            const data = {
                forward_name: this.className,
                classification_name: this.input,
            }
            const result = await this.$sendAndThrow('put', 'writer/classification', null, data)
            if (!result) return
            this.$message({type: 'success', message: '修改分类成功'})
            this.$router.push({name: 'writer-class-edit', params: {cname: data.classification_name}})
        },

        showDeletePopover() {
            this.showDelete = !this.showDelete
            this.showEdit = false
        },

        async submitDelete() {
            const data = {
                className: this.className,
            }
            const result = await this.$sendAndThrow('delete', 'writer/classification', null, data)
            if (!result) return
            this.$message({type: 'success', message: '删除分类成功'})
            await sleep(3000)
            this.$router.push({name: 'writer-class'})
        },

    }, 

}
</script>