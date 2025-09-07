const game = document.getElementById("game");
const dino = document.getElementById("dino");

// Стрибок динозавра
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    setTimeout(() => {
      dino.classList.remove("jump");
    }, 500);
  }
}

// Генерація кактусів
function createCactus() {
  const cactus = document.createElement("div");
  cactus.classList.add("cactus");
  cactus.style.left = "600px";
  game.appendChild(cactus);

  let moveInterval = setInterval(() => {
    let cactusLeft = parseInt(cactus.style.left);
    cactus.style.left = (cactusLeft - 5) + "px";

    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

    // Перевірка зіткнення
    if (cactusLeft < 90 && cactusLeft > 50 && dinoBottom < 40) {
      alert("Гру завершено!");
      clearInterval(moveInterval);
      location.reload();
    }

    // Видалення кактуса після виходу за межі
    if (cactusLeft < -20) {
      clearInterval(moveInterval);
      cactus.remove();
    }
  }, 20);
}º

// Частота появи кактусів
function spawnCactusRandomly() {
  let randomTime = Math.floor(Math.random() * 2000) + 1000; // від 1 до 3 секунд
  setTimeout(() => {
    createCactus();
    spawnCactusRandomly(); // рекурсивно викликаємо знову
  }, randomTime);
}

spawnCactusRandomly();