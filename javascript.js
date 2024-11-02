document.querySelector('.purchase-button').addEventListener('click', () => {
    clickPurchaseButton();
});


document.querySelector('.result-button').addEventListener('click', () => {
    calculateResult();
    openModal();
});

document.querySelector('.close-button').addEventListener('click', () => {
    closeModal();
});

document.querySelector('.restart-button').addEventListener('click', () => {
    closeModal();
});

function openModal() {
    document.getElementById("winning-modal").showModal();
}

function closeModal() {
    document.getElementById("winning-modal").close();
}

function generateLottoNumbers() {
    const numbers = [];

    while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }

    return numbers;
}

function createLottoList(count) {
    const lottoListContainer = document.querySelector(".lotto-list ul");
    lottoListContainer.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const lottoNumbers = generateLottoNumbers();
        const list = document.createElement("li");
        list.innerHTML = `<span class="icon">🎟️</span><span class="number">${lottoNumbers.join(", ")}</span>`;
        lottoListContainer.appendChild(list);
    }

    document.querySelector(".total").textContent = `총 ${count}개를 구매하였습니다.`;
}

function clickPurchaseButton() {
    const moneyInput = document.getElementById("money").value;
    const amount = parseInt(moneyInput, 10);

    if (isNaN(amount) || amount < 1000) {
        alert("금액을 1,000원 이상 입력해주세요.");
        return;
    }

    if (amount % 1000 !== 0) {
        alert("1,000원 단위로 구매 가능합니다.");
        return;
    }

    const count = Math.floor(amount / 1000); 
    createLottoList(count);
}

function getWinningNumbers() {
    const numberInputs = document.querySelectorAll(".number-section input");
    const bonusInput = document.querySelector(".bonus-number input");
    let winningNumbers = [];
    
    numberInputs.forEach(input => {
        const number = parseInt(input.value, 10);
        if (!isNaN(number) && number > 0 && number < 46) {
            winningNumbers.push(number);
        }
    });

    const bonusNumber = parseInt(bonusInput.value, 10);
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

function calculateResult() {
    const { winningNumbers, bonusNumber } = getWinningNumbers();
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

function updateWinningTable(result) {
    const matchTypes = ['3', '4', '5', '5+bonus', '6'];

    matchTypes.forEach((matchType, index) => {
        document.querySelector(`.winning-table tr:nth-child(${index + 2}) td:last-child`).textContent = `${result[matchType]}개`;
    });
}

function updateProfit(profitRate) {
    document.getElementsByClassName("profit")[0].textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
}
