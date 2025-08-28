fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const labels = data.labels;

    const boilerChart = new Chart(document.getElementById('boilerChart'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Boiler Efficiency (%)',
          data: data.boiler_efficiency,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      }
    });

    const chillerChart = new Chart(document.getElementById('chillerChart'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Chiller Efficiency (%)',
          data: data.chiller_efficiency,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
        }]
      }
    });

    const savingsChart = new Chart(document.getElementById('savingsChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Monthly Savings ($)',
          data: data.monthly_savings,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    });
  });
