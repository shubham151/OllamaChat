import { fetchModels } from "../logic/model-manager.js";
import { getSettings } from "../logic/settings-manager.js";

export default function initModelUI() {
  const modelSelect = document.getElementById("model-select");
  const modelDisplay = document.getElementById("selected-model");
  const { ollamaHost } = getSettings();

  fetchModels(ollamaHost).then((models) => {
    if (!models.length) {
      modelDisplay.textContent = "No models found";
      return;
    }

    modelSelect.innerHTML = "";
    models.forEach((model) => {
      const opt = document.createElement("option");
      opt.value = model;
      opt.textContent = model;
      modelSelect.appendChild(opt);
    });

    modelSelect.value = models[0];
    modelDisplay.textContent = models[0];

    modelSelect.addEventListener("change", () => {
      modelDisplay.textContent = modelSelect.value;
    });
  });
}
