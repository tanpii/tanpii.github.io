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

  document.getElementById('login-button').addEventListener('click', function() {
      console.log('click');
      window.location.href = 'catalog.html';
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
})