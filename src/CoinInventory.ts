import {Coin} from './models/Coin'

export class CoinInventory {
    private coins: Map<number, number>;
  
    constructor(coins: Coin[]) {
      this.coins = new Map<number, number>();
      this.initializeCoins(coins);
    }
  
    private initializeCoins(coins: Coin[]): void {
      coins.forEach((coin) => {
        this.coins.set(coin.denomination, coin.quantity);
      });
    }
  
    public getAvailableCoins(): Coin[] {
      const availableCoins: Coin[] = [];
  
      this.coins.forEach((quantity, denomination) => {
        availableCoins.push({ denomination, quantity });
      });
  
      return availableCoins;
    }
  
    public getCoinByDenomination(denomination: number): Coin | null {
      const quantity = this.coins.get(denomination) || 0;
      if (quantity > 0) {
        return { denomination, quantity };
      }
      return null;
    }
  
    public getAvailableDenominations(): number[] {
      return Array.from(this.coins.keys());
    }
  
    public getCoinQuantity(denomination: number): number {
      return this.coins.get(denomination) || 0;
    }
  
    public adjustCoinQuantity(denomination: number, quantity: number): void {
      const currentQuantity = this.coins.get(denomination) || 0;
      const newQuantity = Math.max(currentQuantity + quantity, 0);
      this.coins.set(denomination, newQuantity);
    }
  }
  