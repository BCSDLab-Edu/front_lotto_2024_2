// 금액 입력 > 구입 버튼 누름 > 금액을 1000으로 나눈다
// if 나머지 == 0, randoms의 요소 추가 : 6개 숫자 랜덤 생성 반복
//                                      > 세로로 길면 스크롤 생성 ㄱㄱ
// else, alert 생성, input 초기화
const priceEl = document.querySelector("input[name=price]");
const submit1El = document.querySelector("#submit1");
const randomsParaEl = document.querySelector("#randoms p");
let totalNumRandoms = 0;

submit1El.addEventListener("click", () => {

    const valPrice = parseInt(priceEl.value); // 값을 가져와서
    if (valPrice % 1000 === 0) { // 검사한다
        let numRandoms = valPrice / 1000;
        totalNumRandoms += numRandoms;
        const randomsEl = document.querySelector("#randoms");
        
        for (let i = 0; i < numRandoms; i++) {
            let str = "🎟️ ";
            for (let j = 0; j < 6; j++) {
                if(j != 0) str += ", ";
                str += String(Math.floor(Math.random() * 45) + 1);
            }
            const newEl = document.createElement("p");
            newEl.textContent = str;
            randomsEl.appendChild(newEl);
        }
        randomsParaEl.textContent = `총 ${totalNumRandoms}개를 구매하셨습니다.`;
    } 
    else {
        alert(`1000원 단위로 입력해주세요.`);
            priceEl.value = "";
    }
});


// 당첨번호, 보너스 번호를 입력 > 결과 확인버튼 누름
// if 빈칸 존재, alert 띄움
// else if 1~45 밖의 값, alert 띄움

// overlay의 hidden을 false로 변경

// randoms의 각 요소들과, 입력한 당첨번호/보너스 번호를 비교
// 5가지 케이스를 확인, 카운트 증가
// 수익률 계산

// 다시 시작하기 누르면
// overlay의 hidden을 true로 변경
// input 초기화

