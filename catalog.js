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
    new Product("1", "GINGER CAT", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽239", "/images/cookie_type/ginger_cat.jpg", true),
    new Product("2", "LOVELY PUPPY", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽239", "/images/cookie_type/lovely_puppy.jpg", true),
    new Product("3", "LAZY KITTEN", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽199", "/images/cookie_type/lazy_kitten.jpg", true),
    new Product("4", "CHOCO DOG", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽199", "/images/cookie_type/choco_dog.jpg", true),
    new Product("5", "WHERE TO LOOK?", "Загадочное шоколадное брауни-печенье. Может быть оно смотрит на вас?", "₽359", "/images/cookie_type/where_to_look.jfif"),
    new Product("6", "SUGAR NIGHTMARE", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽299", "/images/cookie_type/sugar_nightmare.jfif"),
    new Product("7", "SWEETHEART", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽259", "/images/cookie_type/sweetheart.jfif"),
    new Product("8", "TEDDY BEAR", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽359", "/images/cookie_type/choco_bear.jfif"),
    new Product("9", "PINK BANG", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽399", "/images/cookie_type/pink_bang.jpg"),
    new Product("10", "NUT DREAM", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽299", "/images/cookie_type/nut_dream.jpg"),
    new Product("11", "GREEN TEA", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽359", "/images/cookie_type/green_tea.jpg"),
    new Product("12", "OREO BOOM", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽399", "/images/cookie_type/oreo_boom.jpg"),
    new Product("13", "CARROT LOVERS", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽239", "/images/cookie_type/carrot_lover.jpg"),
    new Product("14", "MARSHMALLOW", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽359", "/images/cookie_type/marshmallow.jpg"),
    new Product("15", "AMOROUS", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽199", "/images/cookie_type/amorous.jpg"),
    new Product("16", "SOFTNESS", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽299", "/images/cookie_type/softness.jpg")
  ];
  localStorage.setItem('productDatabase', JSON.stringify(productDatabase));
} else {
  productDatabase = JSON.parse(localStorage.getItem('productDatabase'));
}
var favouriteProducts;
if (localStorage.getItem('favourites') == null) {
  favouriteProducts = [];
  localStorage.setItem('favourites', JSON.stringify(productDatabase));
} else {
  favouriteProducts = JSON.parse(localStorage.getItem('favourites'));
}

const specialMenuProducts = productDatabase.filter(product => product.isSpecialMenu === true);

// функция загрузки продуктов на страницу
function loadProducts(products) {
  const catalogContainer = document.querySelector(".shop");
  catalogContainer.innerHTML = '';

  if(!products)
    return;

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("cookie_type");

    if(product.isSpecialMenu) {
      card.innerHTML = `
        <div class="img-container">
          <button class="like-button"><i class="heart fa-regular fa-heart"></i></button>
          <div class="cookie_type__price">${product.price}</div>
          <div class="season-offer">сезонное предложение</div>
          <img class="cookie_type__image" src="${product.imageUrl}" alt="${product.name}">
        </div>
        <div class="cookie_type_text">
          <p class="cookie_type_text__name"><b>${product.name}</b></p>
          <p class="cookie_type_text__info">${product.description}</p>
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
    } else {
      card.innerHTML = `
        <div class="img-container">
          <button class="like-button"><i class="heart fa-regular fa-heart"></i></button>
          <div class="cookie_type__price">${product.price}</div>
          <img class="cookie_type__image" src="${product.imageUrl}" alt="${product.name}">
        </div>
        <div class="cookie_type_text">
          <p class="cookie_type_text__name"><b>${product.name}</b></p>
          <p class="cookie_type_text__info">${product.description}</p>
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
    }
    catalogContainer.appendChild(card);

    if (favouriteProducts.find(favourite => product.id === favourite.id)) {
      card.querySelector('.img-container .like-button .heart').classList.remove("fa-regular");
      card.querySelector('.img-container .like-button .heart').classList.add("fa-solid"); 
    }
  });
}

function setEventListenersToButtons() {
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
      console.log('click');
      buyButton.style.visibility = "hidden";
      addMoreContainer.style.visibility = "visible";
      cart.addProduct(selectedProduct);
      count++;
      countSpan.textContent = count;
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
      }
      countSpan.textContent = count;
    })
  });
}

function setTouchListenersToCards() {
  const cards = document.querySelectorAll('.cookie_type'); 

  cards.forEach(card => {
    var isTouched = false;
    const imgContainer = card.querySelector('.img-container .cookie_type__image');
    const textBlock = card.querySelector('.cookie_type_text');
    const textInfoBlock = card.querySelector('.cookie_type_text__info');

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

    const likeButton = card.querySelector(".img-container .like-button");
    const productId = card.querySelector('.cart-button').id;
    const selectedProduct = productDatabase.find(product => product.id === productId);

    likeButton.addEventListener('click', function() {
      console.log("click");
      const heart = likeButton.querySelector(".heart");

      if (heart.classList.contains("fa-regular")) {
        favouriteProducts.push(selectedProduct);
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
      } else {
        favouriteProducts = favouriteProducts.filter(favourite => favourite.id != selectedProduct.id);
        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function(){
  loadProducts(productDatabase); // загружаем продукты на страницу
  setEventListenersToButtons();
  setTouchListenersToCards();

  var currentProducts = productDatabase;

  const sortSelect = document.getElementById("sortSelect");
  sortSelect.addEventListener("change", function() {
    const selectedOption = this.value;
    if (selectedOption === "default") {
      loadProducts(currentProducts);
      setEventListenersToButtons();
      setTouchListenersToCards();
    } else if (selectedOption === "ascending") {
      loadProducts([...currentProducts].sort((a, b) => a.price.localeCompare(b.price)));
      setEventListenersToButtons();
      setTouchListenersToCards();
    } else if (selectedOption === "descending") {
      loadProducts([...currentProducts].sort((a, b) => b.price.localeCompare(a.price)));
      setEventListenersToButtons();
      setTouchListenersToCards();
    }
  });

  const typeSelect = document.getElementById("typeSelect");
  typeSelect.addEventListener("change", function() {
    sortSelect.value = "default";
    const selectedOption = this.value;
    if (selectedOption === "default") {
      currentProducts = productDatabase;
      loadProducts(currentProducts);
      setEventListenersToButtons();
      setTouchListenersToCards();
    } else if (selectedOption === "favourite") {
      currentProducts = favouriteProducts;
      loadProducts(currentProducts);
      setEventListenersToButtons();
      setTouchListenersToCards();
    } else if (selectedOption === "season") {
      currentProducts = specialMenuProducts;
      loadProducts(currentProducts);
      setEventListenersToButtons();
      setTouchListenersToCards();
    }
  });
    
});

window.addEventListener('beforeunload', function() {
  localStorage.setItem('cart', JSON.stringify(cart)); // записываем в локальное хранилище данные из временного объекта
  localStorage.setItem('favourites', JSON.stringify(favouriteProducts));
});