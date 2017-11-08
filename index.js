/* eslint strict: 0 */
'use strict';

const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const menue         = electron.Menu;
let mainWindow       = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 728, resizable: false });
  menue.setApplicationMenu(null);

  mainWindow.loadURL(`file://${__dirname}/src/index-electron.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
})
