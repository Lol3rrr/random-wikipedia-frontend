<template>
  <div id="app">
    <div v-if="this.$store.state.SessionID.length > 0">
      <notification-popup />
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/favorites">Favorites</router-link> |
        <router-link to="/settings">Settings</router-link>
      </div>
      <div v-touch:swipe.left="swipeLeft" v-touch:swipe.right="swipeRight">
        <transition :name="transitionName" mode="out-in">
          <router-view />
        </transition>
      </div>
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
html {
  background-color: #1a1a1a;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #888888;
  overflow: hidden;
}

#nav {
  padding: 30px;
  padding-bottom: 15px;
}

#nav a {
  font-weight: bold;
  color: #888888;
}

#nav a.router-link-exact-active {
  color: #eeeeee;
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
  color: #bbbbbb;
  background-color: #2a2a2a;
  border: none;
  border-radius: 4px;
  padding: 3px 8px 2px 8px;
}
button:focus {
  outline: none;
  border: none;
  background-color: #505050;
}

hr {
  color: #222222;
  background-color: #222222;
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
