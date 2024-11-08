const DOM_ELEMENTS = {
  $inputButton: document.querySelector(".lotto__section--buy-box-button"),
  $input: document.querySelector(".lotto__section--buy-box-input"),
  lottoBox: document.querySelector(".lotto__section--ticket-box-lottobox"),
  buyNum: document.querySelector(".lotto__section--ticket-box-text"),
  $modal: document.querySelector(".modal"),
  $lotto__sectionButton: document.querySelector(".lotto__section--button"),
  $modal__pageExit: document.querySelector(".modal__page--exit"),
  $modal__pageRetry: document.querySelector(".modal__page--retry"),
  winNum: document.querySelectorAll(".lotto__section--number-box-win-items-input"),
  bonusNum: document.querySelector(".lotto__section--number-box-bonus-input"),
  tableNum: document.querySelectorAll("tr td:last-Child"),
  totalPercent: document.querySelector(".modal__page--total"),
};

export default DOM_ELEMENTS;
