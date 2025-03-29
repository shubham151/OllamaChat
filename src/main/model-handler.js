const http = require("http");

function handleModelFetch(ipcMain) {
  ipcMain.handle("get-models", async (_event, host) => {
    return new Promise((resolve) => {
      const req = http.request(`${host}/api/tags`, { method: "GET" }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const models = JSON.parse(data).models.map((m) => m.name);
            resolve(models);
          } catch {
            resolve([]);
          }
        });
      });

      req.on("error", () => resolve([]));
      req.end();
    });
  });
}

module.exports = handleModelFetch;
