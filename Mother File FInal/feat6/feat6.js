document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery
    function changeImage(src) {
        document.getElementById('mainImage').src = src;
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
            if(thumb.src === src) {
                thumb.classList.add('active');
            }
        });
    }

    // Quantity Controls
    const quantityInput = document.querySelector('.quantity-input');
    const plusBtn = document.querySelector('.plus');
    const minusBtn = document.querySelector('.minus');

    plusBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    minusBtn.addEventListener('click', () => {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    // Variant Selection
    const variantBtns = document.querySelectorAll('.variant-btn');
    variantBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            variantBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Add to Cart
    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        // Add your cart functionality here
        alert('Product added to cart!');
    });

    // Buy Now
    const buyNowBtn = document.querySelector('.buy-now');
    buyNowBtn.addEventListener('click', () => {
        // Add your checkout functionality here
        alert('Proceeding to checkout!');
    });

    // Wishlist
    const wishlistBtn = document.querySelector('.add-to-wishlist');
    wishlistBtn.addEventListener('click', () => {
        wishlistBtn.classList.toggle('active');
        // Add your wishlist functionality here
    });
});