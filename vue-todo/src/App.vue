<template>
  <div>
    <header>
      <h1>Vue todod with typescript</h1>
    </header>
    <main>
      <todo-input
        :item="todoText"
        @input="updateTodoText"
        @add="addTodoItem"
      ></todo-input>
      <div>
        <ul>
          <TodoListItem
            v-for="(todoItem, index) in todoItems"
            :key="index"
            :todoItem="todoItem"
            :index="index"
            @remove="removeTodoItem"
            @toggle="toggleTodoItem"
          ></TodoListItem>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoListItem from "./components/TodoListItem.vue";

const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  save(todoItems: Todo[]) {
    const parsed = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  fetch(): Todo[] {
    const todoItems = localStorage.getItem(STORAGE_KEY) || "[]";
    const result = JSON.parse(todoItems);
    return result;
  }
};

// 객체를 위한 타입
export interface Todo {
  title: string;
  done: boolean;
}

export default Vue.extend({
  components: { TodoInput, TodoListItem },
  data() {
    return {
      todoText: "",
      todoItems: [] as Todo[]
    };
  },
  created() {
    this.fetchTodoItems();
  },
  methods: {
    toggleTodoItem(todoItem: Todo, index: number) {
      this.todoItems.splice(index, 1, {
        title: todoItem.title,
        done: !todoItem.done
      });
      storage.save(this.todoItems);
    },
    removeTodoItem(index: number) {
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems);
    },
    fetchTodoItems() {
      this.todoItems = storage.fetch().sort((a: Todo, b: Todo) => {
        if (a.title < b.title) return -1;
        else if (a.title > b.title) return 1;
        else return 0;
      });
    },
    updateTodoText(value: string) {
      this.todoText = value;
    },
    addTodoItem() {
      const value = this.todoText;
      const todo: Todo = {
        title: value,
        done: false
      };
      this.todoItems.push(todo);
      storage.save(this.todoItems);
      this.initTodoText();
    },
    initTodoText() {
      this.todoText = "";
    }
  }
});
</script>

<style scoped></style>
