import { Article } from "@/util/types";

export default function addUserFavorite(
  article: Article,
  sessionID: string
): Promise<void> {
  return new Promise(function(resolve, reject) {
    const addUserFavoriteURL =
      "https://wiki.lol3r.net/api/settings/favorites/add";

    fetch(addUserFavoriteURL, {
      headers: {
        "Content-Type": "application/json",
        "x-session": sessionID
      },
      body: JSON.stringify(article),
      method: "POST"
    })
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}
