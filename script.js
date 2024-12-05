// DOM elements
const cartItems = document.querySelectorAll('.cart-item'); 
const totalPriceElement = document.querySelector('.total-price .total'); 
let totalPrice = 0;

// Function update price
function updateTotalPrice() {
    totalPrice = 0;
    cartItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const price = parseFloat(item.querySelector('.unit-price').textContent.replace(' $', ''));
        totalPrice += quantity * price;
    });
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} $`;
}
// Function quantity change
function adjustQuantity(e) {
    const button = e.target;
    const cartItem = button.closest('.cart-item');
    const quantityElement = cartItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);

    if (button.classList.contains('increase')) {
        quantity++;
    } else if (button.classList.contains('decrease') && quantity > 0) {
        quantity--;
    }

    quantityElement.textContent = quantity;
    updateTotalPrice();
}
// Function item deletion
function deleteItem(e) {
    const cartItem = e.target.closest('.cart-item');
    cartItem.remove();
    updateTotalPrice();
}
// Function toggle heart color 
function toggleHeart(e) {
    const heartButton = e.target;
    if (heartButton.style.color === 'red') {
        heartButton.style.color = 'gray'; 
    } else {
        heartButton.style.color = 'red'; 
    }
}

// event listeners to cart items
cartItems.forEach(item => {
    const increaseButton = item.querySelector('.increase');
    const decreaseButton = item.querySelector('.decrease');
    const deleteButton = item.querySelector('.delete');
    const heartButton = item.querySelector('.heart');

    increaseButton.addEventListener('click', adjustQuantity);
    decreaseButton.addEventListener('click', adjustQuantity);
    deleteButton.addEventListener('click', deleteItem);
    heartButton.addEventListener('click', toggleHeart); 
});

updateTotalPrice();
