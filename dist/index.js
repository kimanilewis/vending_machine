// index.ts
import express from 'express';
import vendingMachineRoutes from '../src/routes/VendingMachineRoutes.js';
const app = express();
app.use(express.json());
app.use('/api/vending-machine', vendingMachineRoutes);
const PORT = 3032;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app;
