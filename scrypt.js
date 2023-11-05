"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const showLoginFormButton = document.getElementById("showLoginFormButton");
  const showLoginFormButtonMobile = document.getElementById("showLoginFormButtonMobile");
  const popupLoginForm = document.getElementById("loginForm");
  const closeLoginFormButton = document.getElementById("closeLoginFormButton");
  showLoginFormButton.addEventListener("click", function () {
      //pract 9
      let result = prompt("Желаете пройти регистрацию на сайте?");
      if (result == "Да") {
        alert("Круто!")
        result = prompt("Введите логин или АДМИН для администрирования.");
        if (result == "АДМИН") {
          result = prompt("Введите пароль.")
          if (result == "Я главный") {
            alert("Здравствуйте!")
          }
          else if (!result) {
            alert ("Отменено.")
          }
          else {
            alert ("Неверный пароль.")
          }
        }
        else if (!result) {
          alert("Отменено");
        }
        else {
          alert("Я вас не знаю... Зарегистрируйтесь!");
          popupLoginForm.style.display = "flex";
        }
      }
      else {
        alert("Попробуйте еще раз..")
      }
  });

  showLoginFormButtonMobile.addEventListener("click", function () {
    popupLoginForm.style.display = "flex";
  });

  closeLoginFormButton.addEventListener("click", function () {
      popupLoginForm.style.display = "none";
  });

  const burgerButton = document.querySelector(".header-burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  burgerButton.addEventListener("click", function(event) {
    event.stopPropagation(); 
    if (!mobileMenu.classList.contains("active")) {
      mobileMenu.classList.add("active");
      mobileMenu.style.display = "block";
      burgerButton.style.transform = "rotate(90deg)";
    } else {
      mobileMenu.classList.remove("active");
      mobileMenu.style.display = "none";
      burgerButton.style.transform = "rotate(0deg)";
    }
  });

  const products = document.querySelector(".products");
  const product = document.querySelectorAll(".product");
  let currentDegree = 0;
  
  product.forEach(item => {
    item.addEventListener("click", function(event) {
      currentDegree += 90;
      products.style.transform = "rotate(" + currentDegree + "deg)";
    });
  });
  
  const newImages = [
    'images/cookie1.png',
    'images/cookie2.png',
    'images/cookie3.png',
  ];

  const cookie__1 = document.querySelector('.cookie__1');
  const cookie__2 = document.querySelector('.cookie__2');
  const cookie__3 = document.querySelector('.cookie__3');
  const cookie__4 = document.querySelector('.cookie__4');
  let currentImageIndex = 0;

  function changeImage() {
      cookie__1.src = newImages[currentImageIndex];
      setTimeout(function() {
          cookie__2.src = newImages[currentImageIndex];
          setTimeout(function() {
              cookie__3.src = newImages[currentImageIndex];
              setTimeout(function() {
                  cookie__4.src = newImages[currentImageIndex];
                  currentImageIndex = (currentImageIndex + 1) % newImages.length;
                  setTimeout(changeImage, 1000);
              }, 300);
          }, 300);
      }, 300);
  }

  changeImage();

  document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement, {
      style: `
      --move-x: ${(e.clientX) * .0005}vw;
      --move-y: ${(e.clientY) * .0009}vw;
      `
    })
  })  

  //pract 9
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', function(event) {
      console.log("click");
      const heart = event.target.querySelector(".heart");

      if (heart.classList.contains("fa-regular")) {
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
      } else {
        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
      }
    });
  });

});