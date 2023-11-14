import Product from "./product_class.js";
import Cart from "./cart_class.js";

// создание корзины, если ее еще нет в локальном хранилище
var cart;
const cartJSON = localStorage.getItem('cart');

if (cartJSON) {
  cart = new Cart();
  Object.assign(cart, JSON.parse(cartJSON)); //копируем данные для временного объекта
} else {
  cart = new Cart();
  localStorage.setItem('cart', JSON.stringify(cart));
}

// создание базы данных, если ее еще нет в локальном хранилище
var productDatabase;
if (localStorage.getItem('productDatabase') == null) {
  productDatabase = [
    new Product("1", "GINGER CAT", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽299", "/images/cookie_type/ginger_cat.jpg"),
    new Product("2", "LOVELY PUPPY", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽259", "/images/cookie_type/lovely_puppy.jpg"),
    new Product("3", "LAZY KITTEN", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽259", "/images/cookie_type/lazy_kitten.jpg"),
    new Product("4", "CHOCO DOG", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽199", "/images/cookie_type/choco_dog.jpg"),
    new Product("5", "WHERE TO LOOK?", "Загадочное шоколадное брауни-печенье. Может быть оно смотрит на вас?", "₽300", "/images/cookie_type/where_to_look.jfif"),
    new Product("6", "SUGAR NIGHTMARE", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/sugar_nightmare.jfif"),
    new Product("7", "SWEETHEART", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/sweetheart.jfif"),
    new Product("8", "TEDDY BEAR", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/choco_bear.jfif"),
    new Product("9", "PINK BANG", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/pink_bang.jpg"),
    new Product("10", "NUT DREAM", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/nut_dream.jpg"),
    new Product("11", "GREEN TEA", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/green_tea.jpg"),
    new Product("12", "OREO BOOM", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/oreo_boom.jpg"),
    new Product("13", "CARROT LOVERS", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/carrot_lover.jpg"),
    new Product("14", "MARSHMALLOW", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/marshmallow.jpg"),
    new Product("15", "AMOROUS", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/amorous.jpg"),
    new Product("16", "SOFTNESS", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "$6.99", "/images/cookie_type/softness.jpg")
  ];
  localStorage.setItem('productDatabase', JSON.stringify(productDatabase));
} else {
  productDatabase = JSON.parse(localStorage.getItem('productDatabase'));
}

// функция загрузки продуктов на страницу
function loadProducts() {
  const catalogContainer = document.querySelector(".shop");

  productDatabase.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("cookie_type");

    card.innerHTML = `
      <div class="img-container">
        <button class="like-button"><i class="heart fa-regular fa-heart"></i></button>
        <div class="price">${product.price}</div>
        <img src="${product.imageUrl}" alt="${product.name}">
      </div>
      <div class="cookie_type_text">
        <p class="name"><b>${product.name}</b></p>
        <p class="info">${product.description}</p>
      </div>
      <div class="cart-button" id="${product.id}">
        <button class="buy-button">КУПИТЬ</button>
        <div class="addmore">
          <button class="less-button">-</button>
          <span class="count">1</span>
          <button class="more-button">+</button>
        </div>
      </div>
    `;
    catalogContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function(){
  loadProducts(); // загружаем продукты на страницу
  
  const cartButtons = document.querySelectorAll(".cart-button");
  cartButtons.forEach(button => {
    var count = 0;
    var buyButton = button.querySelector(".buy-button");
    var addMoreContainer = button.querySelector(".addmore");
    var moreButton = button.querySelector(".more-button");
    var lessButton = button.querySelector(".less-button");
    var countSpan = button.querySelector(".count");

    const productId = button.id;
    const selectedProduct = productDatabase.find(product => product.id === productId);
    var isInCart = cart.products.some(product => product.id === productId);

    if (isInCart) {
      buyButton.style.visibility = "hidden";
      addMoreContainer.style.visibility = "visible";
      count = cart.products.find(product => product.id === productId).quantity;
      countSpan.textContent = count;
    }

    buyButton.addEventListener("click", function() {
      buyButton.style.visibility = "hidden";
        addMoreContainer.style.visibility = "visible";
        cart.addProduct(selectedProduct);
        count++;
    })

    moreButton.addEventListener("click", function(){
      cart.addProduct(selectedProduct);
      count++;
      countSpan.textContent = count;
    })

    lessButton.addEventListener("click", function(){
      cart.removeProduct(selectedProduct);
      count--;
      if (count == 0) {
        buyButton.style.visibility = "visible";
        addMoreContainer.style.visibility = "hidden";
        isClicked = false;
      }
      countSpan.textContent = count;
    })
  });

  const cards = document.querySelectorAll('.cookie_type'); 

  cards.forEach(card => {
    var isTouched = false;
    const imgContainer = card.querySelector('.img-container');
    const textBlock = card.querySelector('.cookie_type_text');
    const textInfoBlock = card.querySelector('.info');
    imgContainer.addEventListener('touchstart', function(event) {
      event.preventDefault(); // Предотвращаем действие по умолчанию (например, открытие контекстного меню)
      if (!isTouched) {
        textBlock.classList.add('touch-active'); // Добавляем класс при касании
        textInfoBlock.classList.add('touch-active__info');
        isTouched = true;
      } else {
        textBlock.classList.remove('touch-active'); // Добавляем класс при касании
        textInfoBlock.classList.remove('touch-active__info');
        isTouched = false;
      }
    });
  });
});

window.addEventListener('beforeunload', function() {
  localStorage.setItem('cart', JSON.stringify(cart)); // записываем в локальное хранилище данные из временного объекта
});