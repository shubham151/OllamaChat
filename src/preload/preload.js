const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  startChat: (payload) => ipcRenderer.send("start-chat", payload),
  onChatStream: (callback) =>
    ipcRenderer.on("chat-stream", (event, data) => callback(data)),
  openSettings: () => ipcRenderer.send("open-settings"),
  getModels: (host) => ipcRenderer.invoke("get-models", host),
});
