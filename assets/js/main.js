const cards = document.querySelectorAll(".card");
const red = document.getElementById("red-cover");

red.addEventListener("click", () => {
  alert("Spēle beigusies!");
});

function flipCard() {
  this.classList.toggle("is-flipped");
  console.log("test");
}
cards.forEach((card) => card.addEventListener("click", flipCard));

cards.forEach((card) => {
  let randomPos = Math.floor(Math.random() * 12);
  card.style.order = randomPos;
});
