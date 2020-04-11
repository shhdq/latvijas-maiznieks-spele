const cards = document.querySelectorAll(".card");

function flipCard() {
  this.classList.toggle("is-flipped");
  console.log("test");
}

cards.forEach((card) => card.addEventListener("click", flipCard));
