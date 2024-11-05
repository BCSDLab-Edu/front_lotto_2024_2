import {addTable} from "./addTable.js";
import {UI} from "./UI.js";
import {prizeRate} from "./prizeRate.js";
const ui = new UI();

ui.buy_lottery.addEventListener('click', () => addTable());
ui.open_popup.addEventListener('click', async () => {
    ui.showPopup();
    await prizeRate();
});
ui.background.addEventListener('click', ui.hidePopup.bind(UI));
ui.close_popup.addEventListener('click', ui.hidePopup.bind(UI));
ui.restart.addEventListener('click', () => {
    ui.hidePopup();
    document.getElementById("lottery-table").innerHTML = '';
    document.getElementById('amount-context').innerHTML = `<p>금액을 입력해주세요.</p>`;
});
