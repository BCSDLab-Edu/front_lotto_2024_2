import DOM_ELEMENTS from "../const/domMeth.js";
import { totalNum } from "./error.js";

// 로또 번호생성하기
function makeNum() {
  const array = [];
  while (array.length !== 6) {
    const random = parseInt(Math.random() * 45) + 1;
    if (!array.includes(random)) {
      array.push(random);
    }
  }
  return array;
}

let totalArray = [];
console.log(totalArray);
//로또 배열 만들기
export function newLottoNum(numArray) {
  let sortedArray = numArray.sort((a, b) => a - b);
  totalArray.push(sortedArray); // 총 산 로또
  return sortedArray.join(", ");
}

//로또 만들기 (html)
export function makeLotto(num) {
  for (let i = 0; i < num; i++) {
    const box = document.createElement("div");
    const img = document.createElement("img");
    const numbers = document.createElement("div");
    img.src = "/front_lotto/lottoJs/img/lotto.jpg";
    img.className = "lotto__section--ticket-img";
    box.appendChild(img);
    numbers.innerText = newLottoNum(makeNum());
    box.className = "lotto__section--ticket-box-item";
    box.appendChild(numbers);
    DOM_ELEMENTS.lottoBox.appendChild(box);
  }
}

//1.일단 당첨 배열 주기 에러처리에 사용
//추가로 혹시 몰라서 +로 묵시적 변환 사용
export function winLottoNum() {
  const win = [...DOM_ELEMENTS.winNum].map((num) => {
    return +num.value;
  });
  const bonusNum = +DOM_ELEMENTS.bonusNum.value;
  win.push(bonusNum);
  console.log(win);
  return win;
}

// 2. 당첨 비교 및 점수 올리는 배열
export function isWinner() {
  const winner = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  totalArray.forEach((numArray) => {
    let count = 0;
    [...DOM_ELEMENTS.winNum].forEach((winNumber) => {
      if (numArray.includes(+winNumber.value)) {
        count++;
      }
    });
    if (count == 3) {
      winner[5] += 1;
    } else if (count == 4) {
      winner[4] += 1;
    } else if (count == 5 && !numArray.includes(+DOM_ELEMENTS.bonusNum.value)) {
      winner[3] += 1;
    } else if (count == 5 && numArray.includes(+DOM_ELEMENTS.bonusNum.value)) {
      winner[2] += 1;
    } else if (count == 6) {
      winner[1] += 1;
    }
  });

  console.log(winner);

  return winner;
}

//3. 당첨 갯수
export function NumberOfWins(winner) {
  [...DOM_ELEMENTS.tableNum].forEach((num, index) => {
    num.innerText = `${winner[5 - index]}개`;
  });
}

//4 수익률 계산
export function returnMon(winnerObj) {
  let totalprice =
    5000 * winnerObj[5] +
    50000 * winnerObj[4] +
    1500000 * winnerObj[3] +
    30000000 * winnerObj[2] +
    2000000000 * winnerObj[1];

  DOM_ELEMENTS.totalPercent.innerText = `당신의 총 수익률은 ${
    ((totalprice - +totalNum * 1000) / (+totalNum * 1000)) * 100
  }%입니다.`;
}
// 당첨 + 보너스 번호 합쳐서 배얄로 넘기기

// 이 함수 어떻게 나눌껀지
//1.일단 당첨 배열 주기 에러처리에 사용

// 3. 총 수익 계산
//4. 당첨 갯수
//5. 수익률 계산
