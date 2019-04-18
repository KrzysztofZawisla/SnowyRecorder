const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, shell, globalShortcut, Tray, nativeImage, ipcMain } = electron;

const windows = {
  mainWindow: null
};

let tray = null;
let hideStatue = false;

function hardReset() {
  app.relaunch();
  app.quit();
}

app.on("ready", () => {
  const myTrayIconPath = path.join(__dirname, "Img/icon.png");
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
    title: "SnowyRecorder",
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
  tray = new Tray(nativeImage.createFromPath(myTrayIconPath));
  tray.setToolTip("Snowy Recorder");
  const trayContextMenuTemplate = [
    {
      label: "Włącz nagrywanie",
      click() {
        windows.mainWindow.webContents.send("RecordCall", true);
      }
    },
    {
      label: "Ukryj",
      click() {
        hideStatue === false ? windows.mainWindow.hide() : windows.mainWindow.show();
        hideStatue = !hideStatue;
        trayContextMenuTemplate[1].label === "Ukryj" ? trayContextMenuTemplate[1].label = "Pokaż" : trayContextMenuTemplate[1].label = "Ukryj";
        trayContextMenu = Menu.buildFromTemplate(trayContextMenuTemplate);
        tray.setContextMenu(trayContextMenu);
      }
    },
    {
      label: "Ciemny motyw",
      type: "checkbox",
      click() {
        windows.mainWindow.webContents.send("DarkMode", true);
      }
    },
    {
      label: "Wyjdź",
      click() {
        app.quit();
      }
    }
  ];
  let trayContextMenu = Menu.buildFromTemplate(trayContextMenuTemplate);
  tray.setContextMenu(trayContextMenu);
  tray.on("click", () => {
    windows.mainWindow.isMinimized() === true ? windows.mainWindow.restore() : windows.mainWindow.minimize();
    trayContextMenuTemplate[1].label === "Ukryj" ? trayContextMenuTemplate[1].label = "Pokaż" : trayContextMenuTemplate[1].label = "Ukryj";
    trayContextMenu = Menu.buildFromTemplate(trayContextMenuTemplate);
    tray.setContextMenu(trayContextMenu);
  });
  ipcMain.on("ChangeRecord", (e, res) => {
    trayContextMenuTemplate[0].label === "Włącz nagrywanie" ? trayContextMenuTemplate[0].label = "Wyłącz nagrywanie" : trayContextMenuTemplate[0].label = "Włącz nagrywanie";
    trayContextMenu = Menu.buildFromTemplate(trayContextMenuTemplate);
    tray.setContextMenu(trayContextMenu);
  });
  windows.mainWindow.on("ready-to-show", () => {
    windows.mainWindow.show();
  });
  windows.mainWindow.on("closed", () => {
    windows.mainWindow = null;
    app.quit();
  });
});
