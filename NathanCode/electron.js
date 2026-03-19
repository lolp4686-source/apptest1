const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const path = require('path')
const fs   = require('fs')

let win

function createWindow() {
  win = new BrowserWindow({
    width:  1400,
    height: 900,
    minWidth:  800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#1e1e1e',
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  // Menu natif
  const menu = Menu.buildFromTemplate([
    {
      label: 'Fichier',
      submenu: [
        { label: 'Nouveau fichier',    accelerator: 'CmdOrCtrl+N',       click: () => win.webContents.send('menu', 'new-file') },
        { label: 'Ouvrir un fichier',  accelerator: 'CmdOrCtrl+O',       click: openFile },
        { label: 'Sauvegarder',        accelerator: 'CmdOrCtrl+S',       click: () => win.webContents.send('menu', 'save') },
        { label: 'Sauvegarder sous',   accelerator: 'CmdOrCtrl+Shift+S', click: saveAs },
        { type: 'separator' },
        { label: 'Quitter',            accelerator: 'CmdOrCtrl+Q',       role: 'quit' }
      ]
    },
    {
      label: 'Édition',
      submenu: [
        { label: 'Annuler',     accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Rétablir',    accelerator: 'CmdOrCtrl+Y', role: 'redo' },
        { type: 'separator' },
        { label: 'Couper',      accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copier',      accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Coller',      accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: 'Tout sélectionner', accelerator: 'CmdOrCtrl+A', role: 'selectAll' },
        { type: 'separator' },
        { label: 'Rechercher',  accelerator: 'CmdOrCtrl+F', click: () => win.webContents.send('menu', 'search') },
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        { label: 'Terminal',     accelerator: 'CmdOrCtrl+`',       click: () => win.webContents.send('menu', 'toggle-terminal') },
        { label: 'Barre latérale', accelerator: 'CmdOrCtrl+B',    click: () => win.webContents.send('menu', 'toggle-sidebar') },
        { type: 'separator' },
        { label: 'Zoom +',       accelerator: 'CmdOrCtrl+=',       role: 'zoomIn' },
        { label: 'Zoom -',       accelerator: 'CmdOrCtrl+-',       role: 'zoomOut' },
        { label: 'Zoom réel',    accelerator: 'CmdOrCtrl+0',       role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Plein écran',  accelerator: 'F11',                role: 'togglefullscreen' },
        { label: 'DevTools',     accelerator: 'F12',                click: () => win.webContents.toggleDevTools() },
      ]
    },
    {
      label: 'Aide',
      submenu: [
        { label: 'À propos de NathanCode', click: showAbout }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
}

function openFile() {
  const paths = dialog.showOpenDialogSync(win, {
    title: 'Ouvrir un fichier',
    filters: [
      { name: 'Code', extensions: ['js','ts','py','html','css','json','md','txt','jsx','tsx','vue','go','rs'] },
      { name: 'Tous les fichiers', extensions: ['*'] }
    ],
    properties: ['openFile']
  })
  if (paths && paths[0]) {
    const content = fs.readFileSync(paths[0], 'utf8')
    win.webContents.send('open-file', { path: paths[0], content })
  }
}

function saveAs() {
  const savePath = dialog.showSaveDialogSync(win, {
    title: 'Enregistrer sous',
    filters: [{ name: 'Tous les fichiers', extensions: ['*'] }]
  })
  if (savePath) win.webContents.send('save-as', savePath)
}

function showAbout() {
  dialog.showMessageBox(win, {
    type:    'info',
    title:   'NathanCode',
    message: 'NathanCode v1.0.0',
    detail:  'Éditeur de code moderne inspiré de VSCode.\nCréé par NathanFR3.\n\nElectron + HTML/CSS/JS'
  })
}

ipcMain.on('save-file', (event, { filePath, content }) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8')
    event.reply('save-file-result', { success: true })
  } catch (e) {
    event.reply('save-file-result', { success: false, error: e.message })
  }
})

app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
