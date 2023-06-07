# vending_machine API

This project is a Typescript REST API representing a basic vending machine capable of keeping track of products and coins. It allows regular users to buy products and maintenance users to update product prices, adjust quantities, and manage coin quantities.

## Setup and Installation

1. Clone the repository:

```shell
git clone https://github.com/kimanilewis/vending_machine.git
```
2. Navigate to the project directory:

cd vending_machine

3. Install dependencies using npm:
  ```
  npm install 
  ```
4. Run the project
```
  npm start 
  ```

API Endpoints

#Regular User Endpoints

Buy a product:
POST /api/users/products/:productId/buy
```
Request body: { "coins": [ {"value": 10, "quantity": 2}, {"value": 25, "quantity": 1} ] }
Response: { "change": [ {"value": 10, "quantity": 1} ] }
```
#Maintenance User Endpoints

Set product price: 
PUT /api/maintenance/products/:productId/price
```
Request body: { "price": 50 }
Response: { "message": "Product price updated" }
```
Adjust product quantity: 
PUT /api/maintenance/products/:productId/quantity
```
Request body: { "quantity": 5 }
Response: { "message": "Product quantity updated" }
```

Update coin quantity: 
PUT /api/maintenance/coins/:coinValue/quantity
```
Request body: { "quantity": 100 }
Response: { "message": "Coin quantity updated" }
```
