<template>
  <div class="home">
    <h1>Last Article</h1>
    <a target="_blank" rel="noopener noreferrer" :href="lastArticle.URL">{{
      lastArticle.Title
    }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Article } from "@/util/types";
import loadLastArticle from "@/util/loadLastArticle";

@Component
export default class Home extends Vue {
  data() {
    return {
      lastArticle: {} as Article
    };
  }

  mounted() {
    loadLastArticle()
      .then(article => {
        this.$data.lastArticle = article;
      })
      .catch(console.log);
  }
}
</script>

<style scoped>
.article {
  width: 75%;
  margin: auto;
  background-color: #2f2f2f;
}

a,
a:hover,
a:visited {
  color: inherit;
  text-decoration: none;
  font-size: 2rem;
  color: #dddddd;
}
</style>
