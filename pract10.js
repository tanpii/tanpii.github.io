//функция-конструктор 
function Accumulator(startingValue) {
  this.value = startingValue; 
  this.read = function() {
    value = prompt("Введите значение, которое нужно добавить в корзину: ");
    if (value !== null && value.trim() !== "" && !isNaN(value)) {
      this.value += parseInt(value);
    }
  };
}

var cart = document.getElementById("cart");
var addtocart = document.getElementById("addtocart");
var accumulator;
var isFirstClick = true;
addtocart.addEventListener("click", function() {
  if (isFirstClick) {
    var value = prompt("Введите начальное значение: ");
    if (value !== null && value.trim() !== "" && !isNaN(value)) {
        accumulator = new Accumulator(parseInt(value));
        cart.textContent = accumulator.value;
        isFirstClick = false;
    }
  }
  else {
    accumulator.read();
    cart.textContent = accumulator.value;
  }
});

// КАПЧА 
// функция для проверки на пустой ввод
function isEmpty(obj) {
  for (let key in obj) {
      if (obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// функция для генерации случайного числа
function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

// функция для генерации капчи со случайными буквами
function generateCaptchaText() {
  let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let captcha = '';
  for (i = 0; i < 5; i++) {
      let letterIndex = Math.floor(Math.random() * letters.length);
      captcha += letters.charAt(letterIndex);
  }
  return captcha;
}

// функция для генерации капчи с математической задачей
function generateMathCaptcha() {
  const num1 = getRandomNumber();
  const num2 = getRandomNumber();
  const captcha = num1 + "+" + num2;
  return {
      captcha: captcha,
      answer: (num1 + num2)
  };
}

// обработчик клика на кнопку
document.getElementById('submitBtn').addEventListener('click', function () {
  let captchaText = generateCaptchaText();
  let userInput = prompt("Пройдите капчу: " + captchaText);
  // проверяем на пустой ввод
  if (isEmpty(userInput)) {
    alert('Вы должны ввести ответ.');
    return;
  }

  if (userInput === captchaText) {
    console.log("hello")
    alert('Капча введена правильно! Вы допускаетесь до страницы :)');
    window.location.href = "index.html";
  }
  else {
      let mathCaptcha = generateMathCaptcha();
      userInput = prompt("Попробуем еще раз. Решите пример: " + mathCaptcha.captcha);
      if (parseInt(userInput ) === mathCaptcha.answer) {
          alert('Правильно! Вы допускаетесь до страницы :)');
          window.location.href = "index.html";
      }
      else {
          alert('Ошибка!');
      }
  }
});

//СОКРАЩЕНИЕ СТРОКИ

var textCard = document.querySelectorAll(".card");

function truncate(str, maxlength) {
  if (str.length > maxlength) {
      return str.slice(0, maxlength - 1) + "…";
  } else {
      return str;
  }
}

textCard.forEach(function(card) {
  var textElement = card.querySelector(".info");
  var originalText = textElement.textContent;
  var viewText = truncate(originalText, 20);
  textElement.textContent = viewText;
  card.addEventListener("mouseenter", function(event) {
    viewText = truncate(originalText, originalText.length);
    textElement.textContent = viewText;
  });
  card.addEventListener("mouseleave", function(event) {
    viewText = truncate(originalText, 20);
    textElement.textContent = viewText;
  });
});