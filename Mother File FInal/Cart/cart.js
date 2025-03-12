document.addEventListener('DOMContentLoaded', function() {
    console.log("Cart.js loaded"); // Debug
    
 // Initialize cart from localStorage
    initCart();
    
    // Add event listeners to all "Add to Cart" buttons
    setupAddToCartButtons();
    
    // Header and subheader elements
    const header = document.querySelector("header");
    const subheader = document.querySelector(".subheader");
    const menuIcon = document.querySelector('#menu-icon');
    const navList = document.querySelector('.navlist');
    
    // Header/subheader scroll functionality
    if (header && subheader) {
        console.log("Header and subheader found");
        
        window.addEventListener("scroll", function() {
            let scrollPosition = window.scrollY;
            
            // Header Animation
            if (scrollPosition > 50) {
                header.classList.add("sticky");
                header.style.background = "#ffffff";
                header.style.transform = "translateY(0)";
            } else {
                header.classList.remove("sticky");
                header.style.background = "transparent";
                header.style.boxShadow = "none";
                header.style.backdropFilter = "none";
            }
    
            // Subheader Animation
            if (scrollPosition > 100) {
                subheader.classList.add("show-subheader");
                subheader.style.transform = "translateY(0)";
                subheader.style.opacity = "1";
            } else {
                subheader.classList.remove("show-subheader");
                subheader.style.transform = "translateY(-20px)";
                subheader.style.opacity = "0";
            }
        });
    } else {
        console.log("Header or subheader not found");
    }
    
    // Mobile menu toggle
    if (menuIcon && navList) {
        menuIcon.addEventListener('click', function() {
            menuIcon.classList.toggle('bx-x');
            navList.classList.toggle('open');
        });
    }
});

// Main initialization function
function initCart() {
    console.log("Initializing cart");
    
    // Examine localStorage for debugging
    const cartData = localStorage.getItem('cart');
    console.log("Cart data in localStorage:", cartData);
    
    // Find the cart container
    const cartContainer = findCartContainer();
    if (!cartContainer) {
        console.error("Cart container not found in DOM");
        return;
    }
    
    // Load cart items
    loadCartItems(cartContainer);
    
    // Add data-labels for mobile responsive view
    addMobileDataLabels();
    
    // Setup event listeners
    setupCartEventListeners();
    
    // Check if cart is empty
    checkEmptyCart();
}

// Find the cart container element
function findCartContainer() {
    // Try different possible selectors
    const selectors = [
        '#cart-items-container', 
        '.cart-items', 
        '.cart-products',
        '.cart-container > .cart-items'
    ];
    
    for (let selector of selectors) {
        const container = document.querySelector(selector);
        if (container) {
            console.log(`Found cart container with selector: ${selector}`);
            return container;
        }
    }
    
    return null;
}

// Add data attributes for mobile view
function addMobileDataLabels() {
    document.querySelectorAll('.item-price').forEach(item => {
        item.setAttribute('data-label', 'Price:');
    });

    document.querySelectorAll('.item-quantity').forEach(item => {
        item.setAttribute('data-label', 'Quantity:');
    });

    document.querySelectorAll('.item-subtotal').forEach(item => {
        item.setAttribute('data-label', 'Subtotal:');
    });
}

