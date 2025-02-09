/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'org.ctx.browser',
  productName: 'ctx',
  directories: {
    output: 'dist/electron',
    buildResources: 'assets'
  },
  mac: {
    icon: 'assets/logo.icns',
  },
  win: {
    icon: 'assets/logo.ico',
  },
  publish: null,
  npmRebuild: false,
  files: [
    'dist/main/**/*',
    'dist/preload/**/*',
    'dist/render/**/*',
  ],
}

module.exports = config
