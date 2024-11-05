import {getNumbers} from "./getNumbers.js";

const lotteryInputs = document.getElementById('lottery_inputs');
const lotteryNumber = document.getElementById('lottery-number');

export function addNumbers() {
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
        alert("모든 입력 칸에 1~45의 정수가 입력되지 않았습니다.");
        return false;
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
        } else if (input.value > 45 || input.value < 1) {
            return false;
        } else if (Number.isInteger(input.value)) {
            return false;
        }
    });
    return document.getElementById('bonus_target').querySelector('#bonus_target input').value !== "";
}