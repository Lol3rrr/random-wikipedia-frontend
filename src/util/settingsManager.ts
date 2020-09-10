import { User, UserList, FavArticle } from "@/api/types";

export function storeSettings(user: User): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("settings");
    request.addEventListener("success", function() {
      const db = this.result;

      const transaction = db.transaction("settings", "readwrite");
      transaction.addEventListener("error", () => {
        reject("Could not read from Indexeddb");
      });

      const store = transaction.objectStore("settings");
      const result = store.put(user, "latest");
      result.addEventListener("error", () => {
        reject("Could not find latest Article");
      });
      result.addEventListener("success", () => {
        resolve();
      });
    });

    request.addEventListener("upgradeneeded", function() {
      const db = this.result;
      db.createObjectStore("settings");
    });

    request.addEventListener("error", () => {
      reject(`Could not open Database`);
    });
  });
}

export function loadSettings(): Promise<User> {
  return new Promise<User>((resolve, reject) => {
    const request = indexedDB.open("settings");
    request.onsuccess = function() {
      const db = this.result;

      const transaction = db.transaction("settings", "readonly");
      transaction.addEventListener("error", () => {
        reject("Could not read from Indexeddb");
      });

      const store = transaction.objectStore("settings");
      const result = store.get("latest");
      result.addEventListener("error", () => {
        reject("Could not find latest Article");
      });
      result.addEventListener("success", () => {
        const rawData = result.result;
        if (rawData == undefined) {
          reject(`Could not find user`);
          return;
        }
        const data = rawData as User;

        if (data.Lists.length > 0 && typeof data.Lists[0] == "number") {
          data.Lists = new Array<UserList>();
        }
        if (data.Favorites == undefined) {
          data.Favorites = new Array<FavArticle>();
        }

        resolve(data);
      });
    };

    request.addEventListener("upgradeneeded", function() {
      const db = this.result;
      db.createObjectStore("settings");
    });
  });
}
