import {getLottoNumbers} from "./getAPI.js";
import {getNumbers} from "./getNumbers.js";

const lotteryInputs = document.getElementById('lottery_inputs');
const lotteryNumber = document.getElementById('lottery-number');

export async function addNumbers() {
    let numberList = [];
    lotteryInputs.querySelectorAll('#lottery_inputs input').forEach(input => {
        numberList.push(input.value.trim());
    });

    let bonus_number = document.getElementById('bonus_target').querySelector('#bonus_target input').value.trim();

    if (isExist()) {
        numberList.sort((a, b) => a - b);
        lotteryNumber.innerHTML = `${numberList.join(', ')} + ${bonus_number}`;
        lotteryNumber.style.fontSize = '16px';
    } else {
        const lottery = await getLottoNumbers();

        const bonusNumberNow = lottery.pop();
        lottery.sort((a, b) => a - b);
        numberList = [...lottery];
        bonus_number = bonusNumberNow;
        lotteryNumber.innerHTML = `${lottery.join(', ')} + ${bonusNumberNow}`;
        lotteryNumber.style.fontSize = '16px';
    }

    const countPrize = [0,0,0,0,0];
    const countAccordNumber = getNumbers();

    for (let i = 1; i <= countAccordNumber.size; i++) {
        const list = countAccordNumber.get(i);
        let cnt = 0;
        let isBonus = false;
        for (let j of list) {
            if (numberList.includes(j)) {
                cnt++;
            }
            if (j === bonus_number) {
                isBonus = true;
            }
        }
        if (cnt === 3) {
            countPrize[0]++;
        } else if (cnt === 4) {
            countPrize[1]++;
        } else if (cnt === 5 && isBonus) {
            countPrize[3]++;
        } else if (cnt === 5) {
            countPrize[2]++;
        } else if (cnt === 6) {
            countPrize[4]++;
        }
    }

    return countPrize;
}


function isExist(){
    lotteryInputs.querySelectorAll('#lottery_inputs input').forEach(input => {
        if (input.value === "") {
            return false;
        }
    });
    return document.getElementById('bonus_target').querySelector('#bonus_target input').value !== "";
}