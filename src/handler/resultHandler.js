import { isValidRange, listNumbersInRanges, isNaturalNumber} from '../util.js';
import { updateWinningTable, updateProfit } from '../views/view.js';

function getWinningNumbers() {
    const numberInputs = document.querySelectorAll(".number-section input");
    const bonusInput = document.querySelector(".bonus-number input");

    let winningNumbers = [];
    let isValid = true;

    numberInputs.forEach(input => {
        const number = parseInt(input.value, 10);

        if (isNaN(number)) {
            isValid = false;
        }

        else if (isValidRange(number, 1, 45) && isNaturalNumber(number)) {
            winningNumbers.push(number);
        }
    });

    const bonusNumber = parseInt(bonusInput.value, 10);

    if (!isValid || isNaN(bonusNumber)) {
        alert("모든 번호 입력 칸에 번호를 입력해주세요.");
        return;
    }

    if (!listNumbersInRanges(winningNumbers, 1, 45) || !isNaturalNumber(bonusNumber) || !isValidRange(bonusNumber, 1, 45)) {
        alert("당첨 번호와 보너스 번호는 1부터 45 사이의 자연수여야 합니다.");
        return;
    }

    return { winningNumbers, bonusNumber };
}

function matchNumbers(lottoNumbers, winningNumbers) {
    let matchCount = 0;

    lottoNumbers.forEach(number => {
        if (winningNumbers.includes(number)) {
            matchCount++;
        }
    });

    return matchCount;
}

export function calculateResult() {
    const { winningNumbers, bonusNumber } = getWinningNumbers();

    if (!winningNumbers || !bonusNumber) {
        return;
    }

    const lottoListContainer = document.querySelectorAll(".lotto-list .number");
    const result = { 3: 0, 4: 0, 5: 0, '5+bonus': 0, 6: 0 };
    let totalProfit = 0;

    lottoListContainer.forEach(lottoItem => {
        const lottoNumbers = lottoItem.textContent.split(', ').map(num => parseInt(num, 10));
        const matchCount = matchNumbers(lottoNumbers, winningNumbers);

        if (matchCount === 6) {
            result[6]++;
            totalProfit += 2000000000;
        }

        else if (matchCount === 5 && lottoNumbers.includes(bonusNumber)) {
            result['5+bonus']++;
            totalProfit += 30000000;
        }

        else if (matchCount === 5) {
            result[5]++;
            totalProfit += 1500000;
        } 

        else if (matchCount === 4) {
            result[4]++;
            totalProfit += 50000;
        } 

        else if (matchCount === 3) {
            result[3]++;
            totalProfit += 5000;
        }
    });

    const purchaseAmount = lottoListContainer.length * 1000;
    const profitRate = ((totalProfit - purchaseAmount) / purchaseAmount) * 100;

    updateWinningTable(result);
    updateProfit(profitRate);
}
