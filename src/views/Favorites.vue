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
          <button v-on:click="deleteFavorite(fav.ID)">X</button>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ArticleEntry from "@/components/ArticleEntry.vue";

import removeFavorite from "@/api/removeFavorite";
import { displayPopup } from "@/util/popUpManager";
import { storeSettings } from "@/util/settingsManager";
import { FavArticle, User } from "@/api/types";

@Component({
  components: {
    ArticleEntry
  }
})
export default class Favorites extends Vue {
  deleteFavorite(favID: string): void {
    removeFavorite(favID, this.$store.state.SessionID)
      .then(() => {
        let index = -1;
        for (const rawTmpIndex in this.$store.state.Settings.Favorites) {
          const tmpIndex = parseInt(rawTmpIndex);
          const element = this.$store.state.Settings.Favorites[
            tmpIndex
          ] as FavArticle;

          if (element.ID == favID) {
            index = tmpIndex;
            break;
          }
        }
        if (index < 0) {
          console.log(`Could not find Favorite with '${favID}' in list`);
          return;
        }

        (this.$store.state.Settings as User).Favorites.splice(index, 1);
        return storeSettings(this.$store.state.Settings);
      })
      .then(() => {
        displayPopup("Removed Favorite");
      })
      .catch(console.log);
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
