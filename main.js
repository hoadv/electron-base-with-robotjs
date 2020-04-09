// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')
const url = require('url')
const iconpath = path.join(__dirname, './images/mouse.ico')
var quit = false;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconpath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  let appIcon = new Tray(iconpath)

  appIcon.addListener('click', () => {
    mainWindow.show()
  })

  let contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show', click: function () {
        mainWindow.show()
      }
    },
    {
      label: 'Quit', click: function () {
        mainWindow.close()
        mainWindow.destroy()
      }
    }
  ]);

  appIcon.setContextMenu(contextMenu)

  mainWindow.on('minimize', function (event) {
    event.preventDefault()
    console.log('minimize')
    mainWindow.hide()
  });

  mainWindow.on('close', function (event) {
    event.preventDefault()
    mainWindow.hide()
    return false
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
