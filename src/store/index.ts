import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    SessionID: ""
  },
  mutations: {
    setSessionID(state, payload: string): void {
      state.SessionID = payload;
    }
  },
  actions: {
    updateSessionID(context): void {
      function getCookie(cname: string): string {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == " ") {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

      const nSessionID = getCookie("SessionID");
      context.commit("setSessionID", nSessionID);
    }
  },
  modules: {}
});
