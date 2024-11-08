import { lottos } from "../PurchaseLotto/lotto";
import { resultButtonValidation } from "./resultValidation";


export function resultEvent(event){
    event.preventDefault();
    if(resultButtonValidation($winninglottos,$bonuswinninglotto)){
        Checkwinning(lottos);
        modalHtmlInsert(lottos);
        toggleModal();
    }
}

const $winninglottos = document.querySelectorAll('.winning input');
const $bonuswinninglotto = document.querySelector('.bonus input');
const $resulttable= document.querySelector('.result-table');
const $profit = document.querySelector('.profit');
const $modal=document.getElementsByClassName("modal")[0];
$modal.style.display = 'none';

let winMoneyCount=[0,0,0,0,0];  //당첨갯수리스트

//당첨로또 체크
function Checkwinning(lottos){
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
}

//모달 작성
function modalHtmlInsert(lottos){
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
    $profit.textContent=`당신의 총 수익률은 ${((profit-(lottos.length*1000))/(lottos.length*1000)*100).toFixed(2)}%입니다.`
}

//모달 ON/OFF
export function toggleModal(){
    if($modal.style.display === 'flex')$modal.style.display = 'none';
    else $modal.style.display='flex';
}