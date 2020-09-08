<template>
  <div class="settings">
    <h1>Settings</h1>
    <h2>Notifications</h2>
    <button
      v-bind:class="{ enable: !isSubscribed, disable: isSubscribed }"
      v-on:click="updatePush"
    >
      <span v-if="isSubscribed">Disable</span>
      <span v-else>Enable</span>
    </button>
    <hr />
    <h2>Notification Time</h2>
    <time-selector />
    <hr />
    <h2>Lists</h2>
    <div>
      <div v-for="list in lists" v-bind:key="list.ID">
        <p>{{ list.Title }}</p>
        <button v-on:click="addList(list.ID)">Add List</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TimeSelector from "@/components/TimeSelector.vue";

import { List } from "@/api/types";
import loadPublicKey from "@/api/loadPublicKey";
import updateSubscriptionOnServer from "@/api/updateSubscriptionOnServer";
import loadAllLists from "@/api/loadAllLists";
import addUserList from "@/api/addUserList";

import urlB64ToUint8Array from "@/util/urlB64ToUint8Array";
import listAlreadyAdded from "@/util/listAlreadyAdded";
import { storeSettings } from "@/util/settingsManager";

@Component({
  components: {
    TimeSelector
  }
})
export default class Home extends Vue {
  data() {
    return {
      isSubscribed: false,
      lists: Array<List>()
    };
  }
  mounted() {
    navigator.serviceWorker
      .getRegistration()
      .then(registration => {
        if (registration == undefined) {
          return;
        }

        return registration.pushManager.getSubscription();
      })
      .then(subscription => {
        if (subscription == undefined) {
          return;
        }

        this.$data.isSubscribed = true;
      })
      .catch(console.log);

    loadAllLists()
      .then(lists => {
        this.$data.lists = lists;
      })
      .catch(console.log);
  }

  updatePush(): void {
    if (this.$data.isSubscribed) {
      this.disablePush();
    } else {
      this.enablePush();
    }
  }
  addList(listID: string): void {
    addUserList(listID, this.$store.state.SessionID)
      .then(() => {
        if (listAlreadyAdded(this.$store.state.Settings, listID)) {
          return;
        }

        const numberValue = parseInt(listID);
        if (numberValue == undefined) {
          return;
        }
        if (this.$store.state.Settings.Lists == undefined) {
          this.$store.state.Settings.Lists = Array<number>();
        }
        this.$store.state.Settings.Lists.push(numberValue);
        storeSettings(this.$store.state.Settings)
          .then(() => {
            console.log("Saved new lists");
          })
          .catch(console.log);
      })
      .catch(console.log);
  }

  disablePush(): void {
    if (!("PushManager" in window)) {
      console.log("Push messages not supported");
      return;
    }

    navigator.serviceWorker
      .getRegistration()
      .then(registration => {
        if (registration == undefined) {
          console.log("No service worker registration");
          return;
        }

        return registration.pushManager.getSubscription();
      })
      .then(subscription => {
        if (subscription == undefined) {
          console.log("No push-manager subscription");
          return;
        }

        return subscription.unsubscribe();
      })
      .then(successful => {
        if (!successful) {
          console.log("Could not unsubscribe push");
          return;
        }

        console.log("Unsubscribed");
      })
      .catch(console.log);
  }

  enablePush(): void {
    if (!("PushManager" in window)) {
      console.log("Push messages not supported");
      return;
    }

    navigator.serviceWorker
      .getRegistration()
      .then(registration => {
        if (registration == undefined) {
          console.log("No service worker registration");
          return;
        }

        const publicKey = loadPublicKey();
        const applicationServerKey = urlB64ToUint8Array(publicKey);
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        });
      })
      .then(subscription => {
        if (subscription == undefined) {
          return;
        }

        return updateSubscriptionOnServer(
          this.$store.state.SessionID,
          subscription
        );
      })
      .then(() => {
        this.$data.isSubscribed = true;
      })
      .catch(console.log);
  }
}
</script>

<style scoped>
hr {
  color: #222222;
  background-color: #222222;
  border: solid;
}

.enable {
  color: #111111;
  background-color: #3aaa3a;
}
.disable {
  color: #111111;
  background-color: #aa3a3a;
}
</style>
