import { LOTTO } from './constants.js';
import { selectDom, selectDomAll, createDom } from './dom.js';

const my_lots = [];
const button_purchase = selectDom("#button-purchase");
const button_result = selectDom("#button-result");
const button_close = selectDom("#button-close");
const button_retry = selectDom("#button-retry");
const modal = selectDom('dialog');
const lotto_list = selectDom("#lottos");

function purchase(){
    const input_price = selectDom("#input-price");
    if (isNaN(input_price.value)){
        alert("올바른 값이 아닙니다.");
        return;
    }
    if (input_price.value < LOTTO.PRICE){
        alert(LOTTO.PRICE+"원 이상 입력해야 합니다.");
        return;
    }
    const purchase_count = Math.floor(input_price.value / LOTTO.PRICE);
    for (let i=0; i<purchase_count; ++i){
        const lots = draw_lots();
        add_list(lots);
    }
    input_price.value = "";
}

function refresh_count(){
    selectDom(".box-list > p").innerText =
        "총 "+lotto_list.childElementCount+"개를 구매하였습니다.";
}

function refresh_result(prize_counts, earnings_rate){
    const rank = Object.keys(prize_counts);
    const winnings_count_elements = selectDomAll(".winnings-count");
    const earnings_rate_element = selectDom("#earnings-rate");
    for(let i=0; i<5; ++i){
        winnings_count_elements[i].innerText = prize_counts[rank[i]]+"개";
    }
    earnings_rate_element.innerText = "당신의 총 수익률은 "+earnings_rate+"%입니다.";
}

function add_list(lots){
    const li = createDom("li");
    my_lots.push(lots);
    li.setAttribute("class", "lotto");
    li.appendChild(createDom("span")).innerText = '🎟️';
    li.appendChild(createDom("p")).innerText = lots.join(", ");
    lotto_list.appendChild(li);
    refresh_count();
}

function draw_lots(){
    const lots = [];
    const numbers = Array.from({length: LOTTO.MAX}, (_, i) => i+1);
    for (let i=0; i<LOTTO.LENGTH; ++i){
        const index = Math.floor(Math.random() * numbers.length);
        [numbers[index], numbers[numbers.length-1]] = [numbers[numbers.length-1], numbers[index]];
        lots[i] = numbers.pop();
    }
    return lots.sort((a, b) => a-b);
}

function check_winnings(){
    if (my_lots.length == 0){
        alert("구입한 로또가 없습니다.");
        return;
    }
    const input_numbers = selectDomAll(".input-numbers");
    const numbers = [];
    for (let i=0; i<input_numbers.length; ++i){
        const current_number = parseInt(input_numbers[i].value);
        if (numbers.includes(current_number)){
            alert(current_number+"이(가) 중복됩니다."+ numbers);
            return;
        }
        if (isNaN(current_number)){
            alert("입력되지 않은 항목이 있습니다.");
            return;
        }
        if (current_number < LOTTO.MIN || current_number > LOTTO.MAX){
            alert(LOTTO.MIN+"~"+LOTTO.MAX+" 사이의 값을 입력해야 합니다.");
            return;
        }
        numbers[i] = current_number;
    }
    console.log(numbers)
    
    const winning_numbers = numbers.slice(0,6);
    const bonus_number = numbers[LOTTO.BONUS_INDEX];
    const prize_counts = {'5th':0, '4th':0, '3rd':0, '2nd':0, '1st':0};
    my_lots.forEach(lots => {
        const winning_count = lots.filter(number => winning_numbers.includes(number)).length;
        console.log(winning_count)
        switch (winning_count){
            case 6:
                ++prize_counts['1st'];
                break;
            case 5:
                if (lots.includes(bonus_number)) ++prize_counts['2nd'];
                else ++prize_counts['3rd'];
                break;
            case 4:
                ++prize_counts['4th'];
                break;
            case 3:
                ++prize_counts['5th'];
                break;
        }
    });

    const earnings = [];
    const rank = Object.keys(prize_counts);
    for (let i=0; i<5; ++i){
        earnings[i] = prize_counts[rank[i]] * LOTTO.PRIZES[i];
    }

    const total_earnings = earnings.reduce((acc, cur) => {return acc+cur;}, 0);
    const total_cost = (LOTTO.PRICE * my_lots.length)
    const earnings_rate = (100 * (total_earnings / total_cost - 1)).toFixed(2);
    refresh_result(prize_counts, earnings_rate);
    modal.showModal();
    modal.style.display = 'flex';
}

function close_result(){
    modal.close()
    modal.style.display = 'none';
}

function retry(){
    my_lots.splice(0, my_lots.length);
    selectDom("#lottos").replaceChildren();
    refresh_count();
    close_result();
}

button_purchase.addEventListener("click", purchase);
button_result.addEventListener("click", check_winnings);
button_close.addEventListener("click", close_result);
button_retry.addEventListener("click", retry);
modal.addEventListener('cancel', close_result)