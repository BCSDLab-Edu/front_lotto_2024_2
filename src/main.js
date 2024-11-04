import './css/reset.css';

import './css/lotto.css';
import './css/modal.css';
import { purchaseEvent } from './lotto';
import { resultEvent, toggleModal } from './winLotto';


const $purchaseButton = document.getElementsByClassName("purchase-button")[0];
const $resultbutton=document.getElementsByClassName("result")[0];
const $modalclosex=document.getElementsByClassName("modal-close-x")[0];
const $restartbutton=document.getElementsByClassName("restart")[0];


//클릭이벤트
$purchaseButton.addEventListener("click",purchaseEvent);
$resultbutton.addEventListener("click",resultEvent);
$modalclosex.addEventListener("click",toggleModal);
$restartbutton.addEventListener("click",toggleModal);