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
    new Product("1", "GINGER CAT", "Невероятно хрустящее имбирное печенье. Эти котята скрасят ваш вечер.", "₽239", "/images/cookie_type/ginger_cat.jpg", true),
    new Product("2", "LOVELY PUPPY", "Вы любите собак? Это печенье специально для вас! Нежный шоколадный и сливочный вкус.", "₽239", "/images/cookie_type/lovely_puppy.jpg", true),
    new Product("3", "LAZY KITTEN", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽199", "/images/cookie_type/lazy_kitten.jpg", true),
    new Product("4", "CHOCO DOG", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽199", "/images/cookie_type/choco_dog.jpg", true),
    new Product("5", "WHERE TO LOOK?", "Загадочное шоколадное брауни-печенье. Может быть оно смотрит на вас?", "₽359", "/images/cookie_type/where_to_look.jfif"),
    new Product("6", "SUGAR NIGHTMARE", "Шоколадное печенье с M&M's внутри. Сверху призрак из маршмэллоу. Пугающе сладко!", "₽299", "/images/cookie_type/sugar_nightmare.jfif"),
    new Product("7", "SWEETHEART", "Легкое и нежное печенье с нотками ванили и легкой сладостью. Милые сердечки для вас.", "₽259", "/images/cookie_type/sweetheart.jfif"),
    new Product("8", "TEDDY BEAR", "Интенсивный шоколадный вкус, окруженный нежностью и мягкостью шоколадного печенья.", "₽359", "/images/cookie_type/choco_bear.jfif"),
    new Product("9", "PINK BANG", "Сладкое печенье с насыщенными фруктовыми оттенками и нежной сладостью.", "₽399", "/images/cookie_type/pink_bang.jpg"),
    new Product("10", "NUT DREAM", "Ароматное ореховое печенье с хрустящими орехами. Наслаждение каждым кусочком.", "₽299", "/images/cookie_type/nut_dream.jpg"),
    new Product("11", "GREEN TEA", "Нежное печенье с легкими нотками зеленого чая, обладающее легким и освежающим вкусом.", "₽359", "/images/cookie_type/green_tea.jpg"),
    new Product("12", "OREO BOOM", "Насыщенный шоколадный вкус, дополненный кремовыми нотками и хрустящими крошками Oreo.", "₽399", "/images/cookie_type/oreo_boom.jpg"),
    new Product("13", "CARROT LOVERS", "Милые кролики с нежной сладостью и нотками свежести моркови.", "₽239", "/images/cookie_type/carrot_lover.jpg"),
    new Product("14", "MARSHMALLOW", "Хрустящее шоколадное печенье с тающим маршмэллоу внутри. Безумно вкусно.", "₽359", "/images/cookie_type/marshmallow.jpg"),
    new Product("15", "AMOROUS", "Милые медважата из хрустящего шоколадного печенья. Сердца с привкусом земляники!", "₽199", "/images/cookie_type/amorous.jpg"),
    new Product("16", "SOFTNESS", "Сливочное печенье с молочно-клубничным кремом. Тающая нежность!", "₽299", "/images/cookie_type/softness.jpg"),
    new Product("17", "VERY BERRY", "Ягодное печенье с интенсивным и ярким вкусом смеси свежих ягод.", "₽359", "/images/cookie_type/very_berry.jpg"),
    new Product("18", "BROWNIE", "Нежнейшее шоколадное печенье с кофейным кремом внутри. Буквально тает во рту.", "₽399", "/images/cookie_type/brownie.jpg"),
    new Product("19", "BERRY FIELD", "Насыщенное ягодное печенье, словно прогулка по полям полным свежих ягод.", "₽319", "/images/cookie_type/berry_field.jpg"),
    new Product("20", "PURPLISH", "Печенье с интенсивным и сладким вкусом винограда, окрашенное нотками таинственности и сладости.", "₽319", "/images/cookie_type/purplish.jpg")
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

function loadCount() {
  var cartCounters = document.querySelectorAll('.cart-count');
  cartCounters.forEach(cartCount => {
    cartCount.textContent = cart.count;
  })
}

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
      document.querySelector(".cookie-add").style.visibility = "visible";
      setTimeout(() => {
        document.querySelector(".cookie-add").style.visibility = "hidden";
      }, 1000);
      console.log('click');
      buyButton.style.visibility = "hidden";
      addMoreContainer.style.visibility = "visible";
      cart.addProduct(selectedProduct);
      count++;
      countSpan.textContent = count;
      loadCount();
    })

    moreButton.addEventListener("click", function(){
      cart.addProduct(selectedProduct);
      count++;
      countSpan.textContent = count;
      loadCount();
    })

    lessButton.addEventListener("click", function(){
      cart.removeProduct(selectedProduct);
      count--;
      if (count == 0) {
        buyButton.style.visibility = "visible";
        addMoreContainer.style.visibility = "hidden";
      }
      countSpan.textContent = count;
      loadCount();
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
  loadCount();
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