var app = require('app')
var BrowserWindow = require('browser-window')
var Tray = require('tray')
var nativeImage = require('native-image')
var mainWindow = null

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    'width': 700,
    'height': 400,
    'frame': false,
    'show': false,
    'skip-taskbar': false
  })

  mainWindow.loadUrl('file://' + __dirname + '/repl.html')

  mainWindow.on('blur', function () {
    mainWindow.hide()
  })

  var trayIcon = new Tray(nativeImage.createFromPath(__dirname + '/icon.png'))

  trayIcon.setToolTip(app.getName())

  trayIcon.on('clicked', function (e, b) {
    mainWindow.setPosition(b.x - 350, 0)
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
})
