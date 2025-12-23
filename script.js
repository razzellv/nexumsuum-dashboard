const API = window.NEXUM_CONFIG?.API_BASE_URL;

if (!API) {
  alert("API_BASE_URL missing. config.js not loaded.");
}

/**
 * Helper to safely create a chart
 */
function renderChart(canvasId, label, values, labels) {
  const el = document.getElementById(canvasId);
  if (!el) return;

  new Chart(el, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data: values,
        borderWidth: 2,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
}

/**
 * Fetch metrics from backend
 */
fetch(`${API}/metrics`)
  .then(res => {
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    const labels = data.labels || [];

    renderChart(
      "boilerChart",
      "Boiler Efficiency (%)",
      data.boiler_efficiency || [],
      labels
    );

    renderChart(
      "chillerChart",
      "Chiller Efficiency (%)",
      data.chiller_efficiency || [],
      labels
    );

    document.getElementById("dailySavings").textContent =
      (data.daily_savings ?? 0).toFixed(2);

    document.getElementById("monthlySavings").textContent =
      (data.monthly_savings_total ?? 0).toFixed(2);
  })
  .catch(err => {
    alert("Metrics failed to load. Check API or auth.");
    console.error(err);
  });
