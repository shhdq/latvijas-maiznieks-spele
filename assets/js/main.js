const cards = document.querySelectorAll(".card");
const body = document.getElementById("body");

let counter = document.getElementById("counter");
let counterNumber = 1;

const maxCounter = 4;

let gameTime = document.getElementById("game-time");
let lockDeck = false;
let hasFlippedCard = false;
let firstCard, secondCard;

window.onload = () => {
  let hour = 0;
  let minute = 0;
  let seconds = 0;
  let totalSeconds = 0;

  let intervalId = null;

  intervalId = setInterval(startTimer, 1000);

  function startTimer() {
    ++totalSeconds;
    hour = Math.floor(totalSeconds / 3600);
    minute = Math.floor((totalSeconds - hour * 3600) / 60);
    seconds = totalSeconds - (hour * 3600 + minute * 60);

    document.getElementById("hour").innerHTML = hour;
    document.getElementById("minute").innerHTML = minute;
    document.getElementById("seconds").innerHTML = seconds;
  }
};
function stopTimer() {
  totalSeconds.stop();
}
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

  isMatch ? (counter.innerHTML = counterNumber++) : counterNumber;

  if (counterNumber === 5) {
    setTimeout(() => {
      alert("sdfsd");
      stopTimer();
    }, 1000);
  }

  // if (isMatch) {
  //   counter.innerHTML = counterNumber++ : counterNumber;
  // }
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
