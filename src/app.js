const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, shell, globalShortcut } = electron;

const windows = {
  mainWindow: null
};

function hardReset() {
  app.relaunch();
  app.quit();
}

app.on("ready", () => {
  Menu.setApplicationMenu(null);
  globalShortcut.register("CommandOrControl+Q", () => {
    windows.mainWindow = null;
    app.quit();
  });
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    hardReset();
  });
  globalShortcut.register("CommandOrControl+R", () => {
    windows.mainWindow.reload();
  });
  windows.mainWindow = new BrowserWindow({
    title: "SnowyMonitor - informacje o systemie",
    show: false,
    width: 250,
    height: 270,
    frame: false,
    resizable: false
  });
  windows.mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'Pages/mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  windows.mainWindow.on("ready-to-show", () => {
    windows.mainWindow.show();
  });
  windows.mainWindow.on("closed", () => {
    app.quit();
  });
});
