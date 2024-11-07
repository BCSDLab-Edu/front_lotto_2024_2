export function createLottoList(count, lottoNumbersList) {
    const lottoListContainer = document.querySelector(".lotto-list ul");
    lottoListContainer.innerHTML = "";

    lottoNumbersList.forEach(lottoNumbers => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span class="icon">🎟️</span><span class="number">${lottoNumbers.join(", ")}</span>`;
        lottoListContainer.appendChild(listItem);
    });

    document.querySelector(".total").textContent = `총 ${count}개를 구매하였습니다.`;
}

export function updateWinningTable(result) {
    const matchTypes = ['3', '4', '5', '5+bonus', '6'];

    matchTypes.forEach((matchType, index) => {
        document.querySelector(`.winning-table tr:nth-child(${index + 2}) td:last-child`).textContent = `${result[matchType]}개`;
    });
}

export function updateProfit(profitRate) {
    document.getElementsByClassName("profit")[0].textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
}
