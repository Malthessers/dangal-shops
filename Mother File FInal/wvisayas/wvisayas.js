// Header and Subheader Animations
const header = document.querySelector("header");
const subheader = document.querySelector(".subheader");
const menu = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

if (header && subheader) {
    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;
        const isScrolled = scrollPosition > 100;

        // Header Animation (Always Visible, but changes background when scrolling)
        if (scrollPosition > 50) {
            header.classList.add("sticky");
            header.style.background = "#ffffff";
            header.style.transform = "translateY(0)";
        } else {
            header.classList.remove("sticky");
            header.style.background = "transparent"; // Transparent when at the top
            header.style.boxShadow = "none";
            header.style.backdropFilter = "none";
        }

        // Subheader Animation (Appears smoothly when scrolled)
        if (isScrolled) {
            subheader.classList.add("show-subheader");
            subheader.style.transform = "translateY(0)";
            subheader.style.opacity = "1";
        } else {
            subheader.classList.remove("show-subheader");
            subheader.style.transform = "translateY(-20px)";
            subheader.style.opacity = "0";
        }
    });
}

// Mobile Menu Toggle
if (menu) {
    menu.onclick = () => {
        menu.classList.toggle("bx-x");
        navlist?.classList.toggle("open");
    };
}

window.onscroll = () => {
    menu?.classList.remove("bx-x");
    navlist?.classList.remove("open");
};

// Carousel Navigation
document.getElementById('next')?.addEventListener('click', function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
});

document.getElementById('prev')?.addEventListener('click', function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
});


// Product data

const products = {
    1: {
        name: "Kantarines Patadyong Set",
        price: "₱23,800.00",
        oldPrice: "",
        brand: "Opiana Andres",
        location: "Makati City, Philippines",
        location: {
            name: "Mandaluyong, Metro Manila, Philippines",
            url: "https://maps.app.goo.gl/JCosPpfeTUaXY6bp8#" // Add the URL here
        },
        description: " Kantarines weave of Abra, known for its colorful striped combinations, is reaching out to Panay Island’s Patadyong, a garment prominent for its skirt-like silhouette that is narrow and straight. Amihan Terno is inspired by the balanced simplicity of Visayan patadyong, and tailored using the Kantarines fabric of our partner weavers in Bangued.",
        images: ["../visayasimg/kantarinespatadyongwv.jpg", "../visayasimg/kantarinespatadyongwv1.jpg", "../visayasimg/kantarinespatadyongwv2.jpg", "../visayasimg/kantarinespatadyongwv3.jpg"],
        reviews: "( 0 review)"
    },
    2: {
        name: "Abaca Bariw Handbag",
        price: "₱1,800.00",
        oldPrice: "",
        brand: "UswagArts&Crafts",
        location: "Kalibo, Aklan, Philippines",
        location: {
            name: "Mandaluyong, Metro Manila, Philippines",
            url: "https://maps.app.goo.gl/JCosPpfeTUaXY6bp8#" // Add the URL here
        },
        description: "Crafted from abaca fiber, a strong, durable, and naturally golden material native to the country, these handbags boast exceptional wear resistance. ",
        images: ["../visayasimg/abacabariwwv.jpg", "../visayasimg/abacabariwwv1.jpg", "../visayasimg/abacabariwwv2.jpg", "../visayasimg/abacabariwwv3.jpg"],
        reviews: "(6 reviews)"
    },
    3: {
        name: "Hablon Textiles",
        price: "₱500.00",
        oldPrice: "",
        brand: " LIKHAAN",
        location: "Iloilo City, Philippines",
        location: {
            name: "Mandaluyong, Metro Manila, Philippines",
            url: "https://maps.app.goo.gl/JCosPpfeTUaXY6bp8#" // Add the URL here
        },
        description: " Iloilo is renowned for its diverse array of beautiful weaves, but none are as iconic and inspiring as the hablon, which has captured the imagination of generations of weavers, designers, and artisans. This handwoven textile, traditionally crafted on handlooms using natural fibers epitomizes Iloilo's rich weaving heritage. pili nuts harvested from the volcanic soils of Bicol. These buttery, nutrient-rich nuts are hand-selected and lightly roasted to preserve their delicate flavor and nutritional benefits.",
        images: ["../visayasimg/hablonwv.jpg", "../visayasimg/hablonwv1.jpg", "../visayasimg/hablonwv2.jpg", "../visayasimg/hablonwv1.jpg3"],
        reviews: "(5 reviews)"
    },

};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart and wishlist arrays in localStorage if they don't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', JSON.stringify([]));
    }

    // Update cart count in the header
    updateCartCount();

    // Get modal element
    const modal = document.getElementById('productModal');
    
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Get close button
    const closeButton = document.querySelector('.close-modal');
    
    // Add click event to product cards
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking wishlist or quick-view buttons
 if (e.target.closest('.add-to-wishlist')) {
    e.preventDefault();
    return;
}

