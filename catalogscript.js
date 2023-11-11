document.addEventListener("DOMContentLoaded", function () { 
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', function(event) {
      console.log("click");
      const heart = likeButton.querySelector(".heart");

      if (heart.classList.contains("fa-regular")) {
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
      } else {
        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
      }
    });
  });

  //pract 9 start

  var isDrawing = false;
  const drawingButton = document.getElementById("drawing-button");
  const drawnElements = [];

  drawingButton.addEventListener("click", function () {
    if (!isDrawing) {
      isDrawing = true;
      document.addEventListener("mousemove", drawButtonElement);
    } else {
      isDrawing = false;
      document.removeEventListener("mousemove", drawButtonElement);
      clearDrawnElements();
    }
  });

  function drawButtonElement(event) {
    const iElement = document.createElement("i");
    iElement.className = "heart fa-solid fa-heart";
    iElement.style.color = "#a41e32";
    iElement.style.textShadow = "0 0 2px black";

    iElement.style.position = "absolute";
    iElement.style.left = event.clientX + "px";
    iElement.style.top = event.clientY + "px";

    document.body.appendChild(iElement);

    drawnElements.push(iElement);
  }

  function clearDrawnElements() {
    for (const element of drawnElements) {
      element.classList.add("fade-out");
    }
    setTimeout(function () {
      for (const element of drawnElements) {
        element.remove();
      }
      drawnElements.length = 0;
    }, 1500); // удаляем после анимации
  }
  //pract 9 end

  const buttonWhereToLook = document.getElementById("button-wheretolook");

  buttonWhereToLook.addEventListener('click', function(){
    var item = localStorage.getItem('whereToLook');
    if (!item){
      console.log("hello");
      localStorage.setItem('whereToLook', 1);
    }
    else {
      console.log("bye");
    }
  });

});