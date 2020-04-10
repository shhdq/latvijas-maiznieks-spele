const sendBtn = document.getElementById("btn-send");
const registration = document.getElementById("reg-popup");

sendBtn.addEventListener("click", () => {
  registration.style.display = "none";
  console.log("Works");
});
