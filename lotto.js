const resultBtn = document.getElementById("resultButton");
const modal = document.getElementById("resultOutBox");
const exitBtn = document.getElementById("exit");
const retryBtn = document.getElementById("retry");
resultbtn.onclick = function () {
  modal.style.display = "block";
};

exitBtn.onclick = function () {
  modal.style.display = "none";
};

retryBtn.onclick = function(){
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};