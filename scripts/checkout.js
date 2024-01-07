//import {cart} from '../scripts/cart.js';
import {itemArray} from '../scripts/products.js';
let htmlString = '';
const objectHtml = document.querySelector('.left-part');
const checkoutHtml = document.querySelector('.checkout');

let cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart);
let number = 0;
cart.forEach(function(object){
    number += object.quantity;
});

checkoutHtml.innerHTML = `Checkout (${number}) items`;

cart.forEach(function(itemObject){
    itemArray.forEach(function(itemArrayObject){
        if (itemObject.productId === itemArrayObject.id){
            console.log('hello');
            let innerHtmlString = `
            <div class="left-part">
                <div class="left-part-inner">
                    <div class="item-date">
                        Delivery Date : Tuesday, January, 16
                    </div>
                    <div class="item-content-detail">
                        <div class="item-logo-div">
                            <img class="image-logo" src="${itemArrayObject.image}">
                        </div>
                        <div class="item-content-div">
                            <div class="item-name">${itemArrayObject.name}</div>
                            <div class="item-price">${(itemArrayObject.price/100).toFixed(2)}</div>
                            <div class="item-quantity-buttons">
                                <span>Quantity:</span>
                                <span>${itemObject.quantity}</span>
                                <span>Update</span>
                                <span>Delete</span>
                            </div>
                        </div>
                        <div class="item-buttons-div">Choose a delivery option:</div>

                    </div>
                </div>
            </div>`;
            htmlString += innerHtmlString;
        }
    });
});
objectHtml.innerHTML = htmlString;