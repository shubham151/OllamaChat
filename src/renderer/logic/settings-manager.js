export function getSettings() {
  return {
    darkMode: localStorage.getItem("darkMode") === "true",
    ollamaHost: localStorage.getItem("ollamaHost") || "http://localhost:11434",
  };
}

export function saveSettings(settings) {
  localStorage.setItem("darkMode", settings.darkMode);
  localStorage.setItem("ollamaHost", settings.ollamaHost);
}
