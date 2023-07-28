<template>
<el-container>
  <el-header>
    <el-input 
      class="float-left inp_short" 
      placeHolder="在此输入想要查询的文章关键词" 
      v-model="input">
      <template #suffix>
        <el-icon
          size="small"
          style="cursor: pointer"
          @click="clearInput">
          <Close/>
        </el-icon>
      </template>
    </el-input>
    <el-icon 
      size="large" 
      color="#66b1ff" 
      style="top: 4px; left: 4px; cursor: pointer;" 
      @click="getPage">
      <Search/>
    </el-icon>
  </el-header>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="class" label="分类"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
  data() {
    return {
      page: 0,
      total: 0,
      size: 10,
      input: '',
      tableData: [
        {
          id: '1',
          name: '1',
          title: 'a',
          class: '1',
          time: '2015-01-01-01T00:00:00'
        }
      ],
    };
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getPage() {
      const url = '/article/page';
      this.axios({ method: 'get', 
        url: url, 
        params: { page: this.page, size: this.size, input: this.input ? this.input : undefined } 
      }).then((result) => {
        console.log(result);
        if (result.code) {
          this.tableData = result.data.records;
          this.total = result.data.total;
        }
      }).catch((error) => {
        this.$message(error);
      });
    },
    clearInput() {
      this.input = '';
    },
    toWrite(row) {
      this.$router.push('/write/' + row.id);
    }
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