document.addEventListener("DOMContentLoaded", function () {
  const showLoginFormButton = document.getElementById("showLoginFormButton");
  const showLoginFormButtonMobile = document.getElementById("showLoginFormButtonMobile");
  const popupLoginForm = document.getElementById("loginForm");
  const closeLoginFormButton = document.getElementById("closeLoginFormButton");

  showLoginFormButton.addEventListener("click", function () {
      popupLoginForm.style.display = "flex";
  });
  showLoginFormButtonMobile.addEventListener("click", function () {
    popupLoginForm.style.display = "flex";
  });

  closeLoginFormButton.addEventListener("click", function () {
      popupLoginForm.style.display = "none";
  });

  const burgerButton = document.querySelector(".header_burger");
  const mobileMenu = document.querySelector(".mobile_menu");

  burgerButton.addEventListener("click", function() {
      console.log("click");
      mobileMenu.classList.toggle("active");
      if (mobileMenu.classList.contains("active")) {
        mobileMenu.style.display = "block";
        burgerButton.style.transform = "rotate(90deg)";
      } else {
        mobileMenu.style.display = "none";
        burgerButton.style.transform = "rotate(0deg)";
      }
  });

  const newImages = [
    '/images/cookie1.png',
    '/images/cookie2.png',
    '/images/cookie3.png',
  ];

  const cookieImages = document.querySelectorAll('.cookie');
  let currentImageIndex = 1;

  function changeImage() {
    // Изменяем каждое изображение на новое
    cookieImages.forEach((image, index) => {
      image.src = newImages[currentImageIndex];
    });
  
    // Увеличиваем индекс изображения (или сбрасываем, если достигли конца списка)
    currentImageIndex = (currentImageIndex + 1) % newImages.length;
  }

  setInterval(changeImage, 2000);
});
