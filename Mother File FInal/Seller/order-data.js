// order-data.js

// Function to generate sample order data if none exists
function initializeOrderData() {
    // Check if orders already exist in localStorage
    if (!localStorage.getItem('sellerOrders')) {
        // Sample order data
        const sampleOrders = [
            {
                orderId: "ORD10001",
                timestamp: new Date(2023, 11, 15, 10, 30).getTime(),
                customer: {
                    name: "Maria Santos",
                    email: "maria.santos@email.com",
                    address: "123 Rizal Street, Makati City",
                    phone: "09171234567"
                },
                items: [
                    {
                        id: "PROD001",
                        name: "Dangal T-Shirt",
                        price: "₱599.00",
                        quantity: 2,
                        variant: "Medium, Black",
                        image: "../images/products/tshirt1.jpg"
                    },
                    {
                        id: "PROD003",
                        name: "Dangal Cap",
                        price: "₱350.00",
                        quantity: 1,
                        variant: "One Size, Red",
                        image: "../images/products/cap1.jpg"
                    }
                ],
                total: {
                    subtotal: 1548.00,
                    shipping: 150.00,
                    discount: 100.00,
                    final: 1598.00
                },
                status: "delivered",
                paymentMethod: "GCash",
                paymentStatus: "paid"
            },
            {
                orderId: "ORD10002",
                timestamp: new Date(2023, 11, 18, 14, 45).getTime(),
                customer: {
                    name: "Juan Dela Cruz",
                    email: "juan.delacruz@email.com",
                    address: "456 Bonifacio Avenue, Quezon City",
                    phone: "09189876543"
                },
                items: [
                    {
                        id: "PROD002",
                        name: "Dangal Hoodie",
                        price: "₱1299.00",
                        quantity: 1,
                        variant: "Large, Navy Blue",
                        image: "../images/products/hoodie1.jpg"
                    }
                ],
                total: {
                    subtotal: 1299.00,
                    shipping: 150.00,
                    discount: 0.00,
                    final: 1449.00
                },
                status: "processing",
                paymentMethod: "Cash on Delivery",
                paymentStatus: "pending"
            },
            {
                orderId: "ORD10003",
                timestamp: new Date(2023, 11, 20, 9, 15).getTime(),
                customer: {
                    name: "Ana Reyes",
                    email: "ana.reyes@email.com",
                    address: "789 Mabini Street, Pasig City",
                    phone: "09231234567"
                },
                items: [
                    {
                        id: "PROD004",
                        name: "Dangal Tote Bag",
                        price: "₱450.00",
                        quantity: 2,
                        variant: "Canvas, Natural",
                        image: "../images/products/bag1.jpg"
                    },
                    {
                        id: "PROD005",
                        name: "Dangal Sticker Pack",
                        price: "₱199.00",
                        quantity: 3,
                        variant: "Assorted",
                        image: "../images/products/stickers1.jpg"
                    }
                ],
                total: {
                    subtotal: 1497.00,
                    shipping: 150.00,
                    discount: 150.00,
                    final: 1497.00
                },
                status: "pending",
                paymentMethod: "Bank Transfer",
                paymentStatus: "paid"
            },
            {
                orderId: "ORD10004",
                timestamp: new Date(2023, 11, 22, 16, 20).getTime(),
                customer: {
                    name: "Miguel Lopez",
                    email: "miguel.lopez@email.com",
                    address: "101 Luna Street, Mandaluyong City",
                    phone: "09451234567"
                },
                items: [
                    {
                        id: "PROD001",
                        name: "Dangal T-Shirt",
                        price: "₱599.00",
                        quantity: 1,
                        variant: "Small, White",
                        image: "../images/products/tshirt1.jpg"
                    },
                    {
                        id: "PROD002",
                        name: "Dangal Hoodie",
                        price: "₱1299.00",
                        quantity: 1,
                        variant: "Medium, Black",
                        image: "../images/products/hoodie1.jpg"
                    },
                    {
                        id: "PROD003",
                        name: "Dangal Cap",
                        price: "₱350.00",
                        quantity: 1,
                        variant: "One Size, Black",
                        image: "../images/products/cap1.jpg"
                    }
                ],
                total: {
                    subtotal: 2248.00,
                    shipping: 0.00, // Free shipping
                    discount: 200.00,
                    final: 2048.00
                },
                status: "shipped",
                paymentMethod: "Credit Card",
                paymentStatus: "paid"
            },
            {
                orderId: "ORD10005",
                timestamp: new Date(2023, 11, 25, 11, 10).getTime(),
                customer: {
                    name: "Sofia Garcia",
                    email: "sofia.garcia@email.com",
                    address: "202 Aguinaldo Street, Taguig City",
                    phone: "09561234567"
                },
                items: [
                    {
                        id: "PROD006",
                        name: "Dangal Phone Case",
                        price: "₱499.00",
                        quantity: 1,
                        variant: "iPhone 13, Clear",
                        image: "../images/products/phonecase1.jpg"
                    }
                ],
                total: {
                    subtotal: 499.00,
                    shipping: 100.00,
                    discount: 0.00,
                    final: 599.00
                },
                status: "cancelled",
                paymentMethod: "GCash",
                paymentStatus: "refunded"
            }
        ];

        // Store in localStorage
        localStorage.setItem('sellerOrders', JSON.stringify(sampleOrders));
        console.log('Sample order data initialized');
    } else {
        console.log('Order data already exists in localStorage');
    }
}

