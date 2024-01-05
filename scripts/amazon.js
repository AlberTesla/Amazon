import {cart} from '../scripts/cart.js';
import {itemArray} from '../scripts/products.js';

const gridDiv = document.querySelector('.grid');

let htmlData = '';
itemArray.forEach(function(value, index){
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
addtoCartButtons.forEach(function(value, index){
    value.addEventListener('click', function(event){
        const productId = value.dataset.productId
        //check if value exists in array
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

        let totalQuanity = 0;
        cart.forEach(function(value){
            totalQuanity += value.quantity;
        })

        const quantityElement = document.querySelector('.cart-number');
        quantityElement.innerHTML = totalQuanity;
        console.log(cart);
    });
});