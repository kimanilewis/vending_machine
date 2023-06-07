export class CoinInventory {
    constructor(coins) {
        this.coins = new Map();
        this.initializeCoins(coins);
    }
    initializeCoins(coins) {
        coins.forEach((coin) => {
            this.coins.set(coin.denomination, coin.quantity);
        });
    }
    getAvailableCoins() {
        const availableCoins = [];
        this.coins.forEach((quantity, denomination) => {
            availableCoins.push({ denomination, quantity });
        });
        return availableCoins;
    }
    getCoinByDenomination(denomination) {
        const quantity = this.coins.get(denomination) || 0;
        if (quantity > 0) {
            return { denomination, quantity };
        }
        return null;
    }
    getAvailableDenominations() {
        return Array.from(this.coins.keys());
    }
    getCoinQuantity(denomination) {
        return this.coins.get(denomination) || 0;
    }
    adjustCoinQuantity(denomination, quantity) {
        const currentQuantity = this.coins.get(denomination) || 0;
        const newQuantity = Math.max(currentQuantity + quantity, 0);
        this.coins.set(denomination, newQuantity);
    }
}
