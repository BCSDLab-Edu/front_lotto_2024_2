now_lotto_arr = [];
now_cost = 0;

function cost_alert() {
    now_cost = document.getElementById("main_input");

    if (now_cost.value < 1000) {
        alert("입력 금액이 너무 적습니다.");
        now_cost.value = null;
    } else if (now_cost.value % 1000 != 0) {
        alert("입력 금액은 1,000원 단위로 입력해 주세요.");
        now_cost.value = null;
    } else {
        const lottoCount = Math.floor(now_cost.value / 1000);
        alert("복권 " + lottoCount + "개를 구매합니다.");
        random_lotto_generation(lottoCount);
    }
}

function random_lotto_generation(lotto_numbers) {
    const now_num_box = document.getElementById("num_box");
    now_num_box.innerHTML = "";
    now_lotto_arr = [];

    for (let i = 0; i < lotto_numbers; i++) {
        now_lotto_arr[i] = [];
        for (let j = 0; j < 6; j++) {
            while (true) {
                let random_number = Math.floor(Math.random() * 45) + 1;
                if (!now_lotto_arr[i].includes(random_number)) {
                    now_lotto_arr[i].push(random_number);
                    break;
                }
            }
        }

        now_lotto_arr[i].sort(function(a, b)  {
            if(a > b) return 1;
            if(a === b) return 0;
            if(a < b) return -1;
        });

        const new_lotto_num_Box = document.createElement("div");
        new_lotto_num_Box.classList.add("lotto_num_box");

        const new_lotto_icon = document.createElement("div");
        new_lotto_icon.classList.add("lotto_icon");
        new_lotto_icon.textContent = "🎟️";
        new_lotto_num_Box.appendChild(new_lotto_icon);

        const new_num = document.createElement("div");
        new_num.classList.add("num");
        new_num.textContent = now_lotto_arr[i].join(", ");
        new_lotto_num_Box.appendChild(new_num);

        now_num_box.appendChild(new_lotto_num_Box);
    }

    document.getElementById("middle_text").innerHTML = "총 " +lotto_numbers + "개의 복권을 구매하였습니다.";
}

function open_modal() {
    const modal = document.getElementById('modal_container');

    if (now_cost == 0) {
        alert("먼저 복권을 구매해 주세요.");
        return;
    }

    const winning_number = [];
    winning_number[0] = Number(document.getElementById('1num').value);
    winning_number[1] = Number(document.getElementById('2num').value);
    winning_number[2] = Number(document.getElementById('3num').value);
    winning_number[3] = Number(document.getElementById('4num').value);
    winning_number[4] = Number(document.getElementById('5num').value);
    winning_number[5] = Number(document.getElementById('6num').value);
    const bonus_number = Number(document.getElementById('bonus_input').value);

    for (let i = 0 ; i < 6 ; i++) {
        if (winning_number[i] == 0) {
            alert("당첨 번호를 입력해 주세요.")
            return;
        }
        if (winning_number[i] > 45 || winning_number[i] < 1) {
            alert("당첨 번호는 1 ~ 45 사이의 숫자이어야 합니다.")
            return;
        }
    }

    if (bonus_number == 0) {
        alert("당첨 번호를 입력해 주세요.")
        return;
    }
    if (bonus_number > 45 || bonus_number < 1) {
        alert("당첨 번호는 1 ~ 45 사이의 숫자이어야 합니다.")
        return;
    }

    var ball_3_num = 0;
    var ball_4_num = 0;
    var ball_5_num = 0;
    var ball_5b_num = 0;
    var ball_6_num = 0;
    var ball_num = 0;

    for (let i = 0 ; i < now_lotto_arr.length ; i++) {
        ball_num = 0;
        
        for (let j = 0 ; j < 6 ; j++) {
            if (now_lotto_arr[i].includes(winning_number[j])) {
                ball_num += 1;
            }
        }

        if (ball_num == 3) {
            ball_3_num += 1;
        }
        if (ball_num == 4) {
            ball_4_num += 1;
        }
        if (ball_num == 5) {
            if (now_lotto_arr[i].includes(bonus_number)) {
                ball_5b_num += 1;
            } else {
                ball_5_num += 1;
            }
        }
        if (ball_num == 6) {
            ball_6_num += 1;
        }
    }

    document.getElementById('ball_3').innerHTML = ball_3_num + "개";
    document.getElementById('ball_4').innerHTML = ball_4_num + "개";
    document.getElementById('ball_5').innerHTML = ball_5_num + "개";
    document.getElementById('ball_5b').innerHTML = ball_5b_num + "개";
    document.getElementById('ball_6').innerHTML = ball_6_num + "개";

    const final_profit = (ball_3_num * 5000) + (ball_4_num * 50000) + (ball_5_num * 1500000) + (ball_5b_num * 30000000) + (ball_6_num * 2000000000);

    if (final_profit < Number(now_cost.value)) {
        document.getElementById("lotto_result").innerHTML = "당신의 총 수익률은 0%입니다.";
    } else {
            document.getElementById("lotto_result").innerHTML = "당신의 총 수익률은 " + Math.floor((final_profit / Number(now_cost.value)) * 100) + "%입니다.";
    }

    modal.classList.remove("hidden");
}

function close_modal() {
    const modal = document.getElementById('modal_container');

    modal.classList.add("hidden");
}
