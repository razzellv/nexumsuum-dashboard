(function () {
  const API = window.NEXUM_CONFIG.API_BASE_URL;

  fetch(API + "/metrics")
    .then(response => {
      if (!response.ok) {
        throw new Error("API request failed");
      }
      return response.json();
    })
    .then(data => {
      const labels = data.labels || [];

      // BOILER CHART
      new Chart(document.getElementById("boilerChart"), {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Boiler Efficiency (%)",
            data: data.boiler_efficiency || [],
            borderColor: "#4bc0c0",
            backgroundColor: "rgba(75,192,192,0.2)",
            borderWidth: 2
          }]
        }
      });

      // CHILLER CHART
      new Chart(document.getElementById("chillerChart"), {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Chiller COP",
            data: data.chiller_efficiency || [],
            borderColor: "#36a2eb",
            backgroundColor: "rgba(54,162,235,0.2)",
            borderWidth: 2
          }]
        }
      });

      // SAVINGS
      document.getElementById("dailySavings").textContent =
        (data.daily_savings || 0).toFixed(2);

      document.getElementById("monthlySavings").textContent =
        (data.monthly_savings_total || 0).toFixed(2);
    })
    .catch(err => {
      alert("Metrics failed to load. Check API configuration.");
      console.error(err);
    });
})();
