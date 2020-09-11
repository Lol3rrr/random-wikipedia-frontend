<template>
  <button
    v-bind:class="{ enable: !isSubscribed, disable: isSubscribed }"
    v-on:click="updatePush"
  >
    <span v-if="isSubscribed">Disable</span>
    <span v-else>Enable</span>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import loadPublicKey from "@/api/loadPublicKey";
import updateSubscriptionOnServer from "@/api/updateSubscriptionOnServer";
import urlB64ToUint8Array from "@/util/urlB64ToUint8Array";

@Component
export default class Notifications extends Vue {
  data() {
    return {
      isSubscribed: false
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
  }

  updatePush(): void {
    if (this.$data.isSubscribed) {
      this.disablePush();
    } else {
      this.enablePush();
    }
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

        this.$data.isSubscribed = false;
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
.enable {
  color: #111111;
  background-color: #3aaa3a;
}
.disable {
  color: #111111;
  background-color: #aa3a3a;
}
</style>
