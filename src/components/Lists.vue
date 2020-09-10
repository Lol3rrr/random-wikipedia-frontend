<template>
  <div>
    <button v-on:click="addLists()">Add Lists</button>
    <div class="userLists">
      <div
        v-for="list in $store.state.Settings.Lists"
        v-bind:key="list.ID"
        class="userList"
      >
        <p>{{ list.Name }}</p>
        <button v-on:click="removeList(list.ID)">Remove List</button>
        <hr class="listHR" />
      </div>
    </div>
    <div v-bind:class="{ hidden: !displayAll }" class="listPopup">
      <span class="closeX" v-on:click="closeLists()">X</span>
      <h2>Add Lists</h2>
      <div v-for="list in lists" v-bind:key="list.ID">
        <div v-if="isNotAlreadyAdded(list.ID)">
          <p class="newListTitle">{{ list.Title }}</p>
          <button v-on:click="addList(list.ID)">Add List</button>
          <hr class="newListHR" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { List, User, UserList } from "@/api/types";
import loadAllLists from "@/api/loadAllLists";
import addUserList from "@/api/addUserList";
import removeUserList from "@/api/removeUserList";

import listAlreadyAdded from "@/util/listAlreadyAdded";
import { storeSettings } from "@/util/settingsManager";
import { displayPopup } from '@/util/popUpManager';

@Component
export default class Lists extends Vue {
  data() {
    return {
      lists: Array<List>(),
      displayAll: false
    };
  }

  mounted() {
    loadAllLists()
      .then(lists => {
        this.$data.lists = lists;
      })
      .catch(console.log);
  }

  addLists(): void {
    this.$data.displayAll = !this.$data.displayAll;
  }
  closeLists(): void {
    this.$data.displayAll = false;
  }

  isNotAlreadyAdded(listID: number): boolean {
    for (const index in this.$store.state.Settings.Lists) {
      const element = this.$store.state.Settings.Lists[index];
      if (element.ID == listID) {
        return false;
      }
    }
    
    return true;
  }

  removeList(listID: string): void {
    removeUserList(listID, this.$store.state.SessionID)
      .then(() => {
        const listNumbID = parseInt(listID);

        let index = -1;
        for (const tmpIndex in this.$store.state.Settings.Lists) {
          const element = this.$store.state.Settings.Lists[
            tmpIndex
          ] as UserList;
          if (element.ID == listNumbID) {
            index = parseInt(tmpIndex);
            break;
          }
        }
        if (index < 0) {
          return;
        }

        this.$store.state.Settings.Lists.splice(index, 1);
        return storeSettings(this.$store.state.Settings);
      })
      .then(() => {
        displayPopup("Removed List from Notifications");
      })
      .catch(console.log);
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
        let name = "";
        for (const index in this.$data.lists) {
          if (this.$data.lists[index].ID == numberValue) {
            name = this.$data.lists[index].Title;
            break;
          }
        }
        if (name.length == 0) {
          return;
        }

        if ((this.$store.state.Settings as User).Lists == undefined) {
          (this.$store.state.Settings as User).Lists = Array<UserList>();
        }
        (this.$store.state.Settings as User).Lists.push({
          ID: numberValue,
          Name: name
        });
        return storeSettings(this.$store.state.Settings);
      })
      .then(() => {
        displayPopup("Added List to your Notifications")
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
  border-radius: 5px;
}

.userLists {
  margin-top: 3vh;
}

.userList > p {
  color: #d0d0d0;
  font-size: 20px;
  margin-bottom: 1vh;
}

.listHR {
  width: 70vw;
}

.listPopup {
  z-index: 2;
  position: fixed;
  top: 25vh;
  width: 65vw;
  height: 50vh;
  margin-left: 17.5vw;
  background-color: #303030;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: auto;
}

.listPopup > .closeX {
  position: fixed;
  top: 25.75vh;
  margin-left: 27.5vw;
}

.listPopup > h2 {
  margin-top: 3vh;
  margin-bottom: 2.5vh;
}

.listPopup > div > p {
  color: #dddddd;
}

.hidden {
  visibility: hidden;
}

.newListTitle {
  margin-bottom: 0.25em;
}
.newListHR {
  width: 50vw;
}
</style>
