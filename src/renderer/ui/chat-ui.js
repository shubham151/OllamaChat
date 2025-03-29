export default function initChatUI() {
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const chatLog = document.getElementById("chat-log");
  const modelSelect = document.getElementById("model-select");

  sendBtn.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    const selectedModel = modelSelect.value;
    const ollamaHost =
      localStorage.getItem("ollamaHost") || "http://localhost:11434";

    appendMessage(userMessage, "user");
    chatInput.value = "";

    window.electronAPI.startChat({
      message: userMessage,
      model: selectedModel,
      host: ollamaHost,
    });
  });

  window.electronAPI.onChatStream((data) => {
    appendMessage(data, "bot");
  });

  function appendMessage(message, type = "bot") {
    const messageElem = document.createElement("div");
    messageElem.classList.add("chat-message", `${type}-message`);
    messageElem.textContent = message;
    chatLog.appendChild(messageElem);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}
