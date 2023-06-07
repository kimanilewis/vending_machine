"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const VendingMachineRoutes_js_1 = __importDefault(require("../src/routes/VendingMachineRoutes.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/vending-machine', VendingMachineRoutes_js_1.default);
const PORT = 3032;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app;
