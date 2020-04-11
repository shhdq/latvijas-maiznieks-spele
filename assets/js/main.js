const cards = document.querySelectorAll(".card");
const red = document.getElementById("red-cover");

red.addEventListener("click", () => {
  alert("Ha ha");
});

function flipCard() {
  this.classList.toggle("is-flipped");
  console.log("test");
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
