module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js'
    },
    name: 'Bonyk',
    themeColor: '#10b981',
    msTileColor: '#4c4c4c',
    manifestPath: 'manifest.json',
    iconPaths: {
      favicon32: 'icons/favicon-32x32.png',
      favicon16: 'icons/favicon-16x16.png',
      appleTouchIcon: 'icons/apple-touch-icon.png',
      maskIcon: 'icons/safari-pinned-tab.svg',
      msTileImage: 'icons/mstile-150x150.png'
    },
    manifestOptions: {
      background_color: '#10b981',
      icons: [
        {
          'src': 'icons/android-chrome-192x192.png',
          'sizes': '192x192',
          'type': 'image/png'
        },
        {
          'src': 'icons/android-chrome-512x512.png',
          'sizes': '512x512',
          'type': 'image/png'
        }
      ]
    }
  }
}
