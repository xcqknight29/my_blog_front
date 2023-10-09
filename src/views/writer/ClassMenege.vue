<!-- 管理分类页面 -->

<template>
  <el-text style="">点击修改分类名称</el-text><br />
  <!-- 循环显示文章分类tag -->
  <ClassTag v-for="classSelect in classList" :classSelect="classSelect" @deleteHandler="deleteHandler"
    @editClassSubmit="editClassSubmit"></ClassTag>
  <!-- 添加分类组件 -->
  <ClassAdder @addSubmitted="getClassList"></ClassAdder>
</template>

<script>
import ClassTag from '../../components/ClassTag.vue'
import ClassAdder from '../../components/ClassAdder.vue'
export default {
  name: "ClassMenege",
  components: {
    ClassTag,
    ClassAdder,
  },
  data() {
    return {
      classList: []
    }
  },
  created() {
    this.getClassList();
  },
  methods: {
    // 获取分类信息
    async getClassList() {
      const method = 'get';
      const url = '/writer/classification';
      const [error, result] = await this.$send(method, url);
      if (error) {
        this.$message({ type: 'error', message: error });
        return;
      }
      this.classList = result.data;
    },
    // 提交分类更改
    editClassSubmit(input, originClass) {
      if (input === '') {
        this.$message({ message: ('分类名不能为空') });
        return;
      }
      if (input === originClass.classification_name) {
        this.$message({ message: ('未更改') });
        return;
      }
      this.$confirm(("确定将分类" + originClass.classification_name + "更改为" + input + "吗？\n有" + originClass.article_num + "篇文章属于该分类。"), {
        confirmButtonText: "确定",
        cancelButtonText: "返回",
        type: "info",
      }).then(async () => {
        const method = 'put';
        const url = '/writer/classification';
        const data = { id: originClass.id, classification_name: input };
        const [error, result] = await this.$send(method, url, null, data);
        if (error) {
          this.$message({ type: "error", message: error });
          return;
        }
        this.$message({ type: 'success', message: '修改成功' });
        this.getClassList();
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
  },
}
</script>
