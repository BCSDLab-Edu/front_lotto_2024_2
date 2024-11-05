import {Lotto} from "./index.js";

export async function getLottoNumbers(){
    const firstLottoDate = new Date('2002-12-07');
    const today = new Date();

    const diffDays = Math.floor((today - firstLottoDate) / (86400000)); // 초로 나눔
    const diffWeeks = Math.floor(diffDays / 7);

    let lottoRound = diffWeeks + 1;

    const lastSaturday = new Date(today);
    lastSaturday.setDate(today.getDate() - (today.getDay() + 1) % 7);

    if (today > lastSaturday) lottoRound += 1;

    let site = "https://cors-anywhere.herokuapp.com/https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=" + (lottoRound-1);

    try {
        const res = await fetch(site);

        const text = await res.text();
        const data = JSON.parse(text);


        if (data['returnValue'] === "success") {
            let numberList = [];
            for (let i = 1; i <= Lotto.length; i++){
                numberList.push(data[`drwtNo${i}`]);
            }
            numberList.push(data['bnusNo']);
            return numberList;
        }
    } catch (error) {
        console.error('로또 번호를 가져오는 중 오류 발생:', error);
        return false;
    }
}