const productId = this.getAttribute('data-id');
openProductModal(productId);
});

// Add cart functionality to quick-view button
const quickViewBtn = card.querySelector('.add-to-wishlist');
if (quickViewBtn) {
quickViewBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const productCard = this.closest('.product-card');
    const productId = productCard.dataset.id;
    const product = {
        id: productId,
        name: productCard.querySelector('.product-name').textContent,
        price: productCard.querySelector('.product-price').textContent,
        image: productCard.querySelector('img').src,
        quantity: 1
    };
    

    showNotification(product.name + ' added to cart!');
    // Visual feedback
    this.classList.add('added-to-cart');
    setTimeout(() => {
        this.classList.remove('added-to-cart');
    }, 1000);
});
}
});

// Add click event listeners to all "Add to Cart" buttons (if any)
const addToCartButtons = document.querySelectorAll('.add-cart, .add-to-cart-btn');
addToCartButtons.forEach(button => {
button.addEventListener('click', function(e) {
e.preventDefault();
e.stopPropagation(); // Prevent opening the modal

// Get the product container
const productCard = this.closest('.product-card, .row-item, .product');

// Extract product information
const product = {
    id: productCard.dataset.id || generateProductId(),
    name: productCard.querySelector('h3, .product-title, .product-name').textContent,
    price: productCard.querySelector('.price, .product-price').textContent.trim(),
    image: productCard.querySelector('img').src,
    quantity: 1
};

// Add to cart
addToCart(product);

// Show confirmation message
showNotification(product.name + ' added to cart!');
});
});

