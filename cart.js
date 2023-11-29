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

function loadCount() {
  var cartCounters = document.querySelectorAll('.cart-count');
  cartCounters.forEach(cartCount => {
    cartCount.textContent = cart.count;
  })
}

function loadProducts() {
  if (cart.products.length == 0) {
    document.querySelector('.cart-container').innerHTML = `
      <div class="no-products">
        <img class="no-products__photo" src="images/cookie_monster_sad.jpg">
        <span>корзина пуста :(</span>
        <a href="catalog.html">К КАТАЛОГУ</a>
      </div>
    `;
    return;
  }
  const cartContainer = document.querySelector(".products-container");

  cart.products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    let cost = product.quantity * parseInt(product.price.substring(1));

    card.innerHTML = `
    <div class="image-container"><img src="${product.imageUrl}"></div>
    <span class="product-card__name">${product.name}</span>
    <div class="addmore" id="${product.id}">
      <button class="less-button">-</button>
      <span class="count">${product.quantity}</span>
      <button class="more-button">+</button>
    </div>
    <div class="line"></div>
    <span class="product-card__cost">₽${cost}</span>
    `;
    cartContainer.appendChild(card);
  });
}

function loadInfoAboutOrder(isPickup = false) {
  const resultSpan = document.querySelector(".result");
  const costSpan = document.querySelector(".result-cost");
  const deliverySpan = document.querySelector(".result-delivery");

  let totalCost = cart.cost;
  let totalDelivery = cart.delivery;

  costSpan.textContent = '₽' + totalCost;
  deliverySpan.textContent = '₽' + totalDelivery;
  if (isPickup) {
    resultSpan.textContent = '₽' + totalCost;
  } else {
    resultSpan.textContent = '₽' + (totalCost + totalDelivery);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  loadCount();
  loadProducts();
  loadInfoAboutOrder();

  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach(card => {
    const addmore = card.querySelector(".addmore");
    const moreButton = card.querySelector(".more-button");
    const lessButton = card.querySelector(".less-button");
    const countSpan = card.querySelector(".count");

    const productId = addmore.id;
    const selectedProduct = cart.products.find(product => product.id === productId);
    var count = selectedProduct.quantity;
    var costSpan = card.querySelector(".product-card__cost");

    moreButton.addEventListener("click", function() {
      cart.addProduct(selectedProduct);
      count++;
      countSpan.textContent = count;
      costSpan.textContent = '₽' + count * parseInt(selectedProduct.price.substring(1));
      loadInfoAboutOrder();
      loadCount();
    })

    lessButton.addEventListener("click", function(){
      cart.removeProduct(selectedProduct);
      count--;
      if (count == 0) {
        card.remove();
      }
      countSpan.textContent = count;
      costSpan.textContent = '₽' + count * parseInt(selectedProduct.price.substring(1));
      loadInfoAboutOrder();
      loadCount();
    })
  });

  const pickupCheckbox = document.getElementById('pickup-checkbox');

  pickupCheckbox.addEventListener('change', function(event) {
    if (this.checked) {
      document.querySelector(".result-delivery").style.textDecoration = 'line-through';
      loadInfoAboutOrder(true);
      loadCount();
    } else {
      document.querySelector(".result-delivery").style.textDecoration = 'none';
      loadInfoAboutOrder();
      loadCount();
    }
  });
});

window.addEventListener('beforeunload', function() {
  localStorage.setItem('cart', JSON.stringify(cart)); // записываем в локальное хранилище данные из временного объекта
});