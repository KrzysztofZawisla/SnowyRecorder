const electron:any = require("electron");
const url:any = require("url");
const path:any = require("path");

const {
   app,
   BrowserWindow,
   Menu,
   shell,
   globalShortcut,
   Tray,
   nativeImage,
   ipcMain
}:any = electron;

const windows:any = {
   mainWindow: <any | void>null
};

let tray = <any | void>null;
let hideStatue:boolean = false;

function hardReset():void {
   app.relaunch();
   app.quit();
}

app.on("ready", ():void => {
   const myTrayIconPath:string = path.join(__dirname, "Img/icon.png");
   Menu.setApplicationMenu(null);
   globalShortcut.register("CommandOrControl+Q", ():void => {
      windows.mainWindow = null;
      app.quit();
   });
   globalShortcut.register("CommandOrControl+Shift+R", ():void => {
      hardReset();
   });
   globalShortcut.register("CommandOrControl+R", ():void => {
      windows.mainWindow.reload();
   });
   windows.mainWindow = new BrowserWindow({
      title: <string>"SnowyRecorder",
      show: <boolean>false,
      width: <number>250,
      height: <number>270,
      frame: <boolean>false,
      resizable: <boolean>false,
      skipTaskbar: <boolean>true
   });
   windows.mainWindow.loadURL(url.format({
      pathname: <string>path.join(__dirname, 'Pages/mainWindow.html'),
      protocol: <string>'file:',
      slashes: <boolean>true
   }));
   tray = new Tray(nativeImage.createFromPath(myTrayIconPath));
   tray.setToolTip("Snowy Recorder");
   const trayContextMenuTemplate:any[] = [{
      label: <string>"Włącz nagrywanie",
      click() {
         windows.mainWindow.webContents.send("RecordCall", true);
      }
   },
   {
      label: <string>"Ukryj",
      click() {
         hideStatue === false ? windows.mainWindow.hide() : windows.mainWindow.show();
         hideStatue = !hideStatue;
         trayContextMenuTemplate[1].label === "Ukryj" ? trayContextMenuTemplate[1].label = "Pokaż" : trayContextMenuTemplate[1].label = "Ukryj";
         trayContextMenu = Menu.buildFromTemplate(trayContextMenuTemplate);
         tray.setContextMenu(trayContextMenu);
      }
   },
   {
      label: <string>"Ciemny motyw",
      type: <string>"checkbox",
      click() {
         windows.mainWindow.webContents.send("DarkMode", true);
      }
   },
   {
      label: <string>"Wyjdź",
      click() {
         app.quit();
      }
   }
   ];
   let trayContextMenu:any = Menu.buildFromTemplate(trayContextMenuTemplate);
   tray.setContextMenu(trayContextMenu);
   tray.on("click", ():void => {
      windows.mainWindow.isMinimized() === true ? windows.mainWindow.restore() : windows.mainWindow.minimize();
      trayContextMenuTemplate[1].label === "Ukryj" ? trayContextMenuTemplate[1].label = "Pokaż" : trayContextMenuTemplate[1].label = "Ukryj";
      trayContextMenu = Menu.buildFromTemplate(trayContextMenuTemplate);
      tray.setContextMenu(trayContextMenu);
   });
   ipcMain.on("ChangeRecord", (e, res):void => {
      trayContextMenuTemplate[0].label === "Włącz nagrywanie" ? trayContextMenuTemplate[0].label = "Wyłącz nagrywanie" : trayContextMenuTemplate[0].label = "Włącz nagrywanie";
      trayContextMenu = Menu.buildFromTemplate(trayContextMenuTemplate);
      tray.setContextMenu(trayContextMenu);
   });
   windows.mainWindow.on("ready-to-show", ():void => {
      windows.mainWindow.show();
   });
   windows.mainWindow.on("closed", ():void => {
      windows.mainWindow = null;
      app.quit();
   });
});
