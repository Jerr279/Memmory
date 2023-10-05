const cards = document.querySelectorAll(".memory-card");
const scoreDisplay = document.getElementById("score");
const resetButton = document.getElementById("reset-button");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score += 1; 
    scoreDisplay.textContent = score;

    if (score === cards.length / 2) {
        winGame();
    }

    resetBoard();
}

function winGame() {
    alert(`Congratulations! je hebt gewonnen met een score: ${score} !`);
    location.reload();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  cards.forEach((card) => {
    card.classList.remove("flipped");
    card.addEventListener("click", flipCard);
  });

  score = 0;
  scoreDisplay.textContent = score;

  shuffleCards();
}

function shuffleCards() {
  cards.forEach((card) => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));
resetButton.addEventListener("click", resetGame);

shuffleCards();
