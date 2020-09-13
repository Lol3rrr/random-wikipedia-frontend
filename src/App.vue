<template>
  <div
    id="app"
    v-touch:swipe.left="swipeLeft"
    v-touch:swipe.right="swipeRight"
    class="darkmode"
  >
    <div v-if="this.$store.state.SessionID.length > 0">
      <notification-popup />
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/favorites">Favorites</router-link> |
        <router-link to="/settings">Settings</router-link>
      </div>
      <transition :name="transitionName" mode="out-in">
        <router-view />
      </transition>
    </div>
    <div v-else>
      <login-menu />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import LoginMenu from "@/components/Login.vue";
import NotificationPopup from "@/components/NotificationPopup.vue";
import { Route } from "vue-router";
import { routes } from "./router";

const routeNumbers = {
  Home: 0,
  Favorites: 1,
  Settings: 2
} as {
  [key: string]: number;
};

@Component({
  components: {
    LoginMenu,
    NotificationPopup
  }
})
export default class App extends Vue {
  data() {
    return {
      transitionName: "slide-right"
    };
  }
  mounted() {
    this.$store.dispatch("updateSessionID").catch(console.log);
    this.$store.dispatch("updateSettings").catch(console.log);
  }
  @Watch("$route")
  changedRoute(to: Route, from: Route) {
    if (to.name == undefined || from.name == undefined) {
      return;
    }

    const toNumber = routeNumbers[to.name];
    const fromNumber = routeNumbers[from.name];
    this.$data.transitionName =
      fromNumber < toNumber ? "slide-right" : "slide-left";
  }

  swipeLeft() {
    this.swipe(1);
  }
  swipeRight() {
    this.swipe(-1);
  }
  swipe(direction: number) {
    const routeName = this.$router.currentRoute.name;
    if (routeName == undefined) {
      return;
    }

    const currentRoute = routeNumbers[routeName];
    const goalRoute = currentRoute + direction;
    if (goalRoute < 0 || goalRoute > routes.length) {
      return;
    }

    this.$router.push(routes[goalRoute].path);
  }
}
</script>

<style>
.darkmode {
  --background-color: #1a1a1a;
  --input-background-color: #2d2d2d;
  --input-text-color: #cccccc;
  --header-color: #888888;
  --text-color: #bbbbbb;
  --button-background-color: #2a2a2a;
  --button-focus-background-color: #505050;
  --hr-color: #222222;
  --link-color: #d8d8d8;
  --popup-background-color: #303030;
  --popup-text-color: #c0c0c0;
  --valid-color: #4fff4f;
  --invalid-color: #ff3f3f;
  --enabled-color: #3aaa3a;
  --disabled-color: #aa3a3a;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  min-height: 100vh;
  width: 100vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--header-color);
  background-color: var(--background-color);
  overflow-y: auto;
  overflow-x: hidden;
}

#nav {
  padding: 30px;
  padding-bottom: 15px;
}

#nav a {
  font-weight: bold;
  color: var(--header-color);
}

#nav a.router-link-exact-active {
  filter: brightness(150%);
}

h1 {
  font-size: 3rem;
  margin-top: 2vh;
}
h2 {
  font-size: 2.5rem;
}

button,
span,
p,
a {
  font-size: 1.2rem;
}

button {
  color: var(--text-color);
  background-color: var(--button-background-color);
  border: none;
  border-radius: 4px;
  padding: 3px 8px 2px 8px;
}
button:focus {
  outline: none;
  border: none;
  background-color: var(--button-focus-background-color);
}

hr {
  color: var(--hr-color);
  background-color: var(--hr-color);
  border: solid;
  border-radius: 5px;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: 0.5s ease-in-out;
}
.slide-left-enter {
  transform: translate(-100%, 0);
}
.slide-left-leave-to {
  transform: translate(100%, 0);
}
.slide-right-enter {
  transform: translate(100%, 0);
}
.slide-right-leave-to {
  transform: translate(-100%, 0);
}
</style>
