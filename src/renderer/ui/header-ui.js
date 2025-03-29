import initModelUI from "./model-ui.js";

export default function initHeaderUI() {
  const settingsBtn = document.getElementById("settings-btn");

  settingsBtn.addEventListener("click", () => {
    document.getElementById("settings-panel").classList.toggle("hidden");
  });

  initModelUI();
}
