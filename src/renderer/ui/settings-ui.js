import { getSettings, saveSettings } from "../logic/settings-manager.js";

export default function initSettingsUI() {
  const settingsPanel = document.getElementById("settings-panel");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const ollamaHostInput = document.getElementById("ollama-host");
  const saveBtn = document.getElementById("save-btn");

  const settings = getSettings();
  const defaultHost = "http://localhost:11434";

  darkModeToggle.checked = settings.darkMode;
  ollamaHostInput.value = settings.ollamaHost;

  if (settings.darkMode) document.body.classList.add("dark-mode");

  saveBtn.addEventListener("click", () => {
    saveSettings({
      darkMode: darkModeToggle.checked,
      ollamaHost: ollamaHostInput.value.trim() || defaultHost,
    });

    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
    settingsPanel.classList.add("hidden");
    window.location.reload();
  });
}
