export default function updateSubscriptionOnServer(
  sessionID: string,
  subscription: PushSubscription
): Promise<void> {
  const updateSubscriptionURL =
    "https://wiki.lol3r.net/api/subscription/update";

  return new Promise<void>(function(resolve, reject) {
    fetch(updateSubscriptionURL, {
      headers: {
        "Content-Type": "application/json",
        "x-session": sessionID
      },
      body: JSON.stringify({
        Subscription: JSON.stringify(subscription)
      }),
      method: "POST"
    })
      .then(response => {
        if (response.status != 200) {
          reject("Non 200-Statuscode: " + response.status);
          return;
        }

        resolve();
      })
      .catch(err => console.error(err));
  });
}
