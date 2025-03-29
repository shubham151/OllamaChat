const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const handleChat = require("./chat-handler");
const handleModelFetch = require("./model-handler");

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
}

app.whenReady().then(createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

handleChat(ipcMain);
handleModelFetch(ipcMain);
