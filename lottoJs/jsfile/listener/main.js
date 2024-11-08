import { correctNum, enterSumbit, lottoNum, prevSpaceBar } from "../func/error.js";
import DOM_ELEMENTS from "../const/domMeth.js";
import { winLottoNum } from "../func/newlotto.js";

DOM_ELEMENTS.$inputButton.addEventListener("click", () => {
  correctNum();
});
DOM_ELEMENTS.$input.addEventListener("keydown", () => {
  prevSpaceBar(event);
  enterSumbit(event);
});
//구입 버튼에 관한 과정

DOM_ELEMENTS.$lotto__sectionButton.addEventListener("click", () => {
  lottoNum(winLottoNum());
});
//결과 확인 버튼에 관한 과정
