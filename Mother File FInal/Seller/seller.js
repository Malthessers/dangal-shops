document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuIcon = document.querySelector('#menu-icon');
    const navlist = document.querySelector('.navlist');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            navlist.classList.toggle('open');
            menuIcon.classList.toggle('bx-x');
        });
    }
    
    // Date Selector
    const dateBtns = document.querySelectorAll('.date-btn');
    
    dateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            dateBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.classList.contains('custom')) {
                // Open date picker dialog (would connect to a date picker library)
                console.log('Custom date range picker would open here');
                // For implementation, you'd typically use libraries like flatpickr or daterangepicker
            }
            
            // Update dashboard data based on selected date range
            updateDashboardData(this.textContent.trim());
        });
    });
    
    // Analytics Period Toggle
    const periodToggles = document.querySelectorAll('.period-toggle');
    
    periodToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            periodToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart based on selected period
            updateChart(this.textContent.trim());
        });
    });
    
    // Mark Notifications as Read
    const markReadBtn = document.querySelector('.mark-read');
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    
    if (markReadBtn) {
        markReadBtn.addEventListener('click', function() {
            unreadNotifications.forEach(notification => {
                notification.classList.remove('unread');
            });
        });
    }
    
    // Individual Notification Click
    const notificationItems = document.querySelectorAll('.notification-item');
    
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
            // Navigate to relevant section based on notification type
            // This is a placeholder for actual navigation logic
            console.log('Notification clicked:', this.querySelector('p').textContent);
        });
    });
    
    // Quick Action Buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            console.log(`Action clicked: ${action}`);
            
            // Placeholder for action navigation
            switch(action) {
                case 'Add Product':
                    // Navigate to add product page
                    // window.location.href = 'add-product.html';
                    break;
                case 'Create Promo':
                    // Open promo creation modal
                    // openModal('promo-modal');
                    break;
                case 'Fulfill Orders':
                    // Navigate to orders page
                    // window.location.href = 'orders.html';
                    break;
                case 'View Reports':
                    // Navigate to reports page
                    // window.location.href = 'reports.html';
                    break;
            }
        });
    });
    
    // Handle inventory item clicks
    const inventoryItems = document.querySelectorAll('.inventory-item');
    
    inventoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.querySelector('.product-details h4').textContent;
            console.log(`Inventory item clicked: ${productName}`);
            // Navigate to product edit page
            // window.location.href = `edit-product.html?name=${encodeURIComponent(productName)}`;
        });
    });
    
    // Handle order item clicks
    const orderItems = document.querySelectorAll('.order-item');
    
    orderItems.forEach(item => {
        item.addEventListener('click', function() {
            const orderId = this.querySelector('.order-info h4').textContent;
            console.log(`Order clicked: ${orderId}`);
            // Navigate to order details page
            // window.location.href = `order-details.html?id=${orderId.replace('#', '')}`;
        });
    });
    
    // Initialize Sales Chart
    initializeSalesChart();
});

