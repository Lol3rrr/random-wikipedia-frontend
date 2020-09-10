<template>
  <div v-show="display" class="popup">
    <span>{{ content }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { eventBus, NotificationEvent } from "@/eventBus";

const defaultDisplayDuration = 3 * 1000;

@Component
export default class NotificationPopup extends Vue {
  data() {
    return {
      content: "",
      display: false,
      lastTimeoutID: -1
    };
  }

  mounted() {
    eventBus.$on("notifyPopup", this.eventHandler);
  }
  eventHandler(event: NotificationEvent) {
    this.$data.content = event.Content;

    if (this.$data.lastTimeoutID >= 0) {
      clearTimeout(this.$data.lastTimeoutID);
    }
    this.$data.lastTimeoutID = setTimeout(
      this.removePopup,
      defaultDisplayDuration
    );

    this.$data.display = true;
  }

  removePopup() {
    this.$data.content = "";
    this.$data.display = false;
    this.$data.lastTimeoutID = -1;
  }
}
</script>

<style scoped>
.popup {
  z-index: 3;
  position: fixed;
  top: 12.5vh;
  width: 60vw;
  padding: 1vh 3vw;
  margin-left: 17.5vw;
  background-color: #303030;
  border-radius: 10px;
}
.popup > span {
  color: #c0c0c0;
}
</style>
