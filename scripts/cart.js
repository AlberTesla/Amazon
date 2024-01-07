export let cart = [];

export function addToCart(productId){
    let matchedItem;
    cart.forEach(function(object){
        if (object.productId === productId){
            matchedItem = object;
            return;
        }
    });

    if (matchedItem){
        matchedItem.quantity++;
    }
    else{
        cart.push({productId : productId, quantity : 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQuantity(){
    let totalQuanity = 0;
    cart.forEach(function(value){
        totalQuanity += value.quantity;
    });
    const quantityElement = document.querySelector('.cart-number');
    quantityElement.innerHTML = totalQuanity;
}