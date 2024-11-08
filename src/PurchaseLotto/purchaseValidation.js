const $purchasemoney=document.getElementsByClassName("purchase-money")[0];

export function purchaseVaildation(value){
    if(value%1000 !==0){
        $purchasemoney.value=null;
        alert("1000으로 나눠지지않네용~")
        return false;
    } 
    else return true;
}