// Function to load cart items from localStorage
function loadCartItems(cartContainer) {
    // Get cart from localStorage 
    let cart;
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log("Parsed cart data:", cart);
    } catch (e) {
        console.error("Error parsing cart data:", e);
        cart = [];
    }
    
    // Update cart count BEFORE checking if empty
    updateCartCount();
    
    if (!cart.length) {
        console.log("Cart is empty");
        // Show empty cart message if it exists
        const emptyCartElement = document.querySelector('#empty-cart');
        const cartContainerWrapper = document.querySelector('.cart-container');
        
        if (emptyCartElement && cartContainerWrapper) {
            cartContainerWrapper.classList.add('hidden');
            emptyCartElement.classList.remove('hidden');
        }
        
        // Clear cart container content
        cartContainer.innerHTML = '<p class="cart-empty-message">Your cart is empty.</p>';
        
        // Update totals to zero
        updateCartTotal(0);
        return;
    }
    
    // Show cart container if it was hidden
    const cartContainerWrapper = document.querySelector('.cart-container');
    const emptyCartElement = document.querySelector('#empty-cart');
    
    if (cartContainerWrapper && emptyCartElement) {
        cartContainerWrapper.classList.remove('hidden');
        emptyCartElement.classList.add('hidden');
    }
    
    // Clear existing items
    cartContainer.innerHTML = '';
    
    // Track subtotal
    let subtotal = 0;
    
    // Add each item to the cart
    cart.forEach(item => {
        console.log("Processing item:", item);
        
        // Extract price value from price string (handles both "₱250.00" and 250.00 formats)
        let price;
        if (typeof item.price === 'string') {
            price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        } else {
            price = parseFloat(item.price);
        }
        
        // Handle invalid prices
        if (isNaN(price)) {
            console.error("Invalid price for item:", item);
            price = 0;
        }
        
        const quantity = item.quantity || 1;
        const itemTotal = price * quantity;
        subtotal += itemTotal;
        
        // Generate HTML based on your cart structure
        let cartItemHTML;
        
        // Check which cart template structure to use
        if (cartContainer.closest('.cart-table')) {
            // Table structure
            cartItemHTML = `
                <tr class="cart-item" data-id="${item.id || ''}">
                    <td class="item-product">
                        <div class="item-image">
                            <img src="${item.image || ''}" alt="${item.name || ''}">
                        </div>
                        <div class="item-details">
                            <h3>${item.name || ''}</h3>
                            <p class="item-variant">${item.variant ? 'Variant: ' + item.variant : ''}</p>
                            <button class="remove-item" data-id="${item.id || ''}">
                                <i class='bx bx-trash'></i> Remove
                            </button>
                        </div>
                    </td>
                    <td class="item-price">₱${price.toFixed(2)}</td>
                    <td class="item-quantity">
                        <div class="quantity-selector">
                            <button class="quantity-btn decrease" data-id="${item.id || ''}">-</button>
                            <input type="number" value="${quantity}" min="1" max="10" class="quantity-input" data-id="${item.id || ''}">
                            <button class="quantity-btn increase" data-id="${item.id || ''}">+</button>
                        </div>
                    </td>
                    <td class="item-subtotal">₱${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        } else {
            // Div structure
            cartItemHTML = `
                <div class="cart-item" data-id="${item.id || ''}">
                    <div class="item-product">
                        <div class="item-image">
                            <img src="${item.image || ''}" alt="${item.name || ''}">
                        </div>
                        <div class="item-details">
                            <h3>${item.name || ''}</h3>
                            <p class="item-variant">${item.variant ? 'Variant: ' + item.variant : ''}</p>
                            <button class="remove-item" data-id="${item.id || ''}">
                                <i class='bx bx-trash'></i> Remove
                            </button>
                        </div>
                    </div>
                    <div class="item-price">₱${price.toFixed(2)}</div>
                    <div class="item-quantity">
                        <div class="quantity-selector">
                            <button class="quantity-btn decrease" data-id="${item.id || ''}">-</button>
                            <input type="number" value="${quantity}" min="1" max="10" class="quantity-input" data-id="${item.id || ''}">
                            <button class="quantity-btn increase" data-id="${item.id || ''}">+</button>
                        </div>
                    </div>
                    <div class="item-subtotal">₱${itemTotal.toFixed(2)}</div>
                </div>
            `;
        }
        
        // Add to cart container
        cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });
    
    // Update totals
    updateCartTotal();
}

// Set up all event listeners
function setupCartEventListeners() {
    console.log("Setting up cart event listeners");
    
    // Quantity increase buttons
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            console.log("Increase clicked for item:", id);
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            if (input) {
                const currentValue = parseInt(input.value);
                const max = input.getAttribute('max') ? parseInt(input.getAttribute('max')) : 10;
                if (currentValue < max) {
                    input.value = currentValue + 1;
                    updateItemSubtotal(id);
                    updateCartItemQuantity(id, currentValue + 1);
                    updateCartTotal();
                }
            }
        });
    });

    // Quantity decrease buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            console.log("Decrease clicked for item:", id);
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            if (input) {
                const currentValue = parseInt(input.value);
                const min = input.getAttribute('min') ? parseInt(input.getAttribute('min')) : 1;
                if (currentValue > min) {
                    input.value = currentValue - 1;
                    updateItemSubtotal(id);
                    updateCartItemQuantity(id, currentValue - 1);
                    updateCartTotal();
                }
            }
        });
    });

    // Quantity input changes
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const id = this.getAttribute('data-id');
            let value = parseInt(this.value);
            const min = this.getAttribute('min') ? parseInt(this.getAttribute('min')) : 1;
            const max = this.getAttribute('max') ? parseInt(this.getAttribute('max')) : 10;
            
            // Validate input
            if (isNaN(value) || value < min) {
                this.value = min;
                value = min;
            } else if (value > max) {
                this.value = max;
                value = max;
            }
            
            updateItemSubtotal(id);
            updateCartItemQuantity(id, value);
            updateCartTotal();
        });
    });

    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            console.log("Remove clicked for item:", id);
            
            const cartItem = this.closest('.cart-item');
            if (cartItem) {
                // Add fade out animation
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateY(-10px)';
                cartItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                // Remove after animation
                setTimeout(() => {
                    cartItem.remove();
                    removeFromCart(id);
                    updateCartTotal();
                    checkEmptyCart();
                }, 300);
            }
        });
    });

    // Update cart button
    const updateCartButton = document.querySelector('#update-cart');
    if (updateCartButton) {
        updateCartButton.addEventListener('click', function() {
            console.log("Update cart clicked");
            updateAllSubtotals();
            saveCartToLocalStorage();
            updateCartTotal();
            
            // Show confirmation
            showNotification('Cart updated successfully');
        });
    }

    // Clear cart button
    const clearCartButton = document.querySelector('#clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function() {
            console.log("Clear cart clicked");
            if (confirm('Are you sure you want to clear your cart?')) {
                const cartItems = document.querySelectorAll('.cart-item');
                
                // Fade out all items
                cartItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                });
                
                // Remove all items after animation
                setTimeout(() => {
                    cartItems.forEach(item => item.remove());
                    localStorage.removeItem('cart');
                    localStorage.removeItem('appliedCoupon');
                    updateCartTotal();
                    updateCartCount();
                    checkEmptyCart();
                }, 300);
            }
        });
    }

    // Apply coupon button
    const applyCouponButton = document.querySelector('#apply-coupon');
    const couponInput = document.querySelector('#coupon-code');
    const couponMessage = document.querySelector('#coupon-message');
    
    if (applyCouponButton && couponInput) {
        applyCouponButton.addEventListener('click', function() {
            console.log("Apply coupon clicked");
            const couponCode = couponInput.value.trim();
            
            if (!couponCode) {
                if (couponMessage) couponMessage.textContent = 'Please enter a coupon code';
                return;
            }
            
            // Simple coupon validation
            const validCoupons = {
                'DANGAL10': { discount: 0.1, message: '10% discount applied!' },
                'DANGAL20': { discount: 0.2, message: '20% discount applied!' },
                'FREE': { discount: 0.15, message: '15% welcome discount applied!' }
            };
            
            if (validCoupons[couponCode]) {
                const coupon = validCoupons[couponCode];
                
                // Show success message
                if (couponMessage) {
                    couponMessage.textContent = coupon.message;
                    couponMessage.className = 'coupon-message success';
                }
                
                // Apply discount
                const subtotalAmount = getSubtotalAmount();
                const discountAmount = subtotalAmount * coupon.discount;
                
                // Update the UI
                const discountRow = document.querySelector('.summary-row.discount');
                const discountEl = document.querySelector('#cart-discount');
                
                if (discountRow) discountRow.classList.remove('hidden');
                if (discountEl) discountEl.textContent = `−₱${discountAmount.toFixed(2)}`;
                
                // Update total
                updateCartTotal(discountAmount);
                
                // Disable coupon input and button
                couponInput.disabled = true;
                applyCouponButton.disabled = true;
                applyCouponButton.textContent = 'Applied';
                
                // Save coupon
                localStorage.setItem('appliedCoupon', couponCode);
            } else {
                if (couponMessage) {
                    couponMessage.textContent = 'Invalid or expired coupon code';
                    couponMessage.className = 'coupon-message';
                }
            }
        });
    }

    const checkoutButton = document.getElementById('checkout-btn');
        const popup = document.querySelector('.thank-you-popup');
        const closeButton = popup.querySelector('.close-popup');

        // Show the popup when the checkout button is clicked
        checkoutButton.addEventListener('click', function() {
            popup.classList.remove('hidden'); // Show the popup
            popup.style.opacity = '1'; // Fade in effect
        });

        // Close the popup when the close button is clicked
        closeButton.addEventListener('click', function() {
            popup.style.opacity = '0'; // Fade out effect
            setTimeout(() => {
                popup.classList.add('hidden'); // Hide the popup after fade out
            }, 300); // Match the duration of the fade out
        });

        // Optional: Close the popup after a few seconds
        setTimeout(() => {
            if (!popup.classList.contains('hidden')) {
                popup.style.opacity = '0'; // Fade out effect
                setTimeout(() => {
                    popup.classList.add('hidden'); // Hide the popup after fade out
                }, 300); // Match the duration of the fade out
            }
        }, 5000); // Auto-close after 5 seconds
    
    
    // Continue shopping button
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            console.log("Continue shopping clicked");
            window.location.href = '../Main Shop/shop.html';
        });
    }
}

// Update the subtotal for a specific item
function updateItemSubtotal(id) {
    console.log("Updating subtotal for item:", id);
    const cartItem = document.querySelector(`.cart-item[data-id="${id}"]`);
    if (!cartItem) return;
    
    const priceElement = cartItem.querySelector('.item-price');
    const quantityInput = cartItem.querySelector('.quantity-input');
    const subtotalElement = cartItem.querySelector('.item-subtotal');
    
    if (!priceElement || !quantityInput || !subtotalElement) {
        console.error("Required elements not found for updating subtotal");
        return;
    }
    
    const price = parseFloat(priceElement.textContent.replace('₱', '').replace(',', ''));
    const quantity = parseInt(quantityInput.value);
    const subtotal = price * quantity;
    
    subtotalElement.textContent = `₱${subtotal.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// Update all subtotals
function updateAllSubtotals() {
    document.querySelectorAll('.cart-item').forEach(cartItem => {
        const id = cartItem.getAttribute('data-id');
        updateItemSubtotal(id);
    });
}

// Get total subtotal amount
function getSubtotalAmount() {
    let subtotal = 0;
    document.querySelectorAll('.item-subtotal').forEach(element => {
        const price = parseFloat(element.textContent.replace('₱', '').replace(',', ''));
        if (!isNaN(price)) subtotal += price;
    });
    return subtotal;
}

// Update cart total
function updateCartTotal(discountAmount = 0) {
    const subtotalAmount = getSubtotalAmount();
    const finalTotal = subtotalAmount - discountAmount;
    
    // Update UI
    const subtotalElement = document.querySelector('#cart-subtotal');
    const totalElement = document.querySelector('#cart-total');
    
    if (subtotalElement) {
        subtotalElement.textContent = `₱${subtotalAmount.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    
    if (totalElement) {
        totalElement.textContent = `₱${finalTotal.toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
}

// Check if cart is empty and display appropriate UI
function checkEmptyCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartContainer = document.querySelector('.cart-container');
    const emptyCart = document.querySelector('#empty-cart');
    
    if (cartItems.length === 0 && cartContainer && emptyCart) {
        cartContainer.classList.add('hidden');
        emptyCart.classList.remove('hidden');
    } else if (cartItems.length > 0 && cartContainer && emptyCart) {
        cartContainer.classList.remove('hidden');
        emptyCart.classList.add('hidden');
    }
}

// Function to update cart item quantity
function updateCartItemQuantity(productId, newQuantity) {
    console.log(`Updating quantity for product ${productId} to ${newQuantity}`);
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the product
    const productIndex = cart.findIndex(item => String(item.id) === String(productId));
    
    if (productIndex > -1) {
        // Update quantity
        cart[productIndex].quantity = newQuantity;
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
    }
}

// Function to remove item from cart
function removeFromCart(productId) {
    console.log("Removing product from cart:", productId);
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the product
    const newCart = cart.filter(item => String(item.id) !== String(productId));
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // Update cart count
    updateCartCount();
}

// Save all cart items to localStorage
function saveCartToLocalStorage() {
    console.log("Saving cart to localStorage");
    const cartItems = [];
    
    document.querySelectorAll('.cart-item').forEach(cartItem => {
        const id = cartItem.getAttribute('data-id');
        const name = cartItem.querySelector('.item-details h3').textContent;
        
        let variant = 'Default';
        const variantElement = cartItem.querySelector('.item-variant');
        if (variantElement) {
            variant = variantElement.textContent.replace('Variant: ', '');
        }
        
        const priceText = cartItem.querySelector('.item-price').textContent;
        const quantity = parseInt(cartItem.querySelector('.quantity-input').value);
        const image = cartItem.querySelector('img').src;
        
        cartItems.push({
            id,
            name,
            price: priceText,
            quantity,
            variant,
            image
        });
    });
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;
    
    if (cart.length > 0) {
        totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    }
    
    console.log(`Cart count: ${totalItems} items`);
    
    // Update cart count if the element exists
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Function to show a notification
function showNotification(message) {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Style the notification container
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.backgroundColor = '#8a8f70';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '4px';
    notification.style.marginTop = '10px';
    notification.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16)';
    notification.style.transition = 'all 0.3s ease';
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Debug function to inspect localStorage
window.debugCart = function() {
    console.log("Cart in localStorage:", localStorage.getItem('cart'));
    console.log("Parsed cart:", JSON.parse(localStorage.getItem('cart') || '[]'));
};

// Call debugCart on page load
debugCart();

// Function to set up Add to Cart buttons
function setupAddToCartButtons() {
    console.log("Setting up Add to Cart buttons");
    
    // Find all Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    if (addToCartButtons.length === 0) {
        console.log("No Add to Cart buttons found on page");
        return;
    }
    
    console.log(`Found ${addToCartButtons.length} Add to Cart buttons`);
    
    // Add click event to each button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product data from button attributes
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            const productImage = this.getAttribute('data-image');
            
            // Get variant if it exists
            let variant = 'Default';
            const variantSelect = this.closest('.product-details')?.querySelector('.variant-select') || 
                                  this.closest('.product-card')?.querySelector('.variant-select');
            
            if (variantSelect) {
                variant = variantSelect.value;
            }
            
            // Get quantity if it exists
            let quantity = 1;
            const quantityInput = this.closest('.product-details')?.querySelector('.quantity-input') || 
                                  this.closest('.product-card')?.querySelector('.quantity-input');
                                  
            if (quantityInput) {
                quantity = parseInt(quantityInput.value);
                if (isNaN(quantity) || quantity < 1) quantity = 1;
            }
            
            // Add to cart
            addToCart(productId, productName, productPrice, productImage, variant, quantity);
            
            // Show confirmation message
            showNotification(`${productName} added to cart!`);
            
            // Visual feedback on the button
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bx bx-check"></i> Added!';
            this.classList.add('added');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('added');
            }, 2000);
            
            // Refresh cart if we're on the cart page
            if (window.location.href.includes('/cart.html') || 
                window.location.pathname.endsWith('/cart/') || 
                document.querySelector('.cart-container')) {
                loadCartItems(findCartContainer());
            }
        });
    });
}

