// reports.js

// Function to format currency
function formatCurrency(number) {
    return '₱' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Function to generate detailed Excel report
function generateDetailedExcelReport() {
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('sellerOrders')) || [];
    
    // Create new workbook
    const wb = XLSX.utils.book_new();
    
    // Create Orders Summary Sheet
    const summaryData = [
        ['Order Summary Report', '', '', '', '', ''], // Title row
        ['Generated on:', new Date().toLocaleString()], // Date generated
        [], // Empty row for spacing
        ['Order ID', 'Date', 'Customer Name', 'Email', 'Number of Items', 'Subtotal', 'Shipping', 'Discount', 'Total Amount', 'Status']
    ];
    
    orders.forEach(order => {
        summaryData.push([
            order.orderId,
            new Date(order.timestamp).toLocaleString(),
            order.customer.name,
            order.customer.email,
            order.items.length,
            order.total.subtotal,
            order.total.shipping,
            order.total.discount,
            order.total.final,
            order.status || 'Pending'
        ]);
    });
    
    // Create Order Items Detail Sheet
    const itemsData = [
        ['Order Items Detail Report', '', '', '', ''], // Title row
        ['Generated on:', new Date().toLocaleString()], // Date generated
        [], // Empty row for spacing
        ['Order ID', 'Product Name', 'Variant', 'Unit Price', 'Quantity', 'Total']
    ];
    
    orders.forEach(order => {
        order.items.forEach(item => {
            itemsData.push([
                order.orderId,
                item.name,
                item.variant || 'Default',
                parseFloat(item.price.replace(/[^\d.]/g, '')),
                item.quantity,
                parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity
            ]);
        });
    });
    
    // Create Daily Sales Summary Sheet
    const salesByDate = {};
    orders.forEach(order => {
        const date = new Date(order.timestamp).toLocaleDateString();
        if (!salesByDate[date]) {
            salesByDate[date] = {
                totalSales: 0,
                orderCount: 0,
                items: 0
            };
        }
        salesByDate[date].totalSales += order.total.final;
        salesByDate[date].orderCount++;
        salesByDate[date].items += order.items.length;
    });
    
    const dailySalesData = [
        ['Daily Sales Summary', '', '', ''], // Title row
        ['Generated on:', new Date().toLocaleString()], // Date generated
        [], // Empty row for spacing
        ['Date', 'Total Sales', 'Number of Orders', 'Items Sold']
    ];
    
    Object.entries(salesByDate).forEach(([date, data]) => {
        dailySalesData.push([
            date,
            data.totalSales,
            data.orderCount,
            data.items
        ]);
    });
    
    // Create Product Performance Sheet
    const productPerformance = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            if (!productPerformance[item.name]) {
                productPerformance[item.name] = {
                    totalSold: 0,
                    revenue: 0
                };
            }
            productPerformance[item.name].totalSold += item.quantity;
            productPerformance[item.name].revenue += parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity;
        });
    });
    
    const productData = [
        ['Product Performance Report', '', '', ''], // Title row
        ['Generated on:', new Date().toLocaleString()], // Date generated
        [], // Empty row for spacing
        ['Product Name', 'Units Sold', 'Total Revenue', 'Average Price']
    ];
    
    Object.entries(productPerformance).forEach(([product, data]) => {
        productData.push([
            product,
            data.totalSold,
            data.revenue,
            data.revenue / data.totalSold
        ]);
    });
    
    // Add all sheets to workbook
    const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
    const ws2 = XLSX.utils.aoa_to_sheet(itemsData);
    const ws3 = XLSX.utils.aoa_to_sheet(dailySalesData);
    const ws4 = XLSX.utils.aoa_to_sheet(productData);
    
    // Set column widths
    const wscols = [
        {wch: 15}, // A
        {wch: 20}, // B
        {wch: 25}, // C
        {wch: 25}, // D
        {wch: 15}, // E
        {wch: 15}, // F
        {wch: 15}, // G
        {wch: 15}, // H
        {wch: 15}, // I
        {wch: 15}  // J
    ];
    
    [ws1, ws2, ws3, ws4].forEach(ws => {
        ws['!cols'] = wscols;
    });
    
    // Add sheets to workbook
    XLSX.utils.book_append_sheet(wb, ws1, "Orders Summary");
    XLSX.utils.book_append_sheet(wb, ws2, "Order Items");
    XLSX.utils.book_append_sheet(wb, ws3, "Daily Sales");
    XLSX.utils.book_append_sheet(wb, ws4, "Product Performance");
    
    // Generate Excel file
    XLSX.writeFile(wb, `Dangal_Sales_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// Function to handle report generation button click
function handleReportGeneration() {
    try {
        generateDetailedExcelReport();
        alert('Report generated successfully!');
    } catch (error) {
        console.error('Error generating report:', error);
        alert('Error generating report. Please try again.');
    }
}

// Add event listener when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find the "View Reports" button and add click event
    const viewReportsBtn = document.querySelector('.action-btn:nth-child(4)');
    if (viewReportsBtn) {
        viewReportsBtn.addEventListener('click', handleReportGeneration);
    }
});