// Add click event listeners to all heart/wishlist buttons
const wishlistButtons = document.querySelectorAll('.add-to-wishlist, .heart-icon, .bx-heart, .bxs-heart');
wishlistButtons.forEach(button => {
button.addEventListener('click', function(e) {
e.preventDefault();
e.stopPropagation(); // Prevent opening the modal

// Toggle active/filled heart class
this.classList.toggle('active');

if (this.classList.contains('bx')) {
    this.classList.toggle('bxs-heart');
    this.classList.toggle('bx-heart');
}

// Get the product container
const productCard = this.closest('.product-card, .row-item, .product');

// Extract product information
const product = {
    id: productCard.dataset.id || generateProductId(),
    name: productCard.querySelector('h3, .product-title, .product-name').textContent,
    price: productCard.querySelector('.price, .product-price').textContent.trim(),
    image: productCard.querySelector('img').src
};

// Add to cart AND toggle wishlist status
addToCart(product);
toggleWishlist(product);

// Show confirmation message

});
});
    
   // Open product modal function
   function openProductModal(productId) {
    const product = products[productId];
    if (!product) return;

    // Populate modal with product data
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalOldPrice').textContent = product.oldPrice;
    document.getElementById('modalProductBrand').textContent = product.brand;

    // Create a clickable link for the location
    const locationElement = document.getElementById('modalProductLocation');
    locationElement.innerHTML = `<a href="${product.location.url}" target="_blank" style="color: var(--text-color); text-decoration: underline;">${product.location.name}</a>`;

    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalReviews').textContent = product.reviews;
    document.getElementById('modalProductImage').src = product.images[0];

    // Store current product ID for add to cart from modal
    modal.setAttribute('data-current-product-id', productId);

    // ADDED CODE: Clear existing thumbnails and create new ones from product data
    const thumbnailContainer = document.querySelector('.product-thumbnails');
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = '';

        // Create new thumbnails based on product images
        product.images.forEach((imagePath, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imagePath;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');

            // Add click event to change main image when clicked
            thumbnail.addEventListener('click', function() {
                document.getElementById('modalProductImage').src = imagePath;
                // Remove active class from all thumbnails
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                // Add active class to clicked thumbnail
                this.classList.add('active');
            });

            thumbnailContainer.appendChild(thumbnail);
        });
    }

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}
    
    // Close modal when clicking the close button
    closeButton?.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal function
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    }
    
    // Thumbnail functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            document.getElementById('modalProductImage').src = this.src;
        });
    });
    
    // Quantity selector functionality
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    minusBtn?.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });
    
    plusBtn?.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
    });
    
    // Size selection functionality
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            sizeOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });
    
    // Add to cart functionality from modal
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn?.addEventListener('click', function() {
        const productId = modal.getAttribute('data-current-product-id');
        const productData = products[productId];
        
        if (!productData) return;
        
        const product = {
            id: productId,
            name: document.getElementById('modalProductName').textContent,
            price: document.getElementById('modalProductPrice').textContent,
            image: document.getElementById('modalProductImage').src,
            quantity: parseInt(document.querySelector('.quantity-input').value) || 1
        };
        
        // Add to cart
        addToCart(product);
        
        // Show confirmation message
        showNotification(product.name + ' added to cart!');
    });
    
    // Buy now functionality
    const buyNowBtn = document.querySelector('.buy-now-btn');
    buyNowBtn?.addEventListener('click', function() {
        const productId = modal.getAttribute('data-current-product-id');
        const productData = products[productId];
        
        if (!productData) return;
        
        const product = {
            id: productId,
            name: productData.name,
            price: productData.price,
            image: productData.images[0],
            quantity: parseInt(document.querySelector('.quantity-input').value) || 1
        };
        
        // Add to cart
        addToCart(product);
        
        // Redirect to cart page
        window.location.href = '../Cart/cart.html';
    });

    // ENHANCED DYNAMIC PAGINATION
    const paginationProducts = document.querySelectorAll('.product-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const paginationContainer = document.querySelector('.pagination');

    


    
    
    if (paginationContainer) {
        // Show products per page
        const productsPerPage = 12;
        let currentPage = 1;
        const totalProducts = paginationProducts.length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        // Clear existing number buttons
        const existingNumberBtns = paginationContainer.querySelectorAll('.number-btn');
        existingNumberBtns.forEach(btn => {
            if (!btn.classList.contains('prev-btn') && !btn.classList.contains('next-btn')) {
                btn.remove();
            }
        });

        // Create new number buttons based on actual page count
        if (totalPages > 0) {
            const nextBtn = paginationContainer.querySelector('.next-btn');
            
            // Generate page number buttons
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = 'page-btn number-btn';
                pageBtn.setAttribute('data-page', i);
                pageBtn.textContent = i;
                
                if (i === 1) {
                    pageBtn.classList.add('active');
                }
                
                // Insert before next button
                paginationContainer.insertBefore(pageBtn, nextBtn);
                
                // Add click event
                pageBtn.addEventListener('click', function() {
                    currentPage = parseInt(this.dataset.page);
                    showPage(currentPage);
                });
            }
            
            // Only show pagination if there's more than one page
            paginationContainer.parentElement.style.display = totalPages > 1 ? 'block' : 'none';
        }
        
            // Center the pagination
            if (paginationContainer) {
                paginationContainer.style.display = 'flex';
                paginationContainer.style.justifyContent = 'center';
                paginationContainer.style.gap = '5px';
            }

            // Center the pagination container
            const paginationParent = paginationContainer.parentElement;
            if (paginationParent) {
                paginationParent.style.display = 'flex';
                paginationParent.style.justifyContent = 'center';
                paginationParent.style.margin = '40px 0';
            }

            // Style the pagination buttons for consistency
            const pageBtns = paginationContainer.querySelectorAll('button');
            pageBtns.forEach(btn => {
                btn.style.margin = '0 2px';
            });

        function showPage(pageNum) {
            // Calculate which products to show
            const startIndex = (pageNum - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            
            // Hide all products first
            paginationProducts.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show only current page products
            for (let i = startIndex; i < endIndex && i < paginationProducts.length; i++) {
                paginationProducts[i].style.display = 'block';
            }
            
            // Update active button state
            const numberBtns = document.querySelectorAll('.number-btn');
            numberBtns.forEach(btn => {
                btn.classList.remove('active');
                if (parseInt(btn.dataset.page) === currentPage) {
                    btn.classList.add('active');
                }
            });
            
            // Enable/disable prev/next buttons
            if (prevBtn) prevBtn.disabled = currentPage === 1;
            if (nextBtn) nextBtn.disabled = currentPage === totalPages;
            
            // Scroll to top of product section (optional)
            const productSection = document.querySelector('.product-section');
            if (productSection) {
                productSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Initialize first page
        if (paginationProducts.length > 0) {
            showPage(currentPage);
        }
        
        // Previous button click
        prevBtn?.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
        
        // Next button click
        nextBtn?.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
    }

    // Check if products are in wishlist and update UI
    updateWishlistUI();
    
   
});

// Function to add product to cart
function addToCart(product) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product is already in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
        // Product exists in cart, increase quantity
        cart[existingProductIndex].quantity += product.quantity || 1;
    } else {
        // Product doesn't exist in cart, add it
        cart.push(product);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in the header
    updateCartCount();
}

