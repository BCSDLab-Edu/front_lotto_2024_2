const btn = document.querySelector('.buy-button'); // 구입 버튼
const input_money = document.getElementById('money-input'); // 금액 입력 칸
const lottonumgroup = document.querySelector('.lottonumgroup');
let amount = document.querySelector('.amount');

let generatedLottoNumbers = []; 

function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
        const randNum = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(randNum)) {
            numbers.push(randNum);
        }
    }
    return numbers.sort((a, b) => a - b); // 6개의 번호만 생성하여 반환
}

btn.addEventListener('click', function() {
    let lottoAmount = 0;
    if (input_money.value % 1000 === 0) { // 1000원 단위 검증
        lottoAmount = Math.floor(input_money.value / 1000);
        lottonumgroup.innerHTML = '';

        for (let i = 0; i < lottoAmount; i++) {
            const lottoItem = document.createElement('div');
            lottoItem.className = 'image';
            const img = document.createElement('img');
            img.src = 'image.png';
            img.alt = 'image';
            img.className = 'item';

            const numSpan = document.createElement('span');
            numSpan.className = 'num';
            generatedLottoNumbers = generateLottoNumbers(); // 로또 번호 생성 및 저장
            numSpan.textContent = generatedLottoNumbers.join(', '); // 구매 시 보너스 번호는 표시하지 않음

            lottoItem.appendChild(img);
            lottoItem.appendChild(numSpan);
            lottonumgroup.appendChild(lottoItem);
        }

        alert(lottoAmount + '개를 구매합니다.');
        amount.innerText = '총 ' + lottoAmount + '개를 구매하였습니다.';
    } else {
        alert('올바른 숫자를 입력하세요.');
        input_money.value = null;
    }
});

const btn_open = document.querySelector('.result'); // 결과 확인 버튼
const modal = document.querySelector('.pop-result'); // 모달 창
const btn_close = document.querySelector('.close'); // 모달 닫기 버튼

btn_open.onclick = function() {
    const lotto_nums = Array.from(document.querySelectorAll('.numrectangle')).map(input => parseInt(input.value, 10));
    const valid = lotto_nums.every(num => !isNaN(num) && num >= 1 && num <= 45);
    
    if (valid) {
        const matchCounts = { 3: 0, 4: 0, 5: 0, "5b": 0, 6: 0 }; // 각 맞춘 개수를 저장할 객체 초기화
        let totalPrize = 0; // 총 당첨금 초기화

        const winnings = { 3: 5000, 4: 50000, 5: 1500000, "5b": 30000000, 6: 2000000000 }; // 당첨금 정의

        const bonusNumber = parseInt(document.querySelector('.bonusnumrectangle').value, 10); // 보너스 번호 입력받기

        // 각 구매한 로또 번호와 당첨 번호를 비교하여 일치 개수 계산
        const purchasedLottos = document.querySelectorAll('.num'); // 구입한 로또 번호 그룹
        purchasedLottos.forEach(purchasedLotto => {
            const purchasedNumbers = purchasedLotto.textContent.split(', ').map(Number); // 각 로또 번호를 배열로 변환
            const matchCount = purchasedNumbers.filter(num => lotto_nums.includes(num)).length; // 당첨 번호와 일치하는 개수
            const hasBonus = purchasedNumbers.includes(bonusNumber); // 보너스 번호 포함 여부

            if (matchCount === 6) {
                matchCounts[6]++; // 1등: 6개 일치
                totalPrize += winnings[6];
            } else if (matchCount === 5 && hasBonus) {
                matchCounts["5b"]++; // 2등: 5개 + 보너스
                totalPrize += winnings["5b"];
            } else if (matchCount === 5) {
                matchCounts[5]++; // 3등: 5개 일치
                totalPrize += winnings[5];
            } else if (matchCount === 4) {
                matchCounts[4]++; // 4등: 4개 일치
                totalPrize += winnings[4];
            } else if (matchCount === 3) {
                matchCounts[3]++; // 5등: 3개 일치
                totalPrize += winnings[3];
            }
        });

        // 수익률 계산
        const purchaseAmount = parseInt(input_money.value, 10);
        const profitRate = ((totalPrize - purchaseAmount) / purchaseAmount) * 100;

        document.querySelector('.pop-winning-3 .winning-count').textContent = `${matchCounts[3]}개`;
        document.querySelector('.pop-winning-4 .winning-count').textContent = `${matchCounts[4]}개`;
        document.querySelector('.pop-winning-5 .winning-count').textContent = `${matchCounts[5]}개`;
        document.querySelector('.pop-winning-5b .winning-count').textContent = `${matchCounts["5b"]}개`;
        document.querySelector('.pop-winning-6 .winning-count').textContent = `${matchCounts[6]}개`;

        document.querySelector('.profit').textContent = `당신의 총 수익률은 ${profitRate.toFixed(2)}%입니다.`;

        modal.style.display = "flex"; // 모달 열기
    } else {
        alert("1~45 사이의 숫자를 모두 입력하세요.");
    }
};

btn_close.onclick = function() { 
    modal.style.display = "none"; // x 버튼 클릭 시 모달 숨기기
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; // 모달 외부 클릭 시 모달 숨기기
    }
};

const restart = document.querySelector('.restart');

restart.onclick = function() {
    modal.style.display = "none";
    input_money.value = null;
    lottonumgroup.innerHTML = '';
    amount.innerText = '총 0개를 구매하였습니다.';
};

