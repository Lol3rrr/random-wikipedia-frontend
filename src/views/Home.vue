<template>
  <div class="home">
    <h1>Home</h1>
    <div>
      <h2>Last Article</h2>
      <p>Title: {{ lastArticle.Title }}</p>
      <p>URL: {{ lastArticle.URL }}</p>
    </div>
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