// Function to update dashboard data based on date selection
function updateDashboardData(dateRange) {
    console.log(`Updating dashboard data for: ${dateRange}`);
    
    // This would typically involve an API call to fetch data for the selected date range
    // For demonstration, we'll use mock data for different time periods
    
    let salesValue, ordersValue, visitorsValue, conversionValue;
    let salesChange, ordersChange, visitorsChange, conversionChange;
    
    switch(dateRange) {
        case 'Today':
            salesValue = '₱5,230.00';
            ordersValue = '21';
            visitorsValue = '342';
            conversionValue = '6.1%';
            salesChange = '+8.2%';
            ordersChange = '+5.5%';
            visitorsChange = '+12.7%';
            conversionChange = '-0.6%';
            break;
        case 'This Week':
            salesValue = '₱24,521.00';
            ordersValue = '78';
            visitorsValue = '1,245';
            conversionValue = '6.3%';
            salesChange = '+12.5%';
            ordersChange = '+8.2%';
            visitorsChange = '+23.7%';
            conversionChange = '-1.2%';
            break;
        case 'This Month':
            salesValue = '₱98,743.00';
            ordersValue = '312';
            visitorsValue = '5,678';
            conversionValue = '5.5%';
            salesChange = '+18.3%';
            ordersChange = '+15.7%';
            visitorsChange = '+19.2%';
            conversionChange = '-0.8%';
            break;
        default:
            salesValue = '₱5,230.00';
            ordersValue = '21';
            visitorsValue = '342';
            conversionValue = '6.1%';
            salesChange = '+8.2%';
            ordersChange = '+5.5%';
            visitorsChange = '+12.7%';
            conversionChange = '-0.6%';
    }
    
    // Update stat cards with new values
    document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = salesValue;
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = ordersValue;
    document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = visitorsValue;
    document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = conversionValue;
    
    // Update change percentages
    const salesChangeEl = document.querySelector('.stat-card:nth-child(1) .stat-change');
    salesChangeEl.innerHTML = `<i class="fas fa-arrow-up"></i> ${salesChange} from last period`;
    
    const ordersChangeEl = document.querySelector('.stat-card:nth-child(2) .stat-change');
    ordersChangeEl.innerHTML = `<i class="fas fa-arrow-up"></i> ${ordersChange} from last period`;
    
    const visitorsChangeEl = document.querySelector('.stat-card:nth-child(3) .stat-change');
    visitorsChangeEl.innerHTML = `<i class="fas fa-arrow-up"></i> ${visitorsChange} from last period`;
    
    const conversionChangeEl = document.querySelector('.stat-card:nth-child(4) .stat-change');
    conversionChangeEl.innerHTML = `<i class="fas fa-arrow-down"></i> ${conversionChange} from last period`;
}

// Function to update chart based on period selection
function updateChart(period) {
    console.log(`Updating chart for period: ${period}`);
    
    // This would typically fetch new data and update the chart
    // For this example, we'll modify the existing chart with mock data
    
    let labels, data;
    
    switch(period) {
        case 'Week':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [1500, 2200, 1800, 2400, 2000, 3200, 2800];
            break;
        case 'Month':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [10500, 12200, 9800, 14500];
            break;
        case 'Year':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            data = [22000, 19000, 21000, 24000, 20000, 25000, 28000, 30000, 29000, 26000, 28000, 32000];
            break;
        default:
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [1500, 2200, 1800, 2400, 2000, 3200, 2800];
    }
    
    // Update chart data
    salesChart.data.labels = labels;
    salesChart.data.datasets[0].data = data;
    salesChart.update();
    
    // Update analytics summary based on the period
    updateAnalyticsSummary(period);
}

// Function to update analytics summary
function updateAnalyticsSummary(period) {
    let peakDay, avgDailySales, growth;
    
    switch(period) {
        case 'Week':
            peakDay = 'Saturday';
            avgDailySales = '₱3,503';
            growth = '+15.7%';
            break;
        case 'Month':
            peakDay = 'Week 4';
            avgDailySales = '₱11,750';
            growth = '+12.3%';
            break;
        case 'Year':
            peakDay = 'December';
            avgDailySales = '₱25,750';
            growth = '+18.2%';
            break;
        default:
            peakDay = 'Saturday';
            avgDailySales = '₱3,503';
            growth = '+15.7%';
    }
    
    // Update summary elements
    document.querySelector('.analytics-summary .summary-item:nth-child(1) .summary-value').textContent = peakDay;
    document.querySelector('.analytics-summary .summary-item:nth-child(2) .summary-value').textContent = avgDailySales;
    document.querySelector('.analytics-summary .summary-item:nth-child(3) .summary-value').textContent = growth;
}

// Initialize the sales chart
function initializeSalesChart() {
    const ctx = document.getElementById('sales-chart');
    
    if (!ctx) return;
    
    // Initial data for the weekly view
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [1500, 2200, 1800, 2400, 2000, 3200, 2800];
    
    // Chart configuration
    window.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sales (₱)',
                data: data,
                backgroundColor: 'rgba(138, 143, 112, 0.2)',
                borderColor: '#8a8f70',
                borderWidth: 2,
                pointBackgroundColor: '#8a8f70',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#111',
                    bodyColor: '#111',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    boxPadding: 8,
                    usePointStyle: true,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    callbacks: {
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            return '₱' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return '₱' + value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            elements: {
                line: {
                    borderJoinStyle: 'round'
                }
            }
        }
    });
}

// Function to handle window resize
window.addEventListener('resize', function() {
    if (window.salesChart) {
        salesChart.resize();
    }
});

// Add active class to current page link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.seller-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call this function when the page loads
setActiveNavLink();