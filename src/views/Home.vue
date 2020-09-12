<template>
  <div class="home">
    <h1>Last Article</h1>
    <button v-on:click="getNewArticle()">Load new Article</button>
    <br />
    <article-entry
      :articleTitle="lastArticle.Title"
      :articleURL="lastArticle.URL"
    />
    <br />
    <button v-on:click="addToFavorite()">Add as Favorite</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ArticleEntry from "@/components/ArticleEntry.vue";

import { FavArticle, User, UserList } from "@/api/types";
import loadNewArticle from "@/api/loadNewArticle";
import addUserFavorite from "@/api/addUserFavorite";

import { Article } from "@/util/types";
import loadLastArticle from "@/util/loadLastArticle";
import setLastArticle from "@/util/setLastArticle";

import { displayPopup } from "@/util/popUpManager";
import { storeSettings } from "@/util/settingsManager";

@Component({
  components: {
    ArticleEntry
  }
})
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
      .then(() => {
        displayPopup("Successfully loaded a new Article");
      })
      .catch(console.log);
  }

  articleAlreadyFavorite(article: Article): boolean {
    for (const index in (this.$store.state.Settings as User).Favorites) {
      if (
        (this.$store.state.Settings as User).Favorites[index].ID == article.ID
      ) {
        return true;
      }
    }
    return false;
  }
  addToFavorite(): void {
    const article = this.$data.lastArticle as Article;
    if (this.articleAlreadyFavorite(article)) {
      return;
    }

    addUserFavorite(article, this.$store.state.SessionID)
      .then(() => {
        (this.$store.state.Settings as User).Favorites.push({
          ID: article.ID,
          Name: article.Title,
          URL: article.URL
        } as FavArticle);

        storeSettings(this.$store.state.Settings);

        displayPopup("Added Article to favorites");
      })
      .catch(console.log);
  }
}
</script>

<style scoped>
.article {
  width: 75%;
  margin: auto;
}

.home > h1 {
  margin-bottom: 2vh;
}
.home > button {
  margin-bottom: 5vh;
}
</style>
