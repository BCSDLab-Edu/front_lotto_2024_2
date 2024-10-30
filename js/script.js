const open_popup = document.getElementById('buy-popup-open');
const popup = document.getElementById('floating-content');
const background = document.getElementById('popup-background');
const close_popup = document.getElementById('close-floating-content');

async function getLottoNumber(){
    const firstLottoDate = new Date('2002-12-07');
    const today = new Date();

    const diffDays = Math.floor((today - firstLottoDate) / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);

    let lottoRound = diffWeeks + 1;

    const lastSaturday = new Date(today);
    lastSaturday.setDate(today.getDate() - (today.getDay() + 1) % 7);

    if (today > lastSaturday) lottoRound += 1;

    let site = "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=" + lottoRound;

    try {
        const res = await fetch(site);
        const data = await res.json();

        let successValue = data['returnValue'];
        if (successValue === "success") {
            let numberList = [];
            for (let i = 1; i <= 6; i++) {
                let numberidx = 'drwtNo' + i;
                numberList.push(data[numberidx]);
            }
            numberList.push(data['bnusNo']);
            return numberList;
        } else {
            return false;
        }
    } catch (error) {
        console.error('로또 번호를 가져오는 중 오류 발생:', error);
        return false;
    }
}

open_popup.addEventListener('click', async ()=>{
    popup.style.display = 'flex';
    background.style.display = 'flex';
    let lottery = await getLottoNumber();
    const lotteryNumber = document.getElementById('lottery-number');
    if (lottery){
        let bonus_number = lottery.pop();
        lottery.sort((a, b) => a - b);

        lotteryNumber.innerHTML = `로또 번호: ${lottery.join(', ')}, 보너스 번호: ${bonus_number}`;
    } else {
        lotteryNumber.innerHTML = '로또 번호를 가져오는데 실패했습니다.';
    }
})

background.addEventListener('click', ()=>{
    popup.style.display = 'none';
    background.style.display = 'none';
})

close_popup.addEventListener('click', ()=>{
    popup.style.display = 'none';
    background.style.display = 'none';
})