const API = window.NEXUM_CONFIG.API_BASE_URL;

fetch(`${API}/metrics`)
  .then(res => res.json())
  .then(data => {
    const labels = data.labels || [];

    new Chart(document.getElementById('boilerChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Boiler Efficiency (%)',
          data: data.boiler_efficiency || [],
          borderWidth: 2
        }]
      }
    });

    new Chart(document.getElementById('chillerChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Chiller Efficiency (%)',
          data: data.chiller_efficiency || [],
          borderWidth: 2
        }]
      }
    });

    document.getElementById("dailySavings").textContent =
      data.daily_savings?.toFixed(2) || "0.00";

    document.getElementById("monthlySavings").textContent =
      data.monthly_savings_total?.toFixed(2) || "0.00";
  })
  .catch(err => {
    console.error("Metrics fetch failed:", err);
  });
