// chart.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the sales chart
    const ctx = document.getElementById('sales-chart').getContext('2d');
    window.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Sales',
                data: [3200, 2800, 3500, 4200, 3800, 5200, 4800],
                backgroundColor: 'rgba(138, 143, 112, 0.2)',
                borderColor: '#8a8f70',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: '#8a8f70',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '₱' + value.toLocaleString('en-PH');
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '₱' + context.parsed.y.toLocaleString('en-PH');
                        }
                    }
                }
            }
        }
    });
});