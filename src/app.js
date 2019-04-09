const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, shell, globalShortcut, Tray, nativeImage } = electron;

const windows = {
  mainWindow: null
};

let tray = null;

const trayContextMenu = Menu.buildFromTemplate([
  {
    label: "Włącz/Wyłącz nagrywanie",
    click() {
      windows.mainWindow.webContents.send("RecordCall", true);
    }
  },
  {
    label: "Maksymalizuj/Minimalizuj",
    click() {
      windows.mainWindow.isMinimized() === true ? windows.mainWindow.restore() : windows.mainWindow.minimize();
    }
  },
  {
    label: "Wyjdź",
    click() {
      app.quit();
    }
  }
]);

function hardReset() {
  app.relaunch();
  app.quit();
}

app.on("ready", () => {
  const myTrayIconPath =  path.join(__dirname, "Img/icon.png");
  Menu.setApplicationMenu(null);
  tray = new Tray(nativeImage.createFromPath(myTrayIconPath));
  tray.setToolTip("Snowy Recorder");
  tray.setContextMenu(trayContextMenu);
  tray.on("click", () => {
    windows.mainWindow.isMinimized() === true ? windows.mainWindow.restore() : windows.mainWindow.minimize();
  });
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
    resizable: false,
    skipTaskbar: true
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
    windows.mainWindow = null;
    app.quit();
  });
});
