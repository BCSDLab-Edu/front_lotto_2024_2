///// 로또 번호 생성//////
let totalArray = [];
function lotto() {
  const array = [];
  while (array.length !== 6) {
    const random = parseInt(Math.random() * 45) + 1;
    if (!array.includes(random)) {
      array.push(random);
    }
  }
  totalArray.push(array); // 총 산 로또
  return array.sort((a, b) => a - b).join(", ");
}
console.log(totalArray);
///inoutValue에 따른 에러처리 밑 갯수 계산///
const $inputButton = document.querySelector(".lotto__section--buy-box-button");
const $input = document.querySelector(".lotto__section--buy-box-input");

///// 숫자가 안들어올 때 처리 ///
$input.addEventListener("input", () => {
  if (isNaN($input.value)) {
    $input.value = $input.value.slice(0, -1);
    alert("[ERROR]숫자를 입력하세요.");
  }
});

///로또 만들어서 넣는 함수  ///
function getlotto(num) {
  const lottoBox = document.querySelector(
    ".lotto__section--ticket-box-lottobox"
  );
  const buyNum = document.querySelector(".lotto__section--ticket-box-text");

  buyNum.innerText = `총 ${num}개를 구매하였습니다.`;

  for (let i = 0; i < num; i++) {
    const box = document.createElement("div");
    const img = document.createElement("img");
    const numbers = document.createElement("div");

    img.src = "img/lotto.jpg";
    img.className = "lotto__section--ticket-img";
    box.appendChild(img);
    numbers.innerText = lotto();
    box.className = "lotto__section--ticket-box-item";
    box.appendChild(numbers);
    lottoBox.appendChild(box);
    console.log(numbers);
  }
}
/// 입력받은 수가 1000원 단위로 안 떨어질 때 /////

$inputButton.addEventListener("click", () => {
  $transMoney = +$input.value / 1000;
  if ($input.value % 1000 != 0) {
    alert("1000원 단위로 입력하세요.");
    $input.value = "";
  } else {
    getlotto($transMoney);
  }
});
/////모달창 동작  //////
const $modal = document.querySelector(".modal");
const $lotto__sectionButton = document.querySelector(".lotto__section--button");
const $modal__pageExit = document.querySelector(".modal__page--exit");
const $modal__pageRetry = document.querySelector(".modal__page--retry");
/// 결과 확인하기 버튼 /// totalArray가 모든 로또
$lotto__sectionButton.addEventListener("click", () => {
  $modal.style.display = "block";

  winLotto();
});

$modal__pageExit.addEventListener("click", () => {
  $modal.style.display = "none";
});
$modal__pageRetry.addEventListener("click", () => {
  location.reload();
});
//// 로또 당첨 계산 함수 ////
//////당첨 번호 + 보너스 번호 받기 ////
function winLotto() {
  const winner = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  const winNum = document.querySelectorAll(
    ".lotto__section--number-box-win-items-input"
  );
  const winCheck = [...winNum]
    .map((num) => {
      return +num.value;
    })
    .sort((a, b) => a - b);
  const bonusNum = document.querySelector(
    ".lotto__section--number-box-bonus-input"
  );
  const $bonusNum = +bonusNum.value;

  totalArray.forEach((num) => {
    let count = 0;
    winCheck.forEach((winNumber) => {
      if (num.includes(winNumber)) {
        count++;
      }
    });
    if (count == 3) {
      winner[5] += 1;
    } else if (count == 4) {
      winner[4] += 1;
    } else if (count == 5 && !num.includes($bonusNum)) {
      winner[3] += 1;
    } else if (count == 5 && num.includes($bonusNum)) {
      winner[2] += 1;
    } else if (count == 6) {
      winner[1] += 1;
    }
  });

  console.log(winner);
  ////// 당첨된 갯수 /////
  const tableNum = document.querySelectorAll("tr td:last-Child");
  [...tableNum].forEach((num, index) => {
    num.innerText = `${winner[5 - index]}개`;
  });
  ////수익률 계산 ////
  const totalPercent = document.querySelector(".modal__page--total");

  let totalprice =
    5000 * winner[5] +
    50000 * winner[4] +
    1500000 * winner[3] +
    30000000 * winner[2] +
    2000000000 * winner[1];

  totalPercent.innerText = `당신의 총 수익률은 ${
    ((totalprice - +$input.value) / +$input.value) * 100
  }%입니다.`;
}
