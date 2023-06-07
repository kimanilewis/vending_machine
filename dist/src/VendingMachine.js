"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendingMachine = void 0;
const ProductInventory_js_1 = require("./ProductInventory.js");
const CoinInventory_js_1 = require("./CoinInventory.js");
class VendingMachine {
    constructor(products, coins) {
        this.productInventory = new ProductInventory_js_1.ProductInventory(products);
        this.coinInventory = new CoinInventory_js_1.CoinInventory(coins);
    }
    buyProduct(productId, coins) {
        const product = this.productInventory.getProductById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        const totalPrice = product.price;
        const providedAmount = coins.reduce((total, coin) => total + coin.denomination * coin.quantity, 0);
        if (providedAmount < totalPrice) {
            throw new Error('Insufficient funds');
        }
        const change = providedAmount - totalPrice;
        const availableCoins = this.coinInventory;
        const returnedCoins = [];
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];
            const availableCoin = availableCoins.getCoinByDenomination(coin.denomination);
            if (availableCoin && availableCoin.quantity >= coin.quantity) {
                returnedCoins.push({ denomination: coin.denomination, quantity: coin.quantity });
                availableCoin.quantity -= coin.quantity;
            }
        }
        if (change > 0) {
            const denominations = availableCoins.getAvailableDenominations().sort((a, b) => b - a);
            let remainingChange = change;
            for (let i = 0; i < denominations.length; i++) {
                const denomination = denominations[i];
                const quantity = Math.floor(remainingChange / denomination);
                const availableCoin = availableCoins.getCoinByDenomination(denomination);
                if (quantity > 0 && availableCoin && availableCoin.quantity >= quantity) {
                    returnedCoins.push({ denomination, quantity });
                    remainingChange -= denomination * quantity;
                }
                if (remainingChange === 0) {
                    break;
                }
            }
            if (remainingChange > 0) {
                throw new Error('Unable to provide exact change');
            }
        }
        product.quantity--;
        returnedCoins.forEach((coin) => {
            availableCoins.adjustCoinQuantity(coin.denomination, coin.quantity);
        });
        return returnedCoins;
    }
    setProductPrice(productId, price) {
        const product = this.productInventory.getProductById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        product.price = price;
    }
    adjustProductQuantity(productId, quantity) {
        this.productInventory.adjustProductQuantity(productId, quantity);
    }
    adjustCoinQuantity(denomination, quantity) {
        this.coinInventory.adjustCoinQuantity(denomination, quantity);
    }
}
exports.VendingMachine = VendingMachine;