// Function to toggle product in wishlist
function toggleWishlist(product) {
    // Get current wishlist
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product is already in wishlist
    const existingProductIndex = wishlist.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
        // Product exists in wishlist, remove it
        wishlist.splice(existingProductIndex, 1);
    } else {
        // Product doesn't exist in wishlist, add it
        wishlist.push(product);
    }
    
    // Save updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update wishlist UI
    updateWishlistUI();
}

// Function to update wishlist UI
function updateWishlistUI() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistButtons = document.querySelectorAll('.heart-icon, .bx-heart, .bxs-heart, .add-to-wishlist');
    
    wishlistButtons.forEach(button => {
        const productCard = button.closest('.product-card, .row-item, .product');
        const productId = productCard?.dataset.id;
        
        if (productId && wishlist.some(item => item.id === productId)) {
            // Product is in wishlist, show filled heart
            button.classList.add('active');
            if (button.classList.contains('bx')) {
                button.classList.add('bxs-heart');
                button.classList.remove('bx-heart');
            }
        } else {
            // Product is not in wishlist, show outline heart
            button.classList.remove('active');
            if (button.classList.contains('bx')) {
                button.classList.remove('bxs-heart');
                button.classList.add('bx-heart');
            }
        }
    });
}

// Function to update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    // Update the cart count element if it exists
    const cartCountElement = document.querySelector('.cart-count-badge');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        
        // Make sure it's visible if there are items
        cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}

// Function to add cart count badge to the header
function addCartCountBadge() {
    const cartIcon = document.querySelector('.header-icons .bx-cart');
    if (cartIcon) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        
        // Create the badge if it doesn't exist
        let badge = document.querySelector('.cart-count-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-count-badge';
            cartIcon.parentNode.appendChild(badge);
            
            // Style the badge
            badge.style.position = 'absolute';
            badge.style.top = '-8px';
            badge.style.right = '-8px';
            badge.style.backgroundColor = '#8a8f70';
            badge.style.color = 'white';
            badge.style.fontSize = '12px';
            badge.style.width = '18px';
            badge.style.height = '18px';
            badge.style.borderRadius = '50%';
            badge.style.display = cartCount > 0 ? 'flex' : 'none';
            badge.style.alignItems = 'center';
            badge.style.justifyContent = 'center';
            badge.style.fontWeight = '600';
        }
        
        badge.textContent = cartCount;
    }
}

