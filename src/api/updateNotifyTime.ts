export default function updateNotifyTime(
  sessionID: string,
  hour: number,
  minute: number
): Promise<void> {
  const time = hour * 100 + minute;
  return new Promise<void>(function(resolve, reject) {
    const updateSubscriptionURL = "https://wiki.lol3r.net/api/settings/update";

    fetch(updateSubscriptionURL, {
      headers: {
        "Content-Type": "application/json",
        "x-session": sessionID
      },
      body: JSON.stringify({
        NotificationTime: time
      }),
      method: "POST"
    })
      .then(response => {
        if (response.status != 200) {
          reject(`Returned non 200-Statuscode ${response.status}`);
          return;
        }

        resolve();
      })
      .catch(reject);
  });
}
