const btn = document.querySelector('.buy-button'); // 구입 버튼
const input_money = document.getElementById('money-input'); // 금액 입력 칸
const lottonumgroup = document.querySelector('.lottonumgroup'); // 로또 번호 그룹
let amount = document.querySelector('.amount');

function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 7) {
        const randNum = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(randNum)) {
            numbers.push(randNum);
        }
    }
    return numbers.sort((a, b) => a - b).join(', ');
}

btn.addEventListener('click', function() {
    let lottoAmount = 0;
    if (input_money.value % 1000 == 0){//1000원 단위 검증
        lottoAmount = Math.floor(input_money.value / 1000);

    lottonumgroup.innerHTML = '';

    for (var i = 0; i < lottoAmount; i++) {
        const lottoItem = document.createElement('div');
        lottoItem.className = 'image';
        const img = document.createElement('img');
        img.src = 'image.png';
        img.alt = 'image';
        img.className = 'item';

        const numSpan = document.createElement('span');
        numSpan.className = 'num';
        numSpan.textContent = generateLottoNumbers();

        lottoItem.appendChild(img);
        lottoItem.appendChild(numSpan);
        lottonumgroup.appendChild(lottoItem);
    }

    alert(lottoAmount + '개를 구매합니다.');
    amount.innerText = '총' + lottoAmount + '개를 구매하였습니다.';
    }
    else{//1000원 단위가 아니면 경고창
        alert('올바른 숫자를 입력하세요.');
        input_money.value = null; //금액 초기화
    }
});


const btn_open = document.querySelector('.result');
const modal = document.querySelector('.pop-result');
const btn_close = document.querySelector('.close');
let lotto_num = document.querySelector('.numrectangle').value;


if (lotto_num != null && lotto_num != 0){//!!!!!!!!!!!!!!여기부터 해야함 numrectangle 타입정하고 조건문 완성!!!!!!
    btn_open.onclick = function() {
        modal.style.display = "flex"; //버튼 클릭시 모달 띄우기
    };
};
btn_close.onclick = function() { 
    modal.style.display = "none"; //x버튼 클릭시 모달 숨기기
};

window.onclick = function(event) {
    if (event.target == modal){
        modal.style.display = "none"; //모달 외부 클릭시 모달 숨김
    }
};

const restart = document.querySelector('.restart');

restart.onclick = function(){
    modal.style.display = "none";
    input_money.value = null;
    lottonumgroup.innerHTML = '';
    amount.innerText = '총 0개를 구매하였습니다.'
}
