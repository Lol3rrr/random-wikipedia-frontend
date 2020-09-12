<template>
  <div class="popup" v-bind:class="{ hidden: !display, visible: display }">
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
    this.$data.display = false;
    this.$data.lastTimeoutID = -1;
  }
}
</script>

<style scoped>
.hidden {
  max-height: 0;
  visibility: hidden;
  opacity: 0;
  padding: 0vh 3vw;
}
.visible {
  max-height: 40vh;
  visibility: visible;
  opacity: 1;
  padding: 1vh 3vw;
}
.popup {
  opacity: 100;
  z-index: 3;
  position: fixed;
  top: 12.5vh;
  width: 60vw;
  margin-left: 17.5vw;
  background-color: var(--popup-background-color);
  border-radius: 10px;
  overflow: hidden;
  transition: all 500ms ease-in-out;
}
.popup > span {
  color: var(--popup-text-color);
}
</style>
