document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('myPieChart').getContext('2d');
  
    const data = {
        labels: ['Desktop', 'Móvil', 'Tablet'],
        datasets: [{
          label: 'Pedidos',
          data: [45, 25, 30],
          backgroundColor: ['#1E64F0', '#20C1CF', '#9A68F0'],
          borderWidth: 1
        }]
    };
  
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false // Desactivamos la leyenda por defecto
          }
        }
      }
    });

    // Crear leyenda personalizada
    const legend = document.getElementById('pieChartLegend');
    data.labels.forEach((label, index) => {
        const color = data.datasets[0].backgroundColor[index];
        const value = data.datasets[0].data[index];
        legend.innerHTML += `
            <div class="flex items-center mb-2">
                <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${color}"></div>
                <span>${label}: ${value}%</span>
            </div>
        `;
    });
});
  