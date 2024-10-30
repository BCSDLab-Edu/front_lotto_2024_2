const open_popup = document.getElementById('checkResult');
const popup = document.getElementById('floating-content');
const background = document.getElementById('popup-background');
const close_popup = document.getElementById('close-floating-content');
const buy_lottery = document.getElementById('buy-button');
const money_amount = document.getElementById('money-amount');
const restart = document.getElementById('restart');
const lotteryTable = document.getElementById("lottery-table");
const amountContext = document.getElementById('amount-context');  // 총 ~ 개
const lotteryInputs = document.getElementById('lottery_inputs');
const lotteryNumber = document.getElementById('lottery-number');

async function getLottoNumber(){
    const firstLottoDate = new Date('2002-12-07');
    const today = new Date();

    const diffDays = Math.floor((today - firstLottoDate) / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);

    let lottoRound = diffWeeks + 1;

    const lastSaturday = new Date(today);
    lastSaturday.setDate(today.getDate() - (today.getDay() + 1) % 7);

    if (today > lastSaturday) lottoRound += 1;

    let site = "https://cors-anywhere.herokuapp.com/https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=" + (lottoRound-1);

    console.log(lastSaturday);
    try {
        const res = await fetch(site);

        const text = await res.text();
        const data = JSON.parse(text);


        if (data['returnValue'] === "success") {
            let numberList = [];
            for (let i = 1; i <= 6; i++){
                numberList.push(data[`drwtNo${i}`]);
            }
            numberList.push(data['bnusNo']);
            return numberList;
        } else {
            throw new Error("API 요청에 실패했습니다.");
        }
    } catch (error) {
        console.error('로또 번호를 가져오는 중 오류 발생:', error);
        return false;
    }
}

// 구매 개수 구현
buy_lottery.addEventListener('click', () => {
    let lottery_amount = Math.floor(money_amount.value / 1000);  // 구매 갯수

    if (lottery_amount > 15) lottery_amount = 15;  // 최대 갯수 제한

    lotteryTable.innerHTML = '';  // table 초기화

    if (lottery_amount > 6){  // 구매한 로또의 개수에 따라서 main-contents 창이 길어짐
        const mainContents = document.getElementById('main-contents');

        lotteryTable.style.height = `${lottery_amount * 40}px`;
        mainContents.style.height = `${451 + lottery_amount * 40}px`;
    }


    function addLotteryList(){  // 로또 랜덤 생성 함수
        const li = document.createElement("li");
        li.className = "container";

        const span = document.createElement("span");
        span.textContent = "🎟️";

        const p = document.createElement("p");
        let lotteryList = [];

        for (let i = 1; i <= 6; i++){
            lotteryList.push(Math.floor(Math.random() * 45) + 1);
        }

        p.textContent = lotteryList.join(", ");

        li.appendChild(span);
        li.appendChild(p);
        lotteryTable.appendChild(li);
    }

    for (let i = 0; i < lottery_amount; i++){
        addLotteryList();
    }
    if (lottery_amount == 0) {
        amountContext.innerHTML = `<p>아무것도 구매하지 않으셨습니다.</p>`;
    } else {
        amountContext.innerHTML = `<p>총 ${lottery_amount}개를 구매하였습니다.</p>`;
    }
});

// 팝업 열기
open_popup.addEventListener('click', async () => {
    popup.style.display = 'flex';
    background.style.display = 'flex';

    let numberList = [];
    lotteryInputs.querySelectorAll('#lottery_inputs input').forEach(input => {
        numberList.push(input.value.trim());
    });

    let bonus_number = document.getElementById('bonus_target').querySelector('#bonus_target input').value.trim(); // 보너스 번호

    if (isExist()) {
        numberList.sort((a, b) => a - b);
        lotteryNumber.innerHTML = `${numberList.join(', ')} + ${bonus_number}`;
        lotteryNumber.style.fontSize = '16px';
    } else {
        const lottery = await getLottoNumber();

        if (lottery) {
            let bonusNumberNow = lottery.pop();
            lottery.sort((a, b) => a - b);
            lotteryNumber.innerHTML = `${lottery.join(', ')} + ${bonusNumberNow}`;
            lotteryNumber.style.fontSize = '16px';
        } else {
            lotteryNumber.innerHTML = '로또 번호를 가져오는 데 실패했습니다.';
        }
    }
});

background.addEventListener('click', closePopup);
close_popup.addEventListener('click', closePopup);
restart.addEventListener('click', () => {  // 다시 시작
    closePopup();
    lotteryTable.innerHTML = '';
    amountContext.innerHTML = `<p>금액을 입력해주세요.</p>`;
});

// 팝업 닫기
function closePopup() {
    popup.style.display = 'none';
    background.style.display = 'none';
}

function isExist(){
    lotteryInputs.querySelectorAll('#lottery_inputs input').forEach(input => {
        if (input.value === "") {
            return false;
        }
    })
    if (document.getElementById('bonus_target').querySelector('#bonus_target input').value === ""){
        return false;
    }
    return true;
}