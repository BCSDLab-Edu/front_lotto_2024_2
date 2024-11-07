export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isValidRange(number, min, max) {
    return !isNaN(number) && number >= min && number <= max;
}

export function isDivisibleBy(number, divider) {
    return !isNaN(number) && number % divider === 0;
}

export function listNumbersInRanges(numbers, min, max) {
    return numbers.filter(number => isValidRange(number, min, max));
}

export function isNaturalNumber(number) {
    return number > 0 && Number.isInteger(number);
}
