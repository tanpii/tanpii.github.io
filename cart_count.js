import Cart from "./cart_class.js";

document.addEventListener("DOMContentLoaded", function(){
  if (localStorage.getItem('cart') != null) {
    var cartData = JSON.parse(localStorage.getItem('cart'));
    var cart = new Cart(); // Создание нового экземпляра класса Cart
    cart.products = cartData.products; // Предполагаем, что данные в Local Storage хранятся в формате, понятном для Cart
    var cartCounters = document.querySelectorAll('.cart-count');
    cartCounters.forEach(cartCount => {
      cartCount.textContent = cart.count;
    });
  }
})
