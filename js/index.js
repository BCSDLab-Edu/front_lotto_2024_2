export const Lotto = {
    length: 6,
    price: 1000,
    profit_list: [5000, 50000, 1500000, 30000000, 2000000000],

    get moneyAmount() {
        return parseInt(document.getElementById('money-amount').value,10);
    },

    get buy_amount() {
        return this.moneyAmount / this.price;
    }
};
