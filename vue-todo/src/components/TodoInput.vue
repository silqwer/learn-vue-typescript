<template>
  <div>
    <label for="todo-input">오늘 할 일:</label>
    <input type="text" id="todo-input" :value="item" @input="handleInput" />
    <button @click="addTodo">추가</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  //props: ["item"],
  props: {
    item: {
      type: String,
      required: true
    }
  },
  methods: {
    addTodo() {
      this.$emit("add");
    },
    handleInput(event: InputEvent) {
      // 타입 단언, 안전하지 않은 방법, 나중에 패턴화해서 모듈을 가져다 사용하는 방법를 사용할 예정
      const eventTarget = event.target as HTMLInputElement;
      this.$emit("input", eventTarget.value);
    }
  }
});
</script>

<style scoped></style>
