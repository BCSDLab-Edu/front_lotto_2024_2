export function getNumbers(){
    let InputNumbers = new Map();
    let idx = 1;

    document.querySelectorAll('#lottery-table li p').forEach((el) => {
        InputNumbers.set(idx, el.textContent.split(', '));
        idx++;
    })

    return InputNumbers;
}
