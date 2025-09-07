const game = document.getElementById("game");
const dino = document.getElementById("dino");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let gameStarted = false;
let score = 0;
let scoreInterval;

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && gameStarted) {
    jump();
  }
});

startBtn.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    score = 0;
    scoreDisplay.textContent = "Час: 0 сек";
    startBtn.style.display = "none";
    spawnCactusRandomly();
    startScoreCounter();
  }
});

function startScoreCounter() {
  scoreInterval = setInterval(() => {
    score++;
    scoreDisplay.textContent = `Час: ${score} сек`;
  }, 1000);
}

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    setTimeout(() => {
      dino.classList.remove("jump");
    }, 500);
  }
}

function createCactus() {
  const cactus = document.createElement("div");
  cactus.classList.add("cactus");
  cactus.style.left = "600px";
  game.appendChild(cactus);

  let moveInterval = setInterval(() => {
    let cactusLeft = parseInt(cactus.style.left);
    cactus.style.left = (cactusLeft - 5) + "px";

    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

    if (cactusLeft < 90 && cactusLeft > 50 && dinoBottom < 40) {
      alert(`Гру завершено! Ваш час: ${score} сек`);
      clearInterval(moveInterval);
      clearInterval(scoreInterval);
      location.reload();
    }

    if (cactusLeft < -20) {
      clearInterval(moveInterval);
      cactus.remove();
    }
  }, 20);
}

function spawnCactusRandomly() {
  if (!gameStarted) return;
  let randomTime = Math.floor(Math.random() * 2000) + 1000;
  setTimeout(() => {
    createCactus();
    spawnCactusRandomly();
  }, randomTime);
}