import initHeaderUI from "./ui/header-ui.js";
import initChatUI from "./ui/chat-ui.js";
import initSettingsUI from "./ui/settings-ui.js";

window.addEventListener("DOMContentLoaded", () => {
  initHeaderUI();
  initChatUI();
  initSettingsUI();
});
