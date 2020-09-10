<template>
  <div class="settings">
    <h1>Settings</h1>
    <h2>Notifications</h2>
    <notifications />
    <hr />
    <h2>Notification Time</h2>
    <time-selector />
    <hr />
    <h2>Lists</h2>
    <lists />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Notifications from "@/components/Notifications.vue";
import TimeSelector from "@/components/TimeSelector.vue";
import Lists from "@/components/Lists.vue";

@Component({
  components: {
    Notifications,
    TimeSelector,
    Lists
  }
})
export default class Settings extends Vue {}
</script>

<style scoped>
hr {
  color: #222222;
  background-color: #222222;
  border: solid;
  border-radius: 5px;
}

h1 {
  margin-top: 2vh;
}

h2 {
  margin-bottom: 3vh;
}
</style>
