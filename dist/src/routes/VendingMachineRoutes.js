"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const VendingMachine_js_1 = require("../VendingMachine.js");
const router = express_1.default.Router();
const vendingMachine = new VendingMachine_js_1.VendingMachine([], []);
// Regular user routes
console.log(`Request: ${router.toString}`);
router.post('/buy', (req, res) => {
    console.log(`got here: ${router.toString}`);
    const { productId, coins } = req.body;
    console.log(`Request `);
    try {
        console.log(`Request dddddd`);
        const change = vendingMachine.buyProduct(productId, coins);
        res.json({ change });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Maintenance user routes
router.put('/products/:id/price', (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    try {
        vendingMachine.setProductPrice(id, price);
        res.json({ message: 'Price updated successfully' });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
router.put('/products/:id/quantity', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        vendingMachine.adjustProductQuantity(id, quantity);
        res.json({ message: 'Quantity updated successfully' });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
router.put('/coins', (req, res) => {
    const { coins } = req.body;
    coins.forEach((coin) => {
        vendingMachine.adjustCoinQuantity(coin.denomination, coin.quantity);
    });
    res.json({ message: 'Coins updated successfully' });
});
exports.default = router;
