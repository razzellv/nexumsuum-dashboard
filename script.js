import { apiFetch } from "./lib/apiClient.js";

let boilerChart, chillerChart, savingsChart;

async function loadDashboard() {
  const data = await apiFetch("/metrics");

  // ===== KPIs =====
  document.getElementById("boiler-eff").innerText =
    `${data.boilerEfficiency.toFixed(1)}%`;

  document.getElementById("chiller-cop").innerText =
    data.chillerCOP.toFixed(2);

  document.getElementById("daily-cost").innerText =
    `$${data.dailyCost.toFixed(2)}`;

  document.getElementById("dailySavings").innerText =
    data.dailySavings.toFixed(2);

  document.getElementById("monthlySavings").innerText =
    data.monthlySavings.toFixed(2);

  // ===== Charts =====
  renderCharts(data);
}

function renderCharts(data) {
  const labels = data.labels;

  boilerChart = new Chart(document.getElementById("boilerChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Boiler Efficiency (%)",
        data: data.boilerTrend,
        borderWidth: 2
      }]
    }
  });

  chillerChart = new Chart(document.getElementById("chillerChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Chiller COP",
        data: data.chillerTrend,
        borderWidth: 2
      }]
    }
  });

  savingsChart = new Chart(document.getElementById("savingsChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Monthly Savings ($)",
        data: data.monthlySavingsTrend
      }]
    }
  });
}

loadDashboard();