// Function to add item to cart
function addToCart(productId, name, price, image, variant, quantity) {
    console.log(`Adding to cart - ID: ${productId}, Name: ${name}, Price: ${price}, Variant: ${variant}, Quantity: ${quantity}`);
    
    if (!productId || !name || !price) {
        console.error("Missing required product data");
        return;
    }
    
    // Get current cart
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        console.error("Error parsing cart data:", e);
    }
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => 
        String(item.id) === String(productId) && 
        item.variant === variant
    );
    
    if (existingProductIndex > -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Add new product to cart
        cart.push({
            id: productId,
            name: name,
            price: price,
            image: image || '',
            variant: variant,
            quantity: quantity
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count with animation
    updateCartCount(true);
    
    // If mini cart exists, update it
    updateMiniCart();
}

// Enhanced updateCartCount function with animation option
function updateCartCount(animate = false) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;
    
    if (cart.length > 0) {
        totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    }
    
    console.log(`Cart count: ${totalItems} items`);
    
    // Update cart count if the element exists
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        // Add animation if requested
        if (animate && totalItems > 0) {
            cartCountElement.classList.add('pulse');
            setTimeout(() => {
                cartCountElement.classList.remove('pulse');
            }, 800);
        }
        
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Function to update mini cart if it exists
function updateMiniCart() {
    const miniCart = document.querySelector('.mini-cart');
    if (!miniCart) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const miniCartItems = miniCart.querySelector('.mini-cart-items');
    
    if (!miniCartItems) return;
    
    // Clear existing items
    miniCartItems.innerHTML = '';
    
    if (cart.length === 0) {
        miniCartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        return;
    }
    
    // Add items to mini cart
    cart.forEach(item => {
        const itemHTML = `
            <div class="mini-cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="mini-cart-details">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} × ₱${parseFloat(item.price).toFixed(2)}</p>
                </div>
            </div>
        `;
        miniCartItems.insertAdjacentHTML('beforeend', itemHTML);
    });
}

// Add some CSS for the animations
function addCartAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .add-to-cart-btn.added {
            background-color: #4CAF50 !important;
            color: white !important;
        }
        
        .cart-count.pulse {
            animation: pulse 0.8s ease-in-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.5); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(styleElement);
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    addCartAnimationStyles();
    // ... rest of your initialization code
});

