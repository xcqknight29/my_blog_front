<!-- 管理分类页面 -->

<template>
    <el-text style="">点击 tag 修改分类名称</el-text><br/>
    <!-- 循环显示文章分类tag -->
    <ClassTag 
    v-for="classSelect in classList" 
    :classSelect="classSelect" 
    @deleteHandler="deleteHandler"
    @editClassSubmit="editClassSubmit"></ClassTag>
    <!-- 添加分类组件 -->
    <ClassAdder @addClassSubmit="addClassSubmit"></ClassAdder>
</template>

<script>

import ClassTag from '../components/ClassTag.vue'
import ClassAdder from '../components/ClassAdder.vue'

export default {
    name: "ClassMenege",
    components: {
        ClassTag,
        ClassAdder,
    },
    data() {
        return {
        classList: [
            {name: "class1", articleNum: 3},
            {name: "class2", articleNum: 2},
            {name: "class3", articleNum: 1},
        ]
        };
    },
    created() {
        this.getClassList();
    },
    methods: {
        // 获取分类信息
        async getClassList() {
            const method = 'get';
            const url = '/write/class';
            try {
                let result = await this.axios({ method: method, url: url });
            } catch (error) {
                this.$message({ type: 'error', message: error });
            }
            this.classList = result.records;
        },
        // 提交分类更改
        editClassSubmit(input, originClass) {
            if (input === '') {
                this.$message({ message: ('分类名不能为空') });
                return;
            }
            if (input === originClass.name) {
                this.$message({ message: ('未更改') });
                return;
            }
            this.$confirm(("确定将分类" + originClass.name + "更改为" + input + "吗？\n有" + originClass.articleNum + "篇文章属于该分类。"), {
                confirmButtonText: "确定",
                cancelButtonText: "返回",
                type: "info",
            }).then(() => {
                const method = 'post';
                const url = 'class/edit';
                const data = { className: input };
                this.axios({ method: method, url: url, data: data }) // 发送请求
                    .then((result) => {
                        console.log(result);
                    });
            })
        },
        // 弹出消息框确认删除分类
        deleteHandler(classSelect) {
            this.$confirm(("确定删除分类" + classSelect.name + "吗? 有" + classSelect.articleNum + "篇文章属于该分类"), {
                confirmButtonText: "确定",
                cancelButtonText: "返回",
                type: "warning"
            }).then(() => {
                const method = 'post';
                const url = 'class/delete';
                const data = { className: classSelect.Name };
                this.axios({ method: method, url: url, data: data } // 发送请求
                    .then((result) => {
                        console.log(result);
                    }))
            });
        },
        // 提交添加分类
        addClassSubmit(input) {
            if (input === '') {
                this.$message({ message: ('分类名不能为空') });
                return;
            }
            const method = 'post';
            const url = 'class/add';
            const data = { className: input };
            this.axios({ method: method, url: url, data: data }) // 发送请求
                .then((result) => {
                    console.log(result);
                });
        },
    },
}

</script>

<style>
</style>