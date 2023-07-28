<!-- 添加分类组件 -->

<template>
  <!-- 输入框 -->
  <template v-if="addingClass">
    <el-input class="input_addclass" v-model="inputContent" ref="input_add">
      <template #suffix>
        <el-icon size="small" style="cursor: pointer" @click="cancelAdding">
          <close />
        </el-icon>
      </template>
    </el-input>
    <el-icon size="large" color="#67C23A" style="top: 6px; left: 6px; cursor: pointer;" @click="$emit('addClassSubmit', inputContent);">
      <check />
    </el-icon>
  </template>
  <!-- 按钮，点击后替换成输入框 -->
  <el-button class="button_addclass" v-else @click="addClassHandler">
    添加分类
  </el-button>
</template>

<script>
export default {
  name: "ClassAdder",
  data() {
    return {
      addingClass: false,
      inputContent: "",
    };
  },
  props: [],
  emits: ['addClassSubmit'],
  created() {},
  methods: {
    cancelAdding() {
      this.$refs['input_add'].clear();
      this.addingClass = false;
    },
    addClassHandler() {
      this.addingClass = true;
      this.$refs['input_add'].focus();
    },
  },
}
</script>

<style>
.button_addclass {
  width: 100px;
}
.input_addclass {
  width: 100px;
}
</style>