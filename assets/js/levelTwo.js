const cards = document.querySelectorAll(".card");
let counter = document.getElementById("counter");
let gameTime = document.getElementById("game-time");
const modal = document.getElementById("modal");
const levelEndTime = document.getElementById("level-end-time");

let gameMinutes = document.getElementById("minutes");
let gameSeconds = document.getElementById("seconds");

let counterNumber = 1;
const maxCounter = 4;

let lockDeck = false;
let hasFlippedCard = false;
let firstCard, secondCard;

let minutes = 0;
let seconds = 0;

// Stopwatch Function
function timer() {
  seconds++;

  document.getElementById("seconds").innerHTML = seconds;
  if (seconds === 60) {
    document.getElementById("minutes").innerHTML = ++minutes;
    seconds = 0;
  }
}

let timeInterval = setInterval(timer, 1000);
// Stop Time
function stopTimer() {
  window.clearInterval(timeInterval);
}

// FlipCard Function
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
  let levelModal = document.getElementById("level-end-modal");

  isMatch ? (counter.innerHTML = counterNumber++) : counterNumber;

  if (counterNumber === 9) {
    setTimeout(() => {
      // Here Also need to Call stop time function
      stopTimer();
      levelModal.style.display = "flex";
      levelEndTime.innerHTML = `${minutes}:${seconds}`;
    }, 1000);
  }

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
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
