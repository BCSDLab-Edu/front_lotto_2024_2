const btn = document.querySelector('.buy-button'); // 구입 버튼
let input_money = document.querySelector('#money-input'); // 금액 입력 칸
const lottonumgroup = document.querySelector('.lottonumgroup'); // 로또 번호 그룹

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
    let lottoAmount = Math.floor(input_money.value / 1000);

    if (lottoAmount > 8) {
        alert('최대 개수를 초과하였습니다.');
        return;
    }

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
});


const btn_open = document.querySelector('.result');
const modal = document.querySelector('.pop-result');
const btn_close = document.querySelector('.close');

btn_open.onclick = function() {
    modal.style.display = "flex"; //버튼 클릭시 모달 띄우기
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
}