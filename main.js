const $purchasebutton = document.getElementsByClassName("purchase-button")[0];
const $purchasemoney=document.getElementsByClassName("purchase-money")[0];
const $lottolist= document.getElementsByClassName("lotto-tickets-container")[0];
const $resultbutton=document.getElementsByClassName("result")[0];
const $modal=document.getElementsByClassName("modal")[0];
const $modalclosex=document.getElementsByClassName("modal-close-x")[0];
const $restartbutton=document.getElementsByClassName("restart")[0];
const $winninglottos = document.querySelectorAll('.number-input-container input');
$modal.style.display = 'none';

let lottos=[]


//무작위 로또생성
function randomnumber(){
    const RandomRange=30;   //로또숫자범위
    const lottoNumbers = [];
    while(true){
        const num= Math.floor(Math.random() * RandomRange)
        if(!lottoNumbers.includes(num)){lottoNumbers.push(num);} 
        if(lottoNumbers.length==6) break;
    }
    lottos.push(lottoNumbers)
    return lottoNumbers.join(", ");
}

//로또 구입
function buyLotto(event){
    event.preventDefault()
    lottos=[]
    const boughtCount=Math.floor($purchasemoney.value/1000);
    $lottolist.innerHTML = `<span class="lotto-bought-title">총  ${boughtCount}개를 구매하였습니다.</span>`
    for(let count=0;count<boughtCount;count++){
        $lottolist.innerHTML+=
        `<div>🎟️ ${randomnumber()}</div>`
    }
    console.log(lottos)
}

//모달 ON/OFF
function toggleModal(){
    if($modal.style.display === 'flex')$modal.style.display = 'none';
    else $modal.style.display='flex';
}


//로또 결과
function resultLotto(event){
    event.preventDefault();
    Checkwinning();
    toggleModal();
}

//당첨로또 체크
function Checkwinning(){
    const winning = Array.from($winninglottos).map(win => win.value);

    console.log(winning);
}



$purchasebutton.addEventListener("click",buyLotto);
$resultbutton.addEventListener("click",resultLotto);
$modalclosex.addEventListener("click",toggleModal);
$restartbutton.addEventListener("click",toggleModal);