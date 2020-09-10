export default function removeFavorite(
  articleID: string,
  sessionID: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const updateSubscriptionURL =
      "https://wiki.lol3r.net/api/settings/favorites/delete";

    fetch(updateSubscriptionURL, {
      headers: {
        "Content-Type": "application/json",
        "x-session": sessionID
      },
      body: JSON.stringify({
        articleID: articleID
      }),
      method: "POST"
    })
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}
