import { Article } from "./types";

export default function setLastArticle(article: Article): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("data", 1);
    request.onsuccess = function() {
      const db = this.result;

      const transaction = db.transaction("articles", "readwrite");
      transaction.addEventListener("error", () => {
        reject("Could not read from Indexeddb");
      });

      const store = transaction.objectStore("articles");
      const result = store.put({ id: "latest", data: article });
      result.addEventListener("success", () => {
        resolve();
      });
      result.addEventListener("error", () => {
        reject("Could not insert latest Article");
      });
    };

    request.addEventListener("upgradeneeded", function() {
      const db = this.result;
      db.createObjectStore("articles", { keyPath: "id" });
    });
  });
}
