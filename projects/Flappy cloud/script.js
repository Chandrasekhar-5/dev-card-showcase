const game = document.querySelector(".game");
const bird = document.getElementById("bird");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");

let birdTop = 200;
let gravity = 2;
let jump = -30;
let gameOver = false;
let score = 0;

document.addEventListener("keydown", e => {
  if (e.code === "Space") fly();
});

game.addEventListener("click", fly);

function fly() {
  if (gameOver) return;
  birdTop += jump;
  bird.style.top = birdTop + "px";
  message.style.display = "none";
}

/* Gravity */
setInterval(() => {
  if (gameOver) return;
  birdTop += gravity;
  bird.style.top = birdTop + "px";

  if (birdTop <= 0 || birdTop >= 490) endGame();
}, 20);

/* Create Pipes */
function createPipe() {
  if (gameOver) return;

  const gap = 140;
  const pipeTopHeight = Math.floor(Math.random() * 200) + 50;

  const topPipe = document.createElement("div");
  const bottomPipe = document.createElement("div");

  topPipe.classList.add("pipe", "top");
  bottomPipe.classList.add("pipe", "bottom");

  topPipe.style.height = pipeTopHeight + "px";
  bottomPipe.style.height = 520 - pipeTopHeight - gap + "px";

  topPipe.style.left = "360px";
  bottomPipe.style.left = "360px";

  game.appendChild(topPipe);
  game.appendChild(bottomPipe);

  let pipeX = 360;

  const movePipe = setInterval(() => {
    if (gameOver) {
      clearInterval(movePipe);
      return;
    }

    pipeX -= 2;
    topPipe.style.left = pipeX + "px";
    bottomPipe.style.left = pipeX + "px";

    // Score
    if (pipeX === 70) {
      score++;
      scoreEl.textContent = score;
    }

    // Collision
    if (
      pipeX < 110 && pipeX > 30 &&
      (birdTop < pipeTopHeight || birdTop > pipeTopHeight + gap)
    ) {
      endGame();
    }

    // Remove pipes
    if (pipeX < -60) {
      topPipe.remove();
      bottomPipe.remove();
      clearInterval(movePipe);
    }
  }, 20);
}

function endGame() {
  gameOver = true;
  message.innerHTML = "💀 Game Over<br>Refresh to Restart";
  message.style.display = "block";
}

/* Pipe Interval */
setInterval(createPipe, 2000);
