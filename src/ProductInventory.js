export class ProductInventory {
    constructor(products) {
        this.products = products;
    }
    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }
    adjustProductQuantity(id, quantity) {
        const product = this.getProductById(id);
        if (product) {
            product.quantity += quantity;
        }
    }
}
