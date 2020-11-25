# Hosted Fields
A Braintree Hosted Fields Integration utilizing [node.js](https://nodejs.org/en/)

## Installation
Use [npm](https://www.npmjs.com/) to install dependencies
```
npm install
```

Input API credentials in a .env file
```
BT_ENVIRONMENT='Sandbox' OR 'Production'
BT_MERCHANT_ID='your_merchant_ID'
BT_PUBLIC_KEY='your_public_key'
BT_PRIVATE_KEY='your_private_key'
```

Start server on localhost:3000
```
npm start
```

## Usage
Navigate to localhost:3000 to access payment screen

Navigate to localhost:3000/transactions to view transaction history over the last 90 days
