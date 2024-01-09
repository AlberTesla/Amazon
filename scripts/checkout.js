import {cart, saveToStorage, updateCartQuantity} from '../scripts/cart.js';
import {itemArray} from '../scripts/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today = dayjs();
const format7Days = today.add(7, 'days').format('dddd, MMMM, D');
const format3Days = today.add(3, 'days').format('dddd, MMMM, D');
const format1Day = today.add(1, 'days').format('dddd, MMMM, D');

let htmlString = '';
const objectHtml = document.querySelector('.left-part');
const checkoutHtml = document.querySelector('.checkout');

let number = 0;
cart.forEach(function(object){
    number += object.quantity;
});

checkoutHtml.innerHTML = `Checkout (${number}) items`;

cart.forEach(function(itemObject){
    itemArray.forEach(function(itemArrayObject){
        if (itemObject.productId === itemArrayObject.id){
            let innerHtmlString = `
            <div class="left-part" data-product-id="${itemArrayObject.id}">
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
                            <div class="item-price">$${(itemArrayObject.price/100).toFixed(2)}</div>
                            <div class="item-quantity-buttons" data-product-id="${itemArrayObject.id}">
                                <span>Quantity:</span>
                                <div class="item-quantity-field" data-element-type="text" data-product-id="${itemArrayObject.id}" style="display: inline;">
                                    <div class="text" style="display : inline;">${itemObject.quantity}</div>
                                </div>
                                <div class="item-update-field" data-product-id="${itemArrayObject.id}" style="display: inline;">
                                    <span class="update-button" data-product-id="${itemArrayObject.id}">Update</span>
                                </div>
                                <span class="delete-button" data-product-id="${itemArrayObject.id}">Delete</span>
                            </div>
                        </div>
                        <div class="radio-label-div">
                            <div class="title-div">
                                Choose Delivery Option:
                            </div>
                            <div class="radio-div">
                                <div class="radio-left-div"  data-product-id="${itemArrayObject.id}">
                                    <input class="radio-button" ${String(itemObject.dayOption === 1 ? 'checked' : '')} type="radio" data-radio-number="1" style="height : 15px; width : 15px; align-self : center;" name="radio-${itemArrayObject.id}">
                                    <input class="radio-button" ${String(itemObject.dayOption === 2 ? 'checked' : '')} type="radio" data-radio-number="2" style="height : 15px; width : 15px; align-self : center;" name="radio-${itemArrayObject.id}">
                                    <input class="radio-button" ${String(itemObject.dayOption === 3 ? 'checked' : '')} type="radio" data-radio-number="3" style="height : 15px; width : 15px; align-self : center;" name="radio-${itemArrayObject.id}">
                                </div>
                                <div class="radio-right-div">
                                    <div class="radio-right-text-div" data-radio-number="1">
                                        <p class="para-div" data-heading-number="1">${format7Days}</p>
                                        <p class="para-div-default">Free Shipping</p>
                                    </div>
                                    <div class="radio-right-text-div" data-radio-number="2">
                                        <p class="para-div" data-heading-number="2">${format3Days}</p>
                                        <p class="para-div-default">$4.99 - Shipping</p>
                                    </div>
                                    <div class="radio-right-text-div" data-radio-number="3">
                                        <p class="para-div" data-heading-number="3">${format1Day}</p>
                                        <p class="para-div-default">$9.99 - Shipping</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            htmlString += innerHtmlString;
        }
    });
});

objectHtml.innerHTML = htmlString;

function updateInputField(button){
    const childrenElement = button.parentNode.parentNode.childNodes;
    childrenElement.forEach(function(element){
        if (element.className === "item-quantity-field"){
            if (element.dataset.elementType === "text"){
                element.dataset.elementType = "input"
                let value;
                element.childNodes.forEach(function(valueObject){
                    if (valueObject.className === "text"){
                        value = Number(valueObject.innerText);
                    }
                });
                element.innerHTML = `<input class="input" type="number" style="width : 42px; display : inline;" value="${value}">`;
            }
            else if (element.dataset.elementType === "input"){
                element.dataset.elementType = "text"
                let valueString;
                element.childNodes.forEach(function(valueObject){
                    if (valueObject.className === "input"){
                        console.log(element.value);
                        valueString = String(valueObject.value);
                    }
                });
                element.innerHTML = `<div class="text" style="display : inline;">${valueString}</div>`;
            }
        }
        else if (element.className === "item-update-field"){
            element.classList.remove('item-update-field');
            element.classList.add('item-add-field');
            element.innerHTML = `<span class="add-button" data-product-id="${element.id}">Add</span>`;
            const innerElement = element.querySelector('.add-button');
            innerElement.addEventListener('click', function(){
                updateInputField(innerElement);
            });
        }
        else if (element.className === "item-add-field"){
            element.classList.remove('item-add-field');
            element.classList.add('item-update-field');
            element.innerHTML = `<span class="update-button" data-product-id="${element.id}">Update</span>`;
            const innerElement = element.querySelector('.update-button');
            innerElement.addEventListener('click', function(){
                updateInputField(innerElement);
            });
        }
    });
}

const updateButtons = document.querySelectorAll('.update-button');
const deleteButtons = document.querySelectorAll('.delete-button');
const radioButtons = document.querySelectorAll('.radio-button');

function updateCartDayOption(productId, dayOption){
    cart.forEach(function(obj){
        if(productId === obj.productId){
            obj.dayOption = Number(dayOption);
        }
    });
    saveToStorage();
}

radioButtons.forEach(function(radio){
    radio.addEventListener('click', function(event){
        updateCartDayOption(event.target.parentNode.dataset.productId, event.target.dataset.radioNumber);
    });
})

updateButtons.forEach(function(button){
    button.addEventListener('click', function(){
        updateInputField(button);
    });
});

function removeElement(productId){
    const mainElements = document.querySelectorAll('.left-part');
    mainElements.forEach(function(mainElement){
        if (productId === mainElement.dataset.productId){
            mainElement.remove();
        }
    });

    let newCart = [];
    cart.forEach(function(cartObject){
        if (cartObject.productId !== productId){
            newCart.push(cartObject);
        }
    });
    cart = newCart;
}

deleteButtons.forEach(function(deleteButton){
    deleteButton.addEventListener('click', function(){
        removeElement(deleteButton.dataset.productId);
    });
});