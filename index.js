const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;

const npmGuiTitle = 'NPM GUI';

let mainWindow = null;

function createMainWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1024,
    height: 728,
    resizable: false,
    backgroundColor: '#262e3a'
  });

  mainWindow.loadURL(`file://${__dirname}/src/index-electron.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

class MenuBuilder {

  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(options) {

    let template;

    if (process.platform === 'darwin') {
      template = this.buildDarwinTemplate();
    } else {
      template = this.buildDefaultTemplate(options);
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu
        .buildFromTemplate([{
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }])
        .popup(this.mainWindow);
    });
  }

  buildDarwinTemplate(options) {
    const subMenuAbout = {
      label: 'Electron',
      submenu: [
        { label: 'Manage New Project', accelerator: 'Command+N', click: () => { createMainWindow() } },
        { type: 'separator' },
        { label: `Hide ${npmGuiTitle}`, accelerator: 'Command+H', selector: 'hide:' },
        { type: 'separator' },
        { label: 'Minimize', accelerator: 'Command+M', selector: 'performMiniaturize:' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: () => { app.quit(); } },
        { type: 'separator' },
        { label: `About ${npmGuiTitle}`, selector: 'orderFrontStandardAboutPanel:' },
      ]
    };

    return [
      subMenuAbout
    ];
  }

  buildDefaultTemplate(options) {
    const templateDefault = [{
      label: '&File',
      submenu: [{
        label: '&New Dashboard',
        accelerator: 'Ctrl+N',
        click: () => options.actions.createWindow()
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click: () => {
          this.mainWindow.close();
        }
      }]
    }];

    return templateDefault;
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  createMainWindow();

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
});
