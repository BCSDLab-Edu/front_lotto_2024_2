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
    const boughtCount=Math.floor($purchasemoney.value/1000);
    $lottolist.innerHTML = `<span class="lotto-bought-title">총  ${boughtCount}개를 구매하였습니다.</span>`
    for(let count=0;count<boughtCount;count++){
        $lottolist.innerHTML+=
        `<div>🎟️ ${randomnumber()}</div>`
    }
}


function randomnumber(){
    const RandomRange=30;   //로또숫자범위
    const lottoNumbers = [];//중복제거용
    while(true){
        const num= Math.floor(Math.random() * RandomRange)
        if(!lottoNumbers.includes(num)){lottoNumbers.push(num);} 
        if(lottoNumbers.length==6) break;
    }
    lottos.push(lottoNumbers)
    return lottoNumbers.join(", ");
}