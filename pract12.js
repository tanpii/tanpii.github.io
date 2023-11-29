let notificationCounter = 0;
let notificationInterval;
let notificationTimeout;
let notifications = ["🍪 Новое печенье OREO BOOM уже в продаже", "🧸 Промокод на покупку CRUNCH10 для вас", "💝 Подарок PINK BANG для вас", "🧸 Бесплатная доставка для первого заказа", 
"📦 Доставка бесплатная 27 ноября", "💗 MONSTER CRUNCH любит вас всем сердцем", "☕️ Пейте чай с нашими печеньками!", "🍰 Торт или печенье, что лучше?", "🕶️ Оставляй отзывы на MONSTER CRUNCH"]

function startNotifications() {
  notificationInterval = setInterval(addNotification, 1000);
}

function pauseNotifications() {
  console.log("hey");
  clearInterval(notificationInterval);

  // Остановка счетчика на 10 секунд
  clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    startNotifications(); // После 10 секунд возобновляем уведомления
  }, 3000);
}

function stopNotifications() {
  clearInterval(notificationInterval);
}

function addNotification() {
  notificationCounter++;
  const notificationsDiv = document.querySelector('.notifications');
  const notification = document.createElement('div');
  const notificationText = notifications[notificationCounter % 9];
  notification.innerText = `${notificationText}`;
  notificationsDiv.appendChild(notification);
  notification.classList.add('notification');
  // Обновляем счетчик новых уведомлений
  updateNotificationCounter();
}

function updateNotificationCounter() {
  const counterElement = document.querySelector('.notification-counter');
  if (counterElement) {
    counterElement.innerText = `Новых уведомлений: ${notificationCounter}`;
  } else {
    const notificationsContainer = document.querySelector('.notification-container');
    const counter = document.createElement('div');
    counter.classList.add('notification-counter');
    counter.innerText = `Новых уведомлений: ${notificationCounter}`;
    notificationsContainer.append(counter);
  }
}

function createList() {
  const list = document.getElementById('list');
  
  let userInput = prompt('Введите содержимое пункта списка:');
  while (userInput !== null && userInput.trim() !== '') {
    const listItem = document.createElement('li');
    listItem.classList.add('notification');
    listItem.textContent = "🎀" + userInput;

    list.appendChild(listItem);
    
    userInput = prompt('Введите следующее содержимое пункта списка:');
  }
}

function showNotification(options) {
  const notificationDiv = document.createElement('div');
  notificationDiv.textContent = options.content;
  notificationDiv.classList.add('notification');
  const container = document.querySelector('.task-4')

  container.appendChild(notificationDiv);

  setTimeout(() => {
    container.removeChild(notificationDiv);
  }, 1500);
}