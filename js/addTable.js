import {Lotto} from "./index.js";

const lotteryTable = document.getElementById("lottery-table");
const mainContents = document.getElementById('main-contents');
const amountContext = document.getElementById('amount-context');

export function addTable() {
    if (!Number.isInteger(Lotto.buy_amount)){
        alert("1000원 단위로 입력하셔야 합니다.");
        const moneyAmount = document.getElementById('money-amount');
        moneyAmount.value = "";
        return;
    }

    lotteryTable.innerHTML = '';

    if (Lotto.buy_amount > 7){
        lotteryTable.style.height = `${Lotto.buy_amount * 40}px`;
        mainContents.style.height = `${451 + Lotto.buy_amount * 40}px`;
    }
    
    function addLotteryList(){  // 로또 랜덤 생성 함수
        const li = document.createElement("li");
        li.className = "container";

        const span = document.createElement("span");
        span.textContent = "🎟️";

        const p = document.createElement("p");
        const lotteryList = [];

        const overlapList = new Set();

        for (let i = 1; i <= Lotto.length; i++){
            let num = Math.floor(Math.random() * 45) + 1;
            if (overlapList.has(num)) {
                i--;
            } else {
                lotteryList.push(num);
                overlapList.add(num);
            }
        }

        p.textContent = lotteryList.join(", ");

        li.appendChild(span);
        li.appendChild(p);
        lotteryTable.appendChild(li);
    }

    for (let i = 0; i < Lotto.buy_amount; i++){
        addLotteryList();
    }
    if (Lotto.buy_amount === 0) {
        amountContext.innerHTML = `<p>아무것도 구매하지 않으셨습니다.</p>`;
    } else {
        amountContext.innerHTML = `<p>총 ${Lotto.buy_amount}개를 구매하였습니다.</p>`;
    }
}
