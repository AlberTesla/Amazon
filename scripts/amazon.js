import {cart, addToCart} from '../scripts/cart.js';
import {itemArray} from '../scripts/products.js';

const gridDiv = document.querySelector('.grid');
const cartNumber = document.querySelector('.cart-number');

let number = 0;
cart.forEach(function(item){
    number += item.quantity;
});

cartNumber.innerHTML = number;

let htmlData = '';
itemArray.forEach(function(value){
    let tempString = `
    <div class="flex-box">
        <div class="image-div">
            <img class="image" src="${value.image}">
        </div>
        <div class="data-div">
            <div class="name">
                ${value.name}
            </div>
            <div class="rating">
                ${value.rating}
            </div>
            <div class="total-ratings">
                ${value.totalRating}
            </div>
            <div style="font-weight : bold;" class="price">
                $${(value.price/100).toFixed(2)}
            </div>
            <div class="drop-box">
                <select>
                    <option value="items1">1</option>
                    <option value="items2">2</option>
                    <option value="items3">3</option>
                    <option value="items4">4</option>
                </select>
            </div>
            <div class="item-status">
            </div>
            <div class="cart-button-div">
                <button class="cart-button" data-product-id="${value.id}">Add to Cart</button>
            </div>
        </div>
    </div>
    `;
    htmlData += tempString;
});

gridDiv.innerHTML = htmlData;

const addtoCartButtons = document.querySelectorAll('.cart-button');
addtoCartButtons.forEach(function(value){
    value.addEventListener('click', function(){
        addToCart(value.dataset.productId);
    });
});