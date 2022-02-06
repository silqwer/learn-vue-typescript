<template>
  <div>
    <ListItem :items="newItems"></ListItem>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { fetchNews } from "@/api";
import ListItem from "../components/ListItem.vue";
export default Vue.extend({
  components: {
    ListItem,
  },

  data() {
    return {
      newItems: [],
    };
  },

  methods: {
    async fetchNewsItems() {
      const response = await fetchNews();
      this.newItems = response.data;
    },
  },

  created() {
    this.fetchNewsItems();
  },
});
</script>

<style></style>
