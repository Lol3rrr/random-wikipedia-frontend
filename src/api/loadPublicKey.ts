export default function loadPublicKey(): string {
  const keyURL = "https://wiki.lol3r.net/api/publickey";

  const xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open("GET", keyURL, false);
  xmlHTTP.send(null);

  const responseJSON = JSON.parse(xmlHTTP.responseText);
  return responseJSON.PublicKey;
}
