const http = require("http");

function handleChat(ipcMain) {
  ipcMain.on("start-chat", ({ sender }, { message, model, host }) => {
    const req = http.request(
      `${host}/api/generate`,
      { method: "POST", headers: { "Content-Type": "application/json" } },
      (res) => {
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          try {
            const parsed = JSON.parse(chunk);
            if (parsed.response) {
              sender.send("chat-stream", parsed.response);
            }
          } catch {
            sender.send("chat-stream", chunk);
          }
        });
      }
    );

    req.on("error", (err) => {
      sender.send("chat-stream", "Error: " + err.message);
    });

    req.write(JSON.stringify({ prompt: message, model, stream: true }));
    req.end();
  });
}

module.exports = handleChat;
