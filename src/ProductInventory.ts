import {Product} from './models/Product.js'

export class ProductInventory {
    private products: Product[];
  
    constructor(products: Product[]) {
      this.products = products;
    }
  
    public getProductById(id: string): Product | undefined {
      return this.products.find((product) => product.id === id);
    }
  
    public adjustProductQuantity(id: string, quantity: number): void {
      const product = this.getProductById(id);
      if (product) {
        product.quantity += quantity;
      }
    }
  }
  