// 금액 입력 > 구입 버튼 누름 > 금액을 1000으로 나눈다
// if 나머지 == 0, randoms의 요소 추가 : 6개 숫자 랜덤 생성 반복
//                                      > 세로로 길면 스크롤 생성 ㄱㄱ
// else, alert 생성, input 초기화
const priceEl = document.querySelector("input[name=price]");
const submit1El = document.querySelector("#submit1");
const randomsParaEl = document.querySelector("#randoms p");
let randomsArr = [];

submit1El.addEventListener("click", () => {

    const valPrice = parseInt(priceEl.value); // 값을 가져와서

    if (valPrice % 1000 === 0) { // 검사한다
        const randomsEl = document.querySelector("#randoms > div"); // p 요소를 추가할 부모 요소
        let numRandoms = valPrice / 1000; // 반복할 횟수

        for (let i = 0; i < numRandoms; i++) {
            let nums = randomGenerator(); // 6개의 랜덤 숫자 생성
            randomsArr.push(nums); // 및 보관

            let str = "🎟️ "; // p 요소 콘텐츠 문자열 생성
            for (let j in nums) {
                if(j != 0) str += ", ";
                str += nums[j];
            }
            const newEl = document.createElement("p"); // p 요소 생성
            newEl.textContent = str; // p 요소에 콘텐츠 추가
            randomsEl.appendChild(newEl); // 부모 요소에 추가
        }
        randomsParaEl.textContent = `총 ${randomsArr.length}개를 구매하셨습니다.`; // 갯수 업데이트
    } 
    else {
        alert(`1000원 단위로 입력해주세요.`);
    }
});

function randomGenerator(){
    let ret = [];
    while(ret.length < 6){
        let num = Math.floor(Math.random() * 45) + 1;
        if(ret.includes(num)) continue;
        ret.push(num);
    }
    return ret;
}


// 당첨번호, 보너스 번호를 입력 > 결과 확인버튼 누름
// if 빈칸 존재, alert 띄움
// else if 1~45 밖의 값, alert 띄움
const ans1El = document.querySelector("#answer-numbers div:nth-child(1) input");
const ans2El = document.querySelector("#answer-numbers div:nth-child(2) input");
const ans3El = document.querySelector("#answer-numbers div:nth-child(3) input");
const ans4El = document.querySelector("#answer-numbers div:nth-child(4) input");
const ans5El = document.querySelector("#answer-numbers div:nth-child(5) input");
const ans6El = document.querySelector("#answer-numbers div:nth-child(6) input");
const bnsEl = document.querySelector("#answer-numbers input");
const submit2El = document.querySelector("#submit2");

let result = { 1:0, 2:0, 3:0, 4:0, 5:0 };
let score = { 1:2000000000, 2:30000000, 3:1500000, 4:50000, 5:5000 };

submit2El.addEventListener("click", () => {
    let val1 = parseInt(ans1El.value);
    let val2 = parseInt(ans2El.value);
    let val3 = parseInt(ans3El.value);
    let val4 = parseInt(ans4El.value);
    let val5 = parseInt(ans5El.value);
    let val6 = parseInt(ans6El.value);
    let val7 = parseInt(bnsEl.value);
    let answerArr = [val1, val2, val3, val4, val5, val6];
    answerArr.sort((a, b) => a - b);

    if( isNaN(val1) || isNaN(val2) || isNaN(val3) || isNaN(val4) || isNaN(val5) || isNaN(val6) || isNaN(val7)){
        alert("빈칸을 채워주세요.");
        return;
    }
    else if(answerArr[0]==answerArr[1] || answerArr[1]==answerArr[2] || answerArr[2]==answerArr[3] || answerArr[3]==answerArr[4] || answerArr[4]==answerArr[5]){
        alert("중복된 숫자가 있습니다.");
        return;
    }
    else if(answerArr.includes(val7)){
        alert("보너스 번호와 중복된 숫자가 있습니다.");
        return;
    }

    let profit = caculateProfit(randomsArr, answerArr, val7);
    setPopup(profit);
});

function caculateProfit(randomsArr, answerArr, bonus){
    for(let arr in randomsArr){
        let count = 0;
        for(let num in arr){
            if(answerArr.includes(num)) count++; // 당첨번호 카운트
        }
        if(count == 6 && arr.includes(bonus)){ // 2등 확인
            count++;
        }
        
        result[count]++;
    }

    let profit = 0;
    for(let i in result){
        profit += result[i] * score[i];
    }
    profit = profit * 100 / randomsArr.length*1000;

    return profit;
}

function setPopup(profit){
    const El_5th = document.querySelector("#popup table tbody tr:nth-child(1) th:last-child");
    const El_4th = document.querySelector("#popup table tbody tr:nth-child(2) th:last-child");
    const El_3rd = document.querySelector("#popup table tbody tr:nth-child(3) th:last-child");
    const El_2nd = document.querySelector("#popup table tbody tr:nth-child(4) th:last-child");
    const El_1st = document.querySelector("#popup table tbody tr:nth-child(5) th:last-child");
    const El_profit = document.querySelector("#popup p");

    El_5th.textContent = result[5] + "개";
    El_4th.textContent = result[4] + "개";
    El_3rd.textContent = result[3] + "개";
    El_2nd.textContent = result[2] + "개";
    El_1st.textContent = result[1] + "개";
    El_profit.textContent = "당신의 총 수익률은 " + profit + "%입니다.";
    

    const overlayEl = document.querySelector("#overlay");
    overlayEl.hidden = false;

}

// overlay의 hidden을 false로 변경

// randoms의 각 요소들과, 입력한 당첨번호/보너스 번호를 비교
// 5가지 케이스를 확인, 카운트 증가
// 수익률 계산

// 다시 시작하기 누르면
// overlay의 hidden을 true로 변경
// input 초기화

