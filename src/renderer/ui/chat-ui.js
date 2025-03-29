export default function initChatUI() {
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const chatLog = document.getElementById("chat-log");
  const modelDisplay = document.getElementById("selected-model");

  sendBtn.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    const selectedModel = modelDisplay.textContent.trim();
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

  function appendMessage(message, type = "bot") {
    const messageElem = createMessage(message, type);
    chatLog.appendChild(messageElem);
    messageElem.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  function createMessage(text, type) {
    const div = document.createElement("div");
    div.classList.add("chat-message", `${type}-message`);

    if (type === "bot") {
      div.dataset.raw = text;
      div.innerHTML = window.marked.parse(text);
    } else {
      div.textContent = text;
    }

    return div;
  }

  let botBuffer = "";
  let botBubble = null;
  let typingBubble = null;

  window.electronAPI.onChatStream((chunk) => {
    console.log("[stream chunk]", JSON.stringify(chunk));
    botBuffer += chunk;

    const cleaned = botBuffer.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

    if (!typingBubble) {
      typingBubble = document.createElement("div");
      typingBubble.classList.add(
        "chat-message",
        "bot-message",
        "typing-indicator"
      );
      typingBubble.innerHTML = `<div class="spinner"></div> Bot is typing...`;
      chatLog.appendChild(typingBubble);
    }

    if (cleaned) {
      if (typingBubble) {
        chatLog.removeChild(typingBubble);
        typingBubble = null;
      }

      if (!botBubble) {
        botBubble = createMessage("", "bot");
        chatLog.appendChild(botBubble);
      }

      botBubble.innerHTML = window.marked.parse(cleaned);
      botBubble.dataset.raw = cleaned;
      botBubble.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  });
}
