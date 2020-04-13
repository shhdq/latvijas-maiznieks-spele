const cards = document.querySelectorAll(".card");
const body = document.getElementById("body");

let counter = document.getElementById("counter");
let counterNumber = 1;

const maxCounter = 4;

let gameTime = document.getElementById("game-time");
let lockDeck = false;
let hasFlippedCard = false;
let firstCard, secondCard;

let endTime = document.getElementById("level-end-time");

const modal = document.getElementById("modal");
const test = document.getElementById("test");

const startTime = 0;
let time = startTime * 60;

function updateTime() {
  setInterval(updateTime, 1000);
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  gameTime.innerHTML = `${minutes}:${seconds}`;

  time++;
}

// Stop Time
function stopTimer() {
  window.clearInterval(intervalId);
}

// Flip Card
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

  if (counterNumber === 5) {
    setTimeout(() => {
      // Here Also need to Call stop time function
      levelModal.style.display = "flex";
      endTime.innerHTML = totalSeconds;
      console.log("asdasjd");
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
