import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
const contextMenu = require('electron-context-menu');
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1280,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'customButtonsOnHover',
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()

    contextMenu({
      prepend: (defaultActions, params, browserWindow) => [
        {
          label: 'Inspect element',
          click: () => {
            browserWindow.webContents.inspectElement(params.x, params.y);
          },
        },
      ],
    });
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
