<template>
  <div class="home">
    <h1>Last Article</h1>
    <button v-on:click="getNewArticle()">Load new Article</button>
    <br />
    <a target="_blank" rel="noopener noreferrer" :href="lastArticle.URL">{{
      lastArticle.Title
    }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import loadNewArticle from "@/api/loadNewArticle";

import { Article } from "@/util/types";
import loadLastArticle from "@/util/loadLastArticle";
import setLastArticle from "@/util/setLastArticle";
import { UserList } from "@/api/types";

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

  getNewArticle(): void {
    console.log("Loading new");
    const ids = new Array<number>();

    for (const index in this.$store.state.Settings.Lists) {
      const element = this.$store.state.Settings.Lists[index] as UserList;
      ids.push(element.ID);
    }

    loadNewArticle(ids)
      .then(article => {
        this.$data.lastArticle = article;
        return setLastArticle(article);
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

.home > h1 {
  margin-bottom: 2vh;
}
.home > button {
  margin-bottom: 5vh;
}
</style>
