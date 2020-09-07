<template>
  <div id="app">
    <div v-if="this.$store.state.SessionID.length > 0">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/settings">Settings</router-link>
      </div>
      <router-view />
    </div>
    <div v-else>
      <login-menu />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import LoginMenu from "@/components/Login.vue";

@Component({
  components: {
    LoginMenu
  }
})
export default class App extends Vue {
  mounted() {
    this.$store.dispatch("updateSessionID").catch(console.log);
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
}

#nav {
  padding: 30px;
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
</style>
