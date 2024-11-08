import DOM_ELEMENTS from "../const/domMeth.js";

DOM_ELEMENTS.$modal__pageExit.addEventListener("click", () => {
  DOM_ELEMENTS.$modal.style.display = "none";
});
//모달창 닫는 버튼
DOM_ELEMENTS.$modal__pageRetry.addEventListener("click", () => {
  location.reload();
});
//모달창 다시 시작 버튼
