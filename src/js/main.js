import { LOTTO } from './constants.js';

const my_lots = [];
const button_purchase = document.getElementById("button-purchase");
const button_result = document.getElementById("button-result");
const button_close = document.getElementById("button-close");
const button_retry = document.getElementById("button-retry");
const modal = document.getElementById("modal");
const modal_background = document.getElementById("modal-background");
const lotto_list = document.getElementById("lottos");
const input_price = document.getElementById("input-price");

function purchase(){
    const purchase_count = Math.floor(input_price.value / 1000);
    for (let i=0; i<purchase_count; ++i){
        const lots = draw_lots();
        add_list(lots);
    }
    input_price.value = "";
}

function refresh_count(){
    document.querySelector(".box-list > p").innerText =
        "총 "+lotto_list.childElementCount+"개를 구매하였습니다.";
}

function refresh_result(prize_counts, earnings_rate){
    const winnings_count_elements = document.getElementsByClassName("winnings-count");
    const earnings_rate_element = document.getElementById("earnings-rate");
    for(let i=0; i<5; ++i){
        winnings_count_elements[i].innerText = prize_counts[i]+"개";
    }
    earnings_rate_element.innerText = "당신의 총 수익률은 "+earnings_rate+"%입니다.";
}

function add_list(lots){
    const li = document.createElement("li");
    my_lots.push(lots);
    li.setAttribute("class", "lotto");
    li.appendChild(document.createElement("span")).innerText = '🎟️';
    li.appendChild(document.createElement("p")).innerText = lots.join(", ");
    lotto_list.appendChild(li);
    refresh_count();
}

function draw_lots(){
    const lots = [];
    const numbers = Array.from({length: 45}, (_, i) => i+1);
    for (let i=0; i<6; ++i){
        const index = Math.floor(Math.random() * numbers.length);
        [numbers[index], numbers[numbers.length-1]] = [numbers[numbers.length-1], numbers[index]];
        lots[i] = numbers.pop();
    }
    return lots;
}

function open_result(){
    modal.style.display = "flex";
    modal_background.style.display = "flex";
}

function close_result(){
    modal.style.display = "none";
    modal_background.style.display = "none";
}

function check_winnings(){
    const input_numbers = document.getElementsByClassName("input-numbers");
    const winning_numbers = [];
    for (let i=0; i<6; ++i){
        winning_numbers[i] = parseInt(input_numbers[i].value);
    }
    const bonus_number = parseInt(input_numbers[6].value);
    const prize_counts = [0,0,0,0,0];
    const prizes = [5000, 50000, 1500000, 30000000, 2000000000];
    my_lots.forEach(lots => {
        const winning_count = lots.filter(number => winning_numbers.includes(number)).length;
        switch (winning_count){
            case 6:
                ++prize_counts[4];
                break;
            case 5:
                if (lots.includes(bonus_number)) ++prize_counts[3];
                else ++prize_counts[2];
                break;
            case 4:
                ++prize_counts[1];
                break;
            case 3:
                ++prize_counts[0];
                break;
        }
    });

    const earnings = [];
    for (let i=0; i<5; ++i){
        earnings[i] = prize_counts[i] * prizes[i];
    }

    const total_earnings = earnings.reduce((acc, cur) => {return acc+cur;}, 0);
    const total_cost = (1000*my_lots.length)
    const earnings_rate = (100 * (total_earnings / total_cost - 1)).toFixed(2);
    refresh_result(prize_counts, earnings_rate);
    open_result();
}

function retry(){
    my_lots.splice(0, my_lots.length);
    document.getElementById("lottos").replaceChildren();
    refresh_count();
    close_result();
}

button_purchase.addEventListener("click", purchase);
button_result.addEventListener("click", check_winnings);
button_close.addEventListener("click", close_result);
button_retry.addEventListener("click", retry);