import { List } from "@/api/types";

export default function loadAllLists(): Promise<Array<List>> {
  return new Promise(function(resolve, reject) {
    const listsURL = "https://wiki.lol3r.net/api/lists/all";

    fetch(listsURL, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        resolve(result.Lists);
      })
      .catch(reject);
  });
}
