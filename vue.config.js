module.exports = {
  pwa: {
    name: "Random Wikipedia",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/serviceWorker/sw.js"
    }
  }
}