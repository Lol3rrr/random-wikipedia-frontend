export default function addUserList(
  listID: string,
  sessionID: string
): Promise<void> {
  return new Promise(function(resolve, reject) {
    const updateSubscriptionURL =
      "https://wiki.lol3r.net/api/settings/lists/add";

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