// Add this function to calculate and display estimated delivery dates
function updateShippingEstimate() {
    const shippingElement = document.querySelector('.shipping-info');
    if (!shippingElement) return;
    
    // Calculate estimated delivery date (3-5 business days from now)
    const today = new Date();
    const minDeliveryDate = new Date(today);
    minDeliveryDate.setDate(today.getDate() + 3);
    
    const maxDeliveryDate = new Date(today);
    maxDeliveryDate.setDate(today.getDate() + 5);
    
    // Format dates
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const minDateFormatted = minDeliveryDate.toLocaleDateString('en-US', options);
    const maxDateFormatted = maxDeliveryDate.toLocaleDateString('en-US', options);
    
    // Create and insert the estimated delivery HTML
    const estimateHTML = `
        <div class="delivery-estimate">
            <i class="fas fa-truck"></i>
            <p>Estimated Delivery: ${minDateFormatted} - ${maxDateFormatted}</p>
        </div>
    `;
    
    shippingElement.insertAdjacentHTML('beforeend', estimateHTML);
}

// Modify the checkout button event listener to generate a random order number
function setupCheckoutButton() {
    const checkoutButton = document.getElementById('checkout-btn');
    if (!checkoutButton) return;
    
    const popup = document.querySelector('.thank-you-popup');
    const closeButton = popup?.querySelector('.close-popup');
    
    // Generate a random order number from the sample orders
    const sampleOrders = ['ORD-12345', 'ORD-12346', 'ORD-12347', 'ORD-12348'];
    const randomOrder = sampleOrders[Math.floor(Math.random() * sampleOrders.length)];
    
    // Show the popup with tracking information when the checkout button is clicked
    checkoutButton.addEventListener('click', function() {
        // Clear the cart
        localStorage.removeItem('cart');
        localStorage.removeItem('appliedCoupon');
        updateCartCount();
        
        // Create or update the popup content with order tracking info
        if (popup) {
            // Find or create the order info element
            let orderInfoElement = popup.querySelector('.order-info');
            if (!orderInfoElement) {
                orderInfoElement = document.createElement('div');
                orderInfoElement.className = 'order-info';
                popup.querySelector('.popup-content').appendChild(orderInfoElement);
            }
            
            // Update the order info with tracking details
            orderInfoElement.innerHTML = `
                <h3>Your Order: ${randomOrder}</h3>
                <p>Thank you for your purchase! Your order has been confirmed.</p>
                <div class="tracking-info">
                    <p><i class="fas fa-box"></i> You can track your order status using the order number above.</p>
                    <a href="../track/.html?order=${randomOrder}" class="track-order-btn">
                        <i class="fas fa-search"></i> Track Your Order
                    </a>
                </div>
            `;
            
            // Show the popup
            popup.classList.remove('hidden');
            popup.style.opacity = '1';
        }
    });
    
    // Close the popup when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.classList.add('hidden');
                
                // Redirect to the home page or shop page after closing
                window.location.href = '../HomePage/index.html';
            }, 300);
        });
    }
}

