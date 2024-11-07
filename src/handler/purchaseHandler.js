import { generateLottoNumbers } from '../modules/lottoGenerator.js';
import { createLottoList } from '../views/view.js';
import { isDivisibleBy, isNaturalNumber } from '../util.js';

export function handlePurchaseButton() {
    const moneyInput = document.getElementById("money");
    const amount = parseInt(moneyInput.value, 10);

    if (!isNaturalNumber(amount) || !isDivisibleBy(amount, 1000)) {
        alert("1000원 단위의 금액을 입력해주세요.");
        moneyInput.value = "";
        return;
    }

    const count = Math.floor(amount / 1000);
    const lottoNumbersList = Array.from({ length: count }, generateLottoNumbers);
    createLottoList(count, lottoNumbersList);
}
