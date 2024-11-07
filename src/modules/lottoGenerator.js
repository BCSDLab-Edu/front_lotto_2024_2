import { getRandomNumber } from '../util.js';

export function generateLottoNumbers() {
    const numbers = new Set();

    while (numbers.size < 6) {
        numbers.add(getRandomNumber(1, 45));
    }

    return Array.from(numbers);
}
