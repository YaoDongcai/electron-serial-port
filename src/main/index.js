'use strict'

import { app, BrowserWindow, Menu } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
// init window
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    minHeight: '900px',
    minWidth: '600px',
    show: false,
    webPreferences: {
      nodeIntegration: true, // 是否完整支持node
      webSecurity: false // 降低安全性 是为了dev 开发
    }
  })
  // 关闭toolMenu 菜单栏
  Menu.setApplicationMenu(null)
  // createMenu() native 创建menu  其实更好的方式是利用router 创建
  mainWindow.loadURL(winURL)
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      mainWindow.maximize()
      mainWindow.show()
    }, 2000)
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
// init Menu
function createMenu () {
  // 表示为windows系统
  if (process.platform === 'win32') {
    const menuTemplate = [{
      label: 'App Demo',
      submenu: [{
        role: 'about'
      }, {
        role: 'quit'
      }]
    }]
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
  } else {
    Menu.setApplicationMenu(null)
  }
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // 为苹果系统
    app.quit()
  }
})
// 登录窗口
app.on('login-window', () => {
  mainWindow.setSize(563, 400)
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
