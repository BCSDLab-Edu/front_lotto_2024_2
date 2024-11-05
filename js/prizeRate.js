import {addNumbers} from "./addNumbers.js";
import {Lotto} from "./index.js";

export async function prizeRate() {
    const prize = await addNumbers();
    console.log(prize);
    console.log(Lotto.profit_list);
    const floatingContentMainTable = document.querySelector('.floating-content-main-table');
    const lines = floatingContentMainTable.querySelectorAll('.floating-content-main-line');

    lines.forEach((line, index) => {
        if (index !== 0) {  // 첫 번째 라인(index 0)은 건너뜀
            const text3 = line.querySelector('.floating-content-main-text3');
            text3.textContent = prize[index - 1] ? prize[index - 1] + '개' : '0개';
        }
    });

    const floatingContentRate = document.querySelector('.floating-content-rate span');
    let moneyProfit = 0;
    for (let i = 0; i < prize.length; i++) {
        moneyProfit += prize[i] * Lotto.profit_list[i];
    }
    moneyProfit /= Lotto.moneyAmount * 100;
    floatingContentRate.textContent = `당신의 총 수익률은 ${moneyProfit}%입니다.`;
}