<template>
  <div>
    <ClearTheInput />
    <el-select class="select_class" v-model="classId" filterable placeholder="分类">
      <el-option v-for="item in classList" :key="item.id" :label="item.classification_name" :value="item.id" />
    </el-select>
    <el-input class="input_title" placeholder="标题" v-model="title" />
    <div>
      <ElTag v-for="(tag, index) in tagList" :index="index">
        {{ tag.tag_name }}
      </ElTag>
      <ElTag></ElTag>
    </div>
    <mavon-editor class="mavon_editor" v-model="articleText" />
    <el-button class="submit_butt" @click="submitArticle">
      提交
    </el-button>
  </div>
</template>

<style scoped>
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

<script>
import { getClassification } from '../../static/js/get_data'
export default {
  name: "WriteArticle",
  emits: ['menuJump'],
  data() {
    return {
      articleId: 0,
      classId: '',
      title: '',
      tagList: [],
      articleText: '',
      classList: [{ id: 1, classification_name: 'class1' }]
    };
  },
  mounted() {
    getClassification().then((data) => { this.classList = data });
    if (this.$route.params.articleId) {
      this.getOneArticle(this.$route.params.articleId);
    }
  },
  methods: {
    async getOneArticle(articleId) {
      const method = 'get';
      const url = '/writer/edit';
      const params = { articleId: articleId };
      const [error, result] = await this.$send(method, url, params);
      if (error) {
        this.$message({ type: 'error', message: error });
        return;
      }
      this.articleId = result.data.id;
      this.title = result.data.title;
      this.classId = result.data.classification;
      this.tagList = result.data
      this.articleText = result.data.content;
    },
    async submitArticle() {
      let messageArray = [];
      // 校验分类\标题\正文是否为空
      if (this.classId === '') {
        messageArray.push("分类");
      }
      if (this.title === '') {
        messageArray.push("标题");
      }
      if (this.articleText === '') {
        messageArray.push("正文");
      }
      if (messageArray.length > 0) {
        this.$message({ type: 'info', message: (messageArray.toLocaleString() + "不能为空") });
        return;
      }
      const method = this.$route.params.articleId ? 'put' : 'post';
      const url = '/writer/article';
      const data = {
        id: this.articleId ? this.articleId : undefined,
        title: this.title,
        classification: this.classId,
        content: this.articleText,
      };
      const [error, result] = await this.$send(method, url, null, data);
      if (error) {
        this.$message({ type: 'error', message: error });
      } else {
        this.$message({ message: '上传成功' });
        this.$emit('menuJump', '1')
        this.$router.push({ name: 'writer-list' });
      }
    }
  }
}
</script>
