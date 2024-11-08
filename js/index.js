export const Lotto = {
    length: 6,
    price: 1000,
    profit_list: [5_000, 50_000, 1_500_000, 30_000_000, 2_000_000_000],

    get moneyAmount() {
        return parseInt(document.getElementById('money-amount').value,10);
    },

    get buy_amount() {
        return this.moneyAmount / this.price;
    }
};
