export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart){
    cart = [];
}

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
        cart.push({productId : productId, quantity : 1, dayOption : 1});
    }
    console.log(cart);
    updateCartQuantity();
    saveToStorage();
}

export function saveToStorage(){
    if (localStorage.getItem('cart')){
        localStorage.removeItem('cart');
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