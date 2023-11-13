class Product {
  constructor(id, name, description, price, imageUrl) {
    this.id == id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}

// создание базы данных, если ее еще нет в локальном хранилище
if (localStorage.getItem('productDatabase') == null) {
  const productDatabase = [
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
  const productDatabaseJSON = JSON.stringify(productDatabase);
  localStorage.setItem('productDatabase', productDatabaseJSON);
}

// загрузка продуктов на страницу
function loadProducts() {
  const catalogContainer = document.querySelector(".shop");
  const productDatabaseJSON = localStorage.getItem('productDatabase');
  const productDatabase = JSON.parse(productDatabaseJSON);

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
      <button class="button"><i class="fa-solid fa-basket-shopping" style="color: white; font-size: calc(12px + 0.2vw);"></i> КУПИТЬ</button>
    `;
    catalogContainer.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", loadProducts);