// Add CSS for the new elements
function addTrackingStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .delivery-estimate {
            display: flex;
            align-items: center;
            margin-top: 10px;
            color: #555;
            font-size: 14px;
        }
        
        .delivery-estimate i {
            margin-right: 8px;
            color: var(--main-color);
        }
        
        .tracking-info {
            margin-top: 15px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 5px;
            border-left: 3px solid var(--main-color);
        }
        
        .tracking-info p {
            margin-bottom: 10px;
        }
        
        .track-order-btn {
            display: inline-flex;
            align-items: center;
            padding: 8px 16px;
            background-color: var(--main-color);
            color: white;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 10px;
            transition: all 0.3s ease;
        }
        
        .track-order-btn i {
            margin-right: 8px;
        }
        
        .track-order-btn:hover {
            background-color: var(--sub-color);
        }
        
        .order-info {
            margin-top: 15px;
        }
        
        .order-info h3 {
            color: var(--main-color);
            margin-bottom: 10px;
        }
    `;
    document.head.appendChild(styleElement);
}

// Update the initCart function to include the new features
function initCart() {
    console.log("Initializing cart");
    
    // Examine localStorage for debugging
    const cartData = localStorage.getItem('cart');
    console.log("Cart data in localStorage:", cartData);
    
    // Find the cart container
    const cartContainer = findCartContainer();
    if (!cartContainer) {
        console.error("Cart container not found in DOM");
        return;
    }
    
    // Load cart items
    loadCartItems(cartContainer);
    
    // Add data-labels for mobile responsive view
    addMobileDataLabels();
    
    // Setup event listeners
    setupCartEventListeners();
    
    // Check if cart is empty
    checkEmptyCart();
    
    // Add estimated delivery date
    updateShippingEstimate();
    
    // Setup checkout button with order tracking
    setupCheckoutButton();
    
    // Add styles for tracking elements
    addTrackingStyles();
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    addCartAnimationStyles();
    // The rest of your initialization code will call initCart()
});