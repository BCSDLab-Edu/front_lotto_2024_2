import { LOTTOPRICE } from "../constants";

const $purchasemoney=document.getElementsByClassName("purchase-money")[0];

export function purchaseVaildation(value){
    if(value===""){
        alert("비어있습니다.");
        return false;
    }
    else if(value%LOTTOPRICE !==0){
        $purchasemoney.value=null;
        alert(LOTTOPRICE+"으로 나눠지지않아요")
        return false;
    } 
    else return true;
}