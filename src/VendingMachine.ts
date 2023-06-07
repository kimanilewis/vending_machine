import {ProductInventory} from './ProductInventory.js'
import {CoinInventory} from './CoinInventory.js'
import { Coin } from './models/Coin.js';
import { Product } from './models/Product.js';


export class VendingMachine {
    private productInventory: ProductInventory;
    private coinInventory: CoinInventory;
  
    constructor(products: Product[], coins: Coin[]) {
      this.productInventory = new ProductInventory(products);
      this.coinInventory = new CoinInventory(coins);
    }
  
    public buyProduct(productId: string, coins: Coin[]): Coin[] | undefined {
      const product = this.productInventory.getProductById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
  
      const totalPrice = product.price;
      const providedAmount = coins.reduce((total: number, coin: Coin) => total + coin.denomination * coin.quantity, 0);
  
      if (providedAmount < totalPrice) {
        throw new Error('Insufficient funds');
      }
  
      const change = providedAmount - totalPrice;
      const availableCoins = this.coinInventory;
  
      const returnedCoins: Coin[] = [];
  
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
  
    public setProductPrice(productId: string, price: number): void {
      const product = this.productInventory.getProductById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      product.price = price;
    }
  
    public adjustProductQuantity(productId: string, quantity: number): void {
      this.productInventory.adjustProductQuantity(productId, quantity);
    }
  
    public adjustCoinQuantity(denomination: number, quantity: number): void {
      this.coinInventory.adjustCoinQuantity(denomination, quantity);
    }
  }
  