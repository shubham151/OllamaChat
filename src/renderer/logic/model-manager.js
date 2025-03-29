export async function fetchModels(host) {
  try {
    const models = await window.electronAPI.getModels(host);
    return models || [];
  } catch (err) {
    console.error("Error fetching models:", err);
    return [];
  }
}
