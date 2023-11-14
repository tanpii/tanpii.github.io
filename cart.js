import Product from "./product_class.js";
import Cart from "./cart_class.js";

// создание корзины, если ее еще нет в локальном хранилище
var cart;
const cartJSON = localStorage.getItem('cart');
const productDatabase = JSON.parse(localStorage.getItem('productDatabase'));

if (cartJSON) {
  cart = new Cart();
  Object.assign(cart, JSON.parse(cartJSON)); //копируем данные для временного объекта
} else {
  cart = new Cart();
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadProducts() {
  const cartContainer = document.querySelector(".cart-container");

  cart.products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    let cost = product.quantity * parseInt(product.price.substring(1));

    card.innerHTML = `
    <div class="image-container"><img src="${product.imageUrl}"></div>
    <span class="info">${product.name} | ${product.price}</span>
    <div class="addmore" id="${product.id}">
      <button class="less-button">-</button>
      <span class="count">${product.quantity}</span>
      <button class="more-button">+</button>
    </div>
    <span class="count"> ${cost}</span>
    `;
    cartContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function(){
  loadProducts();

  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach(card => {
    var addmore = card.querySelector(".addmore");
    var moreButton = card.querySelector(".more-button");
    var lessButton = card.querySelector(".less-button");
    var countSpan = card.querySelector(".count");

    const productId = addmore.id;
    const selectedProduct = productDatabase.find(product => product.id === productId);
    var count = cart.products.find(product => product.id === productId).quantity;

    moreButton.addEventListener("click", function(){
      cart.addProduct(selectedProduct);
      count++;
      countSpan.textContent = count;
    })

    lessButton.addEventListener("click", function(){
      cart.removeProduct(selectedProduct);
      count--;
      if (count == 0) {
        card.remove();
      }
      countSpan.textContent = count;
    })
  });
});

window.addEventListener('beforeunload', function() {
  localStorage.setItem('cart', JSON.stringify(cart)); // записываем в локальное хранилище данные из временного объекта
});