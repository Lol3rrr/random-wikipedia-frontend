export default function sendLogin(email: string): Promise<boolean> {
  const loginURL = "https://wiki.lol3r.net/api/login";

  return new Promise<boolean>(function(resolve, reject) {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    };
    fetch(loginURL, opts)
      .then(response => {
        if (response.status != 200) {
          reject("Returned non 200-Statuscode " + response.status);
          return;
        }

        resolve();
      })
      .catch(reject);
  });
}
