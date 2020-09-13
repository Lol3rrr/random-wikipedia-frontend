<template>
  <div class="login">
    <h2>Login</h2>
    <input
      type="email"
      placeholder="test@example.com"
      v-model="email"
      v-bind:class="{ valid: isValidEmail }"
    />
    <hr />
    <button id="login-btn" v-on:click="this.Login">Login</button>
    <p v-show="emailSend">
      Email has been sent
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SendLogin from "@/api/sendLogin.ts";

@Component
export default class Login extends Vue {
  data() {
    return {
      email: "",
      isValidEmail: false,
      emailSend: false
    };
  }
  Login(): void {
    if (!this.validateEmail(this.$data.email)) {
      console.log("Invalid email");
      return;
    }

    SendLogin(this.$data.email)
      .then(() => {
        this.$data.emailSend = true;
      })
      .catch(console.log);
  }
  @Watch("email", { immediate: true })
  validateEmail(nVal: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(String(nVal).toLowerCase());

    this.$data.isValidEmail = result;
    return result;
  }
}
</script>

<style scoped>
input {
  padding: 0.5vh 1vw;
  font-size: 16px;
  width: 60vw;
  border: none;
  border-radius: 5px;
  background-color: var(--input-background-color);
  color: var(--input-text-color);
}
input:focus {
  outline: none;
}

hr {
  visibility: hidden;
  width: 60vw;
  border: none;
  border-radius: 5px;
  height: 6px;
  transition: 1s;
  background: linear-gradient(
    to right,
    var(--valid-color) 50%,
    var(--invalid-color) 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;
}
:not(.valid) + hr {
  visibility: visible;
  background-position: right bottom;
}
.valid + hr {
  visibility: visible;
  background-position: left bottom;
}
</style>
