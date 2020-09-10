<template>
  <div class="favorites">
    <h1>Favorites</h1>
    <div class="favList">
      <div v-for="fav in $store.state.Settings.Favorites" v-bind:key="fav.ID">
        <div class="articleContainer">
          <article-entry
            :articleTitle="fav.Name"
            :articleURL="fav.URL"
            class="article"
          />
          <button v-on:click="removeFavorite(fav.ID)">X</button>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ArticleEntry from "@/components/ArticleEntry.vue";

@Component({
  components: {
    ArticleEntry
  }
})
export default class Favorites extends Vue {
  removeFavorite(favID: string): void {
    console.log(`Removed Favorite: ${favID}`);
  }
}
</script>

<style scoped>
.favorite {
  overflow: hidden;
}
.favList {
  height: 70vh;
  overflow-y: auto;
}

.articleContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.article {
  width: 80vw;
}
hr {
  width: 75vw;
}
</style>