// Function to add a new order
function addNewOrder(orderData) {
    // Get existing orders
    const orders = JSON.parse(localStorage.getItem('sellerOrders')) || [];
    
    // Add new order
    orders.push(orderData);
    
    // Save back to localStorage
    localStorage.setItem('sellerOrders', JSON.stringify(orders));
    
    console.log('New order added:', orderData.orderId);
    return orderData.orderId;
}

// Function to update order status
function updateOrderStatus(orderId, newStatus) {
    // Get existing orders
    const orders = JSON.parse(localStorage.getItem('sellerOrders')) || [];
    
    // Find the order
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex !== -1) {
        // Update status
        orders[orderIndex].status = newStatus;
        
        // Save back to localStorage
        localStorage.setItem('sellerOrders', JSON.stringify(orders));
        console.log(`Order ${orderId} status updated to ${newStatus}`);
        return true;
    } else {
        console.log(`Order ${orderId} not found`);
        return false;
    }
}

// Function to get all orders
function getAllOrders() {
    return JSON.parse(localStorage.getItem('sellerOrders')) || [];
}

// Function to get order by ID
function getOrderById(orderId) {
    const orders = JSON.parse(localStorage.getItem('sellerOrders')) || [];
    return orders.find(order => order.orderId === orderId);
}

// Initialize data when script loads
initializeOrderData();// order-data.js

