<template>
  <a target="_blank" rel="noopener noreferrer" :href="articleURL">{{
    articleTitle
  }}</a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ArticleEntry extends Vue {
  @Prop({
    required: true
  })
  articleTitle!: string;

  @Prop({
    required: true
  })
  articleURL!: string;
}
</script>

<style scoped>
a,
a:hover,
a:visited {
  color: inherit;
  text-decoration: none;
  font-size: 2rem;
  color: var(--link-color);
}
</style>
