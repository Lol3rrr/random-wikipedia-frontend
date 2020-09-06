import { Article } from "@/util/types";

export default function loadLastArticle(): Promise<Article> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("data", 1);
    request.onsuccess = function() {
      const db = this.result;

      const transaction = db.transaction("articles", "readonly");
      transaction.addEventListener("error", () => {
        reject("Could not read from Indexeddb");
      });

      const store = transaction.objectStore("articles");
      const result = store.get("latest");
      result.addEventListener("success", () => {
        resolve(result.result.data);
      });
      result.addEventListener("error", () => {
        reject("Could not find latest Article");
      });
    };

    request.addEventListener("upgradeneeded", function() {
      const db = this.result;
      db.createObjectStore("articles", { keyPath: "id" });
    });
  });
}
