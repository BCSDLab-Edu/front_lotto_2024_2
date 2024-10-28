const $purchasebutton = document.getElementsByClassName("purchase-button")[0];
const $purchasemoney=document.getElementsByClassName("purchase-money")[0];
const $lottolist= document.getElementsByClassName("lotto-tickets-container")[0];
const $resultbutton=document.getElementsByClassName("result")[0];

function randomnumber(){
    const RandomRange=30;
    const lottoNumbers = [];
    for (let i = 0; i < 6; i++) {lottoNumbers.push(Math.floor(Math.random() * RandomRange));}
    return lottoNumbers.join(", ");
}

function buyLotto(event){
    event.preventDefault()
    const boughtCount=Math.floor($purchasemoney.value/1000);
    $lottolist.innerHTML = `<span class="lotto-bought-title">총  ${boughtCount}개를 구매하였습니다.</span>`
    for(let count=0;count<boughtCount;count++){
        $lottolist.innerHTML+=
        `<div>🎟️ ${randomnumber()}</div>`
    }
}

function resultLotto(){
    
}

$purchasebutton.addEventListener("click",buyLotto);
$resultbutton.addEventListener("click",resultLotto);

