export default function removeUserList(
  listID: string,
  sessionID: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const updateSubscriptionURL =
      "https://wiki.lol3r.net/api/settings/lists/delete";

    fetch(updateSubscriptionURL, {
      headers: {
        "Content-Type": "application/json",
        "x-session": sessionID
      },
      body: JSON.stringify({
        listID: listID
      }),
      method: "POST"
    })
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}