// Function to generate sample order data if none exists
function initializeOrderData() {
    // Check if orders already exist in localStorage
    if (!localStorage.getItem('sellerOrders')) {
        // Sample order data
        const sampleOrders = [
            {
                orderId: "ORD10001",
                timestamp: new Date(2023, 11, 15, 10, 30).getTime(),
                customer: {
                    name: "Maria Santos",
                    email: "maria.santos@email.com",
                    address: "123 Rizal Street, Makati City",
                    phone: "09171234567"
                },
                items: [
                    {
                        id: "PROD001",
                        name: "Dangal T-Shirt",
                        price: "₱599.00",
                        quantity: 2,
                        variant: "Medium, Black",
                        image: "../images/products/tshirt1.jpg"
                    },
                    {
                        id: "PROD003",
                        name: "Dangal Cap",
                        price: "₱350.00",
                        quantity: 1,
                        variant: "One Size, Red",
                        image: "../images/products/cap1.jpg"
                    }
                ],
                total: {
                    subtotal: 1548.00,
                    shipping: 150.00,
                    discount: 100.00,
                    final: 1598.00
                },
                status: "delivered",
                paymentMethod: "GCash",
                paymentStatus: "paid"
            },
            {
                orderId: "ORD10002",
                timestamp: new Date(2023, 11, 18, 14, 45).getTime(),
                customer: {
                    name: "Juan Dela Cruz",
                    email: "juan.delacruz@email.com",
                    address: "456 Bonifacio Avenue, Quezon City",
                    phone: "09189876543"
                },
                items: [
                    {
                        id: "PROD002",
                        name: "Dangal Hoodie",
                        price: "₱1299.00",
                        quantity: 1,
                        variant: "Large, Navy Blue",
                        image: "../images/products/hoodie1.jpg"
                    }
                ],
                total: {
                    subtotal: 1299.00,
                    shipping: 150.00,
                    discount: 0.00,
                    final: 1449.00
                },
                status: "processing",
                paymentMethod: "Cash on Delivery",
                paymentStatus: "pending"
            },
            {
                orderId: "ORD10003",
                timestamp: new Date(2023, 11, 20, 9, 15).getTime(),
                customer: {
                    name: "Ana Reyes",
                    email: "ana.reyes@email.com",
                    address: "789 Mabini Street, Pasig City",
                    phone: "09231234567"
                },
                items: [
                    {
                        id: "PROD004",
                        name: "Dangal Tote Bag",
                        price: "₱450.00",
                        quantity: 2,
                        variant: "Canvas, Natural",
                        image: "../images/products/bag1.jpg"
                    },
                    {
                        id: "PROD005",
                        name: "Dangal Sticker Pack",
                        price: "₱199.00",
                        quantity: 3,
                        variant: "Assorted",
                        image: "../images/products/stickers1.jpg"
                    }
                ],
                total: {
                    subtotal: 1497.00,
                    shipping: 150.00,
                    discount: 150.00,
                    final: 1497.00
                },
                status: "pending",
                paymentMethod: "Bank Transfer",
                paymentStatus: "paid"
            },
            {
                orderId: "ORD10004",
                timestamp: new Date(2023, 11, 22, 16, 20).getTime(),
                customer: {
                    name: "Miguel Lopez",
                    email: "miguel.lopez@email.com",
                    address: "101 Luna Street, Mandaluyong City",
                    phone: "09451234567"
                },
                items: [
                    {
                        id: "PROD001",
                        name: "Dangal T-Shirt",
                        price: "₱599.00",
                        quantity: 1,
                        variant: "Small, White",
                        image: "../images/products/tshirt1.jpg"
                    },
                    {
                        id: "PROD002",
                        name: "Dangal Hoodie",
                        price: "₱1299.00",
                        quantity: 1,
                        variant: "Medium, Black",
                        image: "../images/products/hoodie1.jpg"
                    },
                    {
                        id: "PROD003",
                        name: "Dangal Cap",
                        price: "₱350.00",
                        quantity: 1,
                        variant: "One Size, Black",
                        image: "../images/products/cap1.jpg"
                    }
                ],
                total: {
                    subtotal: 2248.00,
                    shipping: 0.00, // Free shipping
                    discount: 200.00,
                    final: 2048.00
                },
                status: "shipped",
                paymentMethod: "Credit Card",
                paymentStatus: "paid"
            },
            {
                orderId: "ORD10005",
                timestamp: new Date(2023, 11, 25, 11, 10).getTime(),
                customer: {
                    name: "Sofia Garcia",
                    email: "sofia.garcia@email.com",
                    address: "202 Aguinaldo Street, Taguig City",
                    phone: "09561234567"
                },
                items: [
                    {
                        id: "PROD006",
                        name: "Dangal Phone Case",
                        price: "₱499.00",
                        quantity: 1,
                        variant: "iPhone 13, Clear",
                        image: "../images/products/phonecase1.jpg"
                    }
                ],
                total: {
                    subtotal: 499.00,
                    shipping: 100.00,
                    discount: 0.00,
                    final: 599.00
                },
                status: "cancelled",
                paymentMethod: "GCash",
                paymentStatus: "refunded"
            }
        ];

        // Store in localStorage
        localStorage.setItem('sellerOrders', JSON.stringify(sampleOrders));
        console.log('Sample order data initialized');
    } else {
        console.log('Order data already exists in localStorage');
    }
}

// Function to add a new order
function addNewOrder(orderData) {
    // Get existing orders
    const orders = JSON.parse(localStorage.getItem('sellerOrders')) || [];
    
    // Add new order
    orders.push(orderData);
    
    // Save back to localStorage
    localStorage.setItem('sellerOrders', JSON.stringify(orders));
    
    console.log('New order added:', orderData.orderId);
    return orderData.orderId;
}

// Function to update order status
function updateOrderStatus(orderId, newStatus) {
    // Get existing orders
    const orders = JSON.parse(localStorage.getItem('sellerOrders')) || [];
    
    // Find the order
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex !== -1) {
        // Update status
        orders[orderIndex].status = newStatus;
        
        // Save back to localStorage
        localStorage.setItem('sellerOrders', JSON.stringify(orders));
        console.log(`Order ${orderId} status updated to ${newStatus}`);
        return true;
    } else {
        console.log(`Order ${orderId} not found`);
        return false;
    }
}

// Function to get all orders
function getAllOrders() {
    return JSON.parse(localStorage.getItem('sellerOrders')) || [];
}

// Function to get order by ID
function getOrderById(orderId) {
    const orders = JSON.parse(localStorage.getItem('sellerOrders')) || [];
    return orders.find(order => order.orderId === orderId);
}

// Initialize data when script loads
initializeOrderData();