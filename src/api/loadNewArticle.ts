import { Article } from "@/util/types";

export default function loadNewArticle(lists: Array<number>): Promise<Article> {
  return new Promise<Article>((resolve, reject) => {
    const listsURL = "https://wiki.lol3r.net/api/article/random";

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch(listsURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        lists: lists
      })
    })
      .then(response => {
        return response.json();
      })
      .then((result: Article) => {
        resolve(result);
      })
      .catch(reject);
  });
}