// Helper function to generate a unique ID for products that don't have one
function generateProductId() {
    return '_' + Math.random().toString(36).substr(2, 9);
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

// Function to populate brand dropdown
function populateBrandDropdown() {
    // Get the dropdown element
    const dropdown = document.getElementById('brandFilter');
    
    if (!dropdown) return;
    
    // Create a Set to store unique brands
    const brands = new Set();
    
    // Add all brands from products
    for (const id in products) {
        if (products[id].brand) {
            brands.add(products[id].brand);
        }
    }
    
    // Sort brands alphabetically
    const sortedBrands = Array.from(brands).sort();
    
    // Add "All Brands" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Brands';
    dropdown.appendChild(allOption);
    
    // Add each brand as an option
    sortedBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        dropdown.appendChild(option);
    });
    
    // Add change event listener
    dropdown.addEventListener('change', filterProductsByBrand);
}

// Initialize the brand filter when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add this to your existing DOMContentLoaded event handler
    populateBrandDropdown();
});

// Enhanced function to populate brand dropdown
function populateBrandDropdown() {
    // Get the dropdown element
    const dropdown = document.getElementById('brandFilter');
    
    if (!dropdown) return;
    
    // Create a Set to store unique brands
    const brands = new Set();
    
    // Add all brands from products
    for (const id in products) {
        if (products[id].brand) {
            brands.add(products[id].brand);
        }
    }
    
    // Sort brands alphabetically
    const sortedBrands = Array.from(brands).sort();
    
    // Add "All Brands" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Brands';
    dropdown.appendChild(allOption);
    
    // Add each brand as an option
    sortedBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        dropdown.appendChild(option);
    });
    
    // Add change event listener with animation
    dropdown.addEventListener('change', function() {
        // Add a subtle animation effect when changing
        this.classList.add('filter-changing');
        
        // Show loading state
        const productsContainer = document.querySelector('.product-container, .products-grid, .new-content');
        if (productsContainer) {
            productsContainer.style.opacity = '0.6';
            productsContainer.style.transition = 'opacity 0.3s ease';
        }
        
        // Slight delay to show animation
        setTimeout(() => {
            filterProductsByBrand();
            
            // Remove animation class
            this.classList.remove('filter-changing');
            
            // Restore opacity
            if (productsContainer) {
                productsContainer.style.opacity = '1';
            }
        }, 300);
    });
    
    // Add this class for animation
    const style = document.createElement('style');
    style.textContent = `
        .filter-changing {
            background-color: #f5f6f3;
        }
    `;
    document.head.appendChild(style);
}

// Function to filter products by brand (same as before)
function filterProductsByBrand() {
    // Get the selected brand
    const selectedBrand = document.getElementById('brandFilter').value;
    
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Counter for visible products
    let visibleCount = 0;
    
    // Loop through all products
    productCards.forEach(card => {
        // Get the product ID
        const productId = card.getAttribute('data-id');
        
        // Get the product data
        const product = products[productId];
        
        // If product exists and (selected brand is "all" or matches the product brand)
        if (product && (selectedBrand === 'all' || product.brand === selectedBrand)) {
            card.style.display = 'block'; // Show the product
            visibleCount++;
        } else {
            card.style.display = 'none'; // Hide the product
        }
    });
    
    // Show message if no products found
    const noProductsMessage = document.getElementById('noProductsMessage');
    if (noProductsMessage) {
        if (visibleCount === 0) {
            noProductsMessage.style.display = 'block';
        } else {
            noProductsMessage.style.display = 'none';
        }
    }
    
    // Reset pagination to first page after filtering
    if (typeof showPage === 'function' && typeof currentPage !== 'undefined') {
        currentPage = 1;
        showPage(1);
    }
}


