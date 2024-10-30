const $purchasebutton = document.getElementsByClassName("purchase-button")[0];
const $purchasemoney=document.getElementsByClassName("purchase-money")[0];
const $lottolist= document.getElementsByClassName("lotto-tickets-container")[0];
const $resultbutton=document.getElementsByClassName("result")[0];
const $modal=document.getElementsByClassName("modal")[0];
const $modalclosex=document.getElementsByClassName("modal-close-x")[0];
const $restartbutton=document.getElementsByClassName("restart")[0];
const $winninglottos = document.querySelectorAll('.winning input');
const $bonuswinninglotto = document.querySelector('.bonus input');
const $resulttable= document.querySelector('.result-table');
const $profit = document.querySelector('.profit');
$modal.style.display = 'none';

let lottos=[]
let winMoneyCount=[0,0,0,0,0];
let boughtCount=0;
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
    boughtCount=Math.floor($purchasemoney.value/1000);
    $lottolist.innerHTML = `<span class="lotto-bought-title">총  ${boughtCount}개를 구매하였습니다.</span>`
    for(let count=0;count<boughtCount;count++){
        $lottolist.innerHTML+=
        `<div>🎟️ ${randomnumber()}</div>`
    }
    console.log(lottos)
}


//로또 결과
function resultLotto(event){
    event.preventDefault();
    Checkwinning();
    modalHtmlInsert();
    toggleModal();
}


//당첨로또 체크
function Checkwinning(){
    winMoneyCount=[0,0,0,0,0]
    const winning = Array.from($winninglottos).map(win => parseInt(win.value,10));
    const bonuswinning = $bonuswinninglotto.value;
    lottos.forEach(lotto=>{
        let winNum=0;
        winning.forEach(winningNumber=>{
            if(lotto.includes(winningNumber)) winNum++;
        })
        if(winNum>=3){
            if(winNum===6) winMoneyCount[4]++;
            else winMoneyCount[winNum-3]++;
            
            if(lotto.includes(bonuswinning)){
                winMoneyCount[winNum-3]--
                winMoneyCount[winNum-2]++
            }
        }
    })
    console.log(winMoneyCount);
    console.log(bonuswinning);
    console.log(winning);
}

//모달 작성
function modalHtmlInsert(){
    const winMoney=[5000,50000,1500000,30000000,2000000000]
    const winCount=["3개","4개","5개","5개+보너스볼","6개"]
    $resulttable.innerHTML=`
    <tr>
        <th>일치 갯수</th>
        <th>당첨금</th>
        <th>당첨 갯수</th>
    </tr>
    `
    let profit= 0;
    for(let i=0;i<5;i++){
        $resulttable.innerHTML+=`
        <tr>
            <td>${winCount[i]}</td>
            <td>${winMoney[i]}</td>
            <td>${winMoneyCount[i]}개</td>
        </tr>
        `
        profit+=winMoney[i]*winMoneyCount[i];
    }
    
    $profit.textContent=`당신의 총 수익률은${((profit-(boughtCount*1000))/(boughtCount*1000)*100)}%입니다.`
}
//모달 ON/OFF
function toggleModal(){
    if($modal.style.display === 'flex')$modal.style.display = 'none';
    else $modal.style.display='flex';
}

//클릭이벤트
$purchasebutton.addEventListener("click",buyLotto);
$resultbutton.addEventListener("click",resultLotto);
$modalclosex.addEventListener("click",toggleModal);
$restartbutton.addEventListener("click",toggleModal);