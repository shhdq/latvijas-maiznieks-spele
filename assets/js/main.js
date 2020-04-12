const cards = document.querySelectorAll(".card");
const body = document.getElementById("body");

let gameTime = document.getElementById("game-time");
let lockDeck = false;
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockDeck) return;

  if (this === firstCard) return;

  this.classList.add("is-flipped");

  if (!hasFlippedCard) {
    // First Click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // Second Click

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

  resetBoard();
}

// Un Flip Cards
function unFlipCards() {
  lockDeck = true;

  // Not a Match
  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");

    resetBoard();
  }, 1500);
}

// Reset Board
function resetBoard() {
  // ES6
  [hasFlippedCard, lockDeck] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle Deck
(function shuffle() {
  cards.forEach((card) => {
    let randPos = Math.floor(Math.random() * 12);
    card.getElementsByClassName.order = randPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
