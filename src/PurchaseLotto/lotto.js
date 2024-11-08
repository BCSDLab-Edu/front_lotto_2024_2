import { LOTTOLENGTH, LOTTORANGE } from "../constants";
import { purchaseVaildation } from "./purchaseValidation";

export let lottos=[]                   //구입로또리스트
const $purchasemoney=document.getElementsByClassName("purchase-money")[0];
const $lottolist= document.getElementsByClassName("lotto-tickets-container")[0];

export function purchaseEvent(event){
    event.preventDefault();
    buyLottoHtmlInsert();
}

//로또 구입
function buyLottoHtmlInsert(){
    lottos=[]
    if(purchaseVaildation($purchasemoney.value)){
        const boughtCount=$purchasemoney.value/1000;
        $lottolist.innerHTML = `<span class="lotto-bought-title">총  ${boughtCount}개를 구매하였습니다.</span>`
        for(let count=0;count<boughtCount;count++){
            $lottolist.innerHTML+=
            `<div>🎟️ ${randomnumber()}</div>`
        }
    }
}


function randomnumber(){
    const lottoNumbers = [];//중복제거용
    while(true){
        const num= Math.floor(Math.random() * LOTTORANGE)
        if(!lottoNumbers.includes(num)){lottoNumbers.push(num);} 
        if(lottoNumbers.length==LOTTOLENGTH) break;
    }
    lottos.push(lottoNumbers)
    return lottoNumbers.join(", ");
}