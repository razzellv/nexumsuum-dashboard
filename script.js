import { apiFetch } from "./src/lib/apiClient.js";

async function loadCharts() {
  const data = await apiFetch("/metrics");

  const labels = data.labels;

  // Boiler Efficiency Chart
  new Chart(document.getElementById("boilerChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Boiler Efficiency (%)",
        data: data.boiler_efficiency,
        borderWidth: 2
      }]
    }
  });

  // Chiller Efficiency Chart
  new Chart(document.getElementById("chillerChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Chiller Efficiency (%)",
        data: data.chiller_efficiency,
        borderWidth: 2
      }]
    }
  });

  // Savings Chart
  new Chart(document.getElementById("savingsChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Monthly Savings ($)",
        data: data.monthly_savings,
        borderWidth: 1
      }]
    }
  });
}

document.addEventListener("DOMContentLoaded", loadCharts);
