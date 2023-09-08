<!-- 显示分类以及编辑分类组件 -->

<template>
  <el-tag v-if="!editing" size="large" closable style="margin: 0 5px;" @close="$emit('deleteHandler', classSelect)">
    <span @click="editing = true">
      {{ classSelect.classification_name + '[' + classSelect.article_num + ']'}}
    </span>
  </el-tag>
  <div class="block_editing" v-else>
    <el-input style="width: 100px;" v-model="inputContent">
      <template #suffix>
        <el-icon size="small" style="cursor:pointer" @click="cancelEditing">
          <close />
        </el-icon>
      </template>
    </el-input>
    <el-icon class="submit_icon" size="large" color="#67C23A" @click="submitChange">
      <check/>
    </el-icon>
  </div>
</template>

<script>
export default {
  name: "ClassTag",
  data() {
    return {
      editing: false,
      inputContent: this.classSelect.classification_name,
    };
  },
  props: ['classSelect'],
  emits: ['deleteHandle', 'editClassSubmit'],
  created() {},
  methods: {
    cancelEditing() {
      this.editing = false;
      this.inputContent = this.classSelect.classification_name;
    },
    submitChange() {
      this.$emit('editClassSubmit', this.inputContent, this.classSelect);
      this.editing = false;
    },
  },
}
</script>

<style>
.block_editing {
  display:inline;
  margin-right:6px;
}
.submit_icon {
  top: 6px; 
  left: 6px; 
  cursor: pointer;
}
</style>