<template>
  <div>
    <div class="timeWrapper">
      <div class="specificWrapper hourWrapper vericalAlign">
        <p>Hour</p>
        <button v-on:click="increaseTime(1, 0)">+</button>
        <span>{{ hour }}</span>
        <button v-on:click="increaseTime(-1, 0)">-</button>
      </div>
      <div class="specificWrapper minuteWrapper vericalAlign">
        <p>Minute</p>
        <button v-on:click="increaseTime(0, 1)">+</button>
        <span>{{ minute }}</span>
        <button v-on:click="increaseTime(0, -1)">-</button>
      </div>
    </div>
    <button v-on:click="update">Update</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import updateNotifyTime from "@/api/updateNotifyTime";

import validateTime from "@/util/validateTime";

@Component
export default class TimeSelector extends Vue {
  data() {
    return {
      hour: 0,
      minute: 0
    };
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
        console.log("Worked");
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
