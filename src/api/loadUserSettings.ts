import { User } from "./types";

export default function loadUserSettings(sessionID: string): Promise<User> {
  return new Promise<User>((resolve, reject) => {
    const loadUserURL = "https://wiki.lol3r.net/api/user/load/myself";

    fetch(loadUserURL, {
      headers: {
        "x-session": sessionID
      },
      method: "GET"
    })
      .then(response => {
        if (response.status != 200) {
          reject(`Returned non 200-Statuscode ${response.status}`);
          return;
        }

        return response.json();
      })
      .then(result => {
        resolve(result);
      })
      .catch(reject);
  });
}
