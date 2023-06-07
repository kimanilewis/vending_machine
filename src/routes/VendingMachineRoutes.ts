import express, { Request, Response } from 'express';
import {Coin } from '../models/Coin';
import { VendingMachine } from '../VendingMachine.js';

const router = express.Router();
const vendingMachine: VendingMachine = new VendingMachine([], []);

// Regular user routes
console.log(`Request: ${router.toString}`);
router.post('/buy', (req: Request, res: Response) => {
  console.log(`got here: ${router.toString}`);
  const { productId, coins } = req.body;
  console.log(`Request ` );

  try {
    console.log(`Request dddddd` );
    const change = vendingMachine.buyProduct(productId, coins);
    res.json({ change });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Maintenance user routes

router.put('/products/:id/price', (req: Request, res: Response) => {
    const { id } = req.params;
    const { price } = req.body;
  
    try {
      vendingMachine.setProductPrice(id, price);
      res.json({ message: 'Price updated successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  router.put('/products/:id/quantity', (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;
  
    try {
      vendingMachine.adjustProductQuantity(id, quantity);
      res.json({ message: 'Quantity updated successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  router.put('/coins', (req: Request, res: Response) => {
    const { coins } = req.body;
  
    coins.forEach((coin: Coin) => {
      vendingMachine.adjustCoinQuantity(coin.denomination, coin.quantity);
    });
  
    res.json({ message: 'Coins updated successfully' });
  });
  
export default router;  