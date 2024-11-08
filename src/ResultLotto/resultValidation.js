export function resultButtonValidation($winninglottos,$bonuswinninglotto){
    if ([...$winninglottos].some(input => input.value === "") || $bonuswinninglotto.value==="") {
        alert("번호 다입력해줘요");
        return false;
    }

    return true;
}