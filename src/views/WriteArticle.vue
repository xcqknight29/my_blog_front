<template>
    <div>
        <ClearTheInput />
        <el-select class="select_class" v-model="className" placeholder="分类">
            <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input class="input_title" placeholder="标题" v-model="title" />
        <mavon-editor class="mavon_editor" v-model="articleText" />
        <el-button class="submit_butt" @click="submitArticle">
            提交
        </el-button>
    </div>
</template>

<script>
export default {
    name: "WriteArticle",
    data() {
        return {
            articleId: '',
            className: "1",
            title: "a",
            articleText: "asd",
            classList: [{ value: "testClass1", label: "class1" }]
        };
    },
    mounted() {
        if (this.$route.params.articleId) {
            this.getArticle(this.$route.params.articleId);
        }
    },
    methods: {
        getArticle(articleId) {
            this.axios({ method: 'get', url: 'article/one', params: { id: articleId } }).then((result) => {
                console.log(result);
                this.title = result.data.title;
                this.articleText = result.data.content;
            }).catch((error) => {
                this.$message({ message: ('出错:' + error) });
            })
        },
        submitArticle() {
            let messageArray = [];
            // 校验分类\标题\正文是否为空
            if (this.className === "") {
                messageArray.push("分类");
            }
            if (this.title === "") {
                messageArray.push("标题");
            }
            if (this.articleText === "") {
                messageArray.push("正文");
            }
            if (messageArray.length > 0) {
                this.$message(messageArray.toLocaleString() + "不能为空");
            } else {
                const url = this.$route.params.articleId ? 'article/update' : 'article/add';
                const data = {
                    id: this.$route.params.articleId ? this.$route.params.articleId : undefined,
                    title: this.title,
                    content: this.articleText,
                }
                // 发送请求
                this.axios({ method: 'post', url: url, data: data }).then((result) => {
                    console.log("success: " + result);
                }).catch((error) => {
                    console.log("error: " + error);
                });
            }
        }
    }
}
</script>

<style>
.select_class {
    width: 20%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    margin-top: 5px;
}

.input_title {
    min-width: 300px;
    width: 77%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    margin: 5px 0 0 3%;
}

.mavon_editor {
    margin-top: 15px;
}

.submit_butt {
    margin-top: 15px;
}
</style>