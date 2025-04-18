import { fetchModels } from "../logic/model-manager.js";
import { getSettings } from "../logic/settings-manager.js";

export default function initModelUI() {
  const dropdownBtn = document.getElementById("model-display-btn");
  const dropdownMenu = document.getElementById("model-options");
  const selectedModelSpan = document.getElementById("selected-model");

  const { ollamaHost } = getSettings();

  fetchModels(ollamaHost).then((models) => {
    if (!models.length) {
      selectedModelSpan.textContent = "No models found";
      return;
    }

    dropdownMenu.innerHTML = "";

    models.forEach((model) => {
      const li = document.createElement("li");
      li.textContent = model;
      li.addEventListener("click", () => {
        selectedModelSpan.textContent = model;
        dropdownMenu.classList.remove("show");
        // document.getElementById("model-select").value = model;
        document.getElementById("model-select").value = models[0];
      });
      dropdownMenu.appendChild(li);
    });

    selectedModelSpan.textContent = models[0];
    document.getElementById("model-select").value = models[0];
  });

  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove("show");
    }
  });
}
