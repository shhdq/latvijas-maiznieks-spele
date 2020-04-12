const cards = document.querySelectorAll(".card");
const body = document.getElementById("body");

let gameTime = document.getElementById("game-time");

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  this.classList.add("is-flipped");

  if (!hasFlippedCard) {
    // First Click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // Second Click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

// Check For Match Function
function checkForMatch() {
  // Check Match
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  // Shorter if else
  isMatch ? disableCards() : unFlipCards();
}

// Disable Cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

// Un Flip Cards
function unFlipCards() {
  // Not a Match
  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
  }, 1500);
}

cards.forEach((card) => card.addEventListener("click", flipCard));

cards.forEach((card) => {
  let randomPos = Math.floor(Math.random() * 12);
  card.style.order = randomPos;
});
