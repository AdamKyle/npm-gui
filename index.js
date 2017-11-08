/* eslint strict: 0 */
'use strict';

const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow       = null;

require('electron-reload')(__dirname);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 728 });

  mainWindow.loadURL(`file://${__dirname}/src/index-electron.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
})
