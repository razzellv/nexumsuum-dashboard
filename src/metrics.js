// src/metrics.js
import { apiFetch } from "./lib/apiClient.js";

export async function loadMetrics() {
  const data = await apiFetch("/metrics");

  document.getElementById("boiler-eff").innerText =
    `${data.boilerEfficiency.toFixed(1)}%`;

  document.getElementById("chiller-cop").innerText =
    data.chillerCOP.toFixed(2);

  document.getElementById("daily-cost").innerText =
    `$${data.dailyCost.toFixed(2)}`;
}
