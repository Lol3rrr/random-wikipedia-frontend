<template>
  <div>
    <div class="timeWrapper">
      <div class="specificWrapper hourWrapper vericalAlign">
        <p>Hour</p>
        <button
          v-on:click="increaseTime(1, 0)"
          v-on:mousedown="increaseTimeDown(1, 0)"
          v-on:mouseup="increaseTimeUp()"
          v-on:mouseleave="increaseTimeUp()"
          v-on:touchstart="increaseTimeDown(1, 0)"
          v-on:touchend="increaseTimeUp()"
          v-on:touchcancel="increaseTimeUp()"
        >
          +
        </button>
        <span>{{ hour }}</span>
        <button
          v-on:click="increaseTime(-1, 0)"
          v-on:mousedown="increaseTimeDown(-1, 0)"
          v-on:mouseup="increaseTimeUp()"
          v-on:mouseleave="increaseTimeUp()"
          v-on:touchstart="increaseTimeDown(-1, 0)"
          v-on:touchend="increaseTimeUp()"
          v-on:touchcancel="increaseTimeUp()"
        >
          -
        </button>
      </div>
      <div class="specificWrapper minuteWrapper vericalAlign">
        <p>Minute</p>
        <button
          v-on:click="increaseTime(0, 1)"
          v-on:mousedown="increaseTimeDown(0, 1)"
          v-on:mouseup="increaseTimeUp()"
          v-on:mouseleave="increaseTimeUp()"
          v-on:touchstart="increaseTimeDown(0, 1)"
          v-on:touchend="increaseTimeUp()"
          v-on:touchcancel="increaseTimeUp()"
        >
          +
        </button>
        <span>{{ minute }}</span>
        <button
          v-on:click="increaseTime(0, -1)"
          v-on:mousedown="increaseTimeDown(0, -1)"
          v-on:mouseup="increaseTimeUp()"
          v-on:mouseleave="increaseTimeUp()"
          v-on:touchstart="increaseTimeDown(0, -1)"
          v-on:touchend="increaseTimeUp()"
          v-on:touchcancel="increaseTimeUp()"
        >
          -
        </button>
      </div>
    </div>
    <button v-on:click="update">Update</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import updateNotifyTime from "@/api/updateNotifyTime";

import validateTime from "@/util/validateTime";
import { storeSettings } from "@/util/settingsManager";
import { displayPopup } from "@/util/popUpManager";

@Component
export default class TimeSelector extends Vue {
  data() {
    return {
      hour: 0,
      minute: 0,
      increaseID: -1
    };
  }
  mounted() {
    this.displaySavedTime();

    this.$store.watch(
      (state, getters) => getters.Settings,
      () => {
        this.displaySavedTime();
      }
    );
  }

  displaySavedTime() {
    const notificationTime =
      this.$store.state.Settings.Settings?.NotificationTime ?? 0;
    const hour = Math.floor(notificationTime / 100);
    const minute = notificationTime - hour * 100;

    this.$data.hour = hour;
    this.$data.minute = minute;
  }

  increaseTimeDown(hourFaktor: number, minuteFaktor: number) {
    this.$data.increaseID = setInterval(() => {
      this.increaseTime(hourFaktor, minuteFaktor);
    }, 100);
  }
  increaseTimeUp() {
    clearInterval(this.$data.increaseID);
    this.$data.increaseID = -1;
  }

  increaseTime(hourFaktor: number, minuteFaktor: number) {
    const hourIncrease = 1 * hourFaktor;
    const beforeHour = this.$data.hour;
    const rawResultHour = beforeHour + hourIncrease;

    const minuteIncrease = 15 * minuteFaktor;
    const beforeMinute = this.$data.minute;
    const rawResultMinute = beforeMinute + minuteIncrease;

    const { Hour, Minute } = validateTime(rawResultHour, rawResultMinute);

    this.$data.hour = Hour;
    this.$data.minute = Minute;
  }

  update() {
    const rawHour = this.$data.hour;
    const rawMinute = this.$data.minute;

    const offset = new Date().getTimezoneOffset();
    const hourOffset = Math.floor(offset / 60);
    const minuteOffset = Math.floor(offset - hourOffset * 60);

    const rawUtcHour = rawHour + hourOffset;
    const rawUtcMinute = rawMinute + minuteOffset;

    const { Hour, Minute } = validateTime(rawUtcHour, rawUtcMinute);

    updateNotifyTime(this.$store.state.SessionID, Hour, Minute)
      .then(() => {
        this.$store.state.Settings.Settings.NotificationTime =
          rawHour * 100 + rawMinute;
        return storeSettings(this.$store.state.Settings);
      })
      .then(() => {
        displayPopup("Updated Notification Time");
      })
      .catch(console.log);
  }
}
</script>

<style scoped>
.timeWrapper {
  margin: auto;
  width: 10em;
  padding-bottom: 6.5em;
}
.specificWrapper {
  --paddingAmount: 20vw;
  position: relative;
  width: 5em;
}
.hourWrapper {
  float: left;
}
.minuteWrapper {
  float: right;
}
.vericalAlign > * {
  display: block;
  margin: auto;
}
.specificWrapper > button {
  width: 1.5em;
}
</style>
