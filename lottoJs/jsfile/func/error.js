import DOM_ELEMENTS from "../const/domMeth.js";
import { isWinner, makeLotto, NumberOfWins, returnMon } from "./newlotto.js";

export let totalNum = 0;

export function correctNum() {
  let inputVal = DOM_ELEMENTS.$input.value;
  if (isNaN(inputVal) || inputVal < 0 || inputVal % 1000 != 0) {
    alert("[ERROR]1000원 단위의 정수를 입력해주세요.");
    DOM_ELEMENTS.$input.value = "";
  } else {
    totalNum += inputVal / 1000;
    makeLotto(inputVal / 1000);
    DOM_ELEMENTS.buyNum.innerText = `총 ${totalNum}개를 구매하였습니다.`;
  }
} // 이벤트 리스너 input 버튼 누를 때

export function lottoNum(numArr) {
  // 배열로 넣기 모아서
  let dupl = [...new Set(numArr)];
  let isnan = false;
  numArr.forEach((num) => {
    if (isNaN(num) || num < 0 || 45 < num) {
      isnan = true;
    }
  });

  if (dupl.length !== 7 || isnan) {
    alert("[ERROR]다시 입력해주세요.");
  } else {
    DOM_ELEMENTS.$modal.style.display = "block";
    const winnerResult = isWinner();
    NumberOfWins(winnerResult);
    returnMon(winnerResult);
  }
} // 결과창 이동 리스너 함수

export function prevSpaceBar(event) {
  if (event.code === "Space") {
    // 스페이스바를 체크
    event.preventDefault();
  }
} // input에 스페이스 막기

export function enterSumbit(event) {
  if (event.key === "Enter") {
    correctNum();
  }
}
