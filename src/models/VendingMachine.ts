import {Coin} from './Coin';
import {Product} from './Product.js';

export interface VendingMachine {
    products: Product[];
    coins: Coin[];
  }