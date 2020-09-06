<template>
  <div class="settings">
    <h1>This are the settings</h1>
    <button v-on:click="updatePush">
      <span v-if="isSubscribed">Disable Push Messaging</span>
      <span v-else>Enable Push Messaging</span>
    </button>
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

import { List } from "@/api/types";
import loadPublicKey from "@/api/loadPublicKey";
import updateSubscriptionOnServer from "@/api/updateSubscriptionOnServer";
import loadAllLists from "@/api/loadAllLists";
import addUserList from "@/api/addUserList";

import urlB64ToUint8Array from "@/util/urlB64ToUint8Array";

@Component
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
      // Unsubscribe
    } else {
      this.enablePush();
    }
  }
  addList(listID: string): void {
    console.log("Adding list:", listID);
    addUserList(listID, this.$store.state.SessionID)
      .then(() => {
        console.log("Worked");
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
