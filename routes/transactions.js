var express = require('express');
var router = express.Router();
const braintree = require('braintree');
const stream = require('stream');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
});


const today = new Date();
const minusNinetyDays = new Date();
minusNinetyDays.setDate(today.getDate() - 90);

const writableStream = stream.Writable({objectMode: true});
writableStream._write = (chunk, enc, next) => {
  next();
};

function getTransactions() {
  let transactions = [];
  let transactionTotal = 0;

  const stream = gateway.transaction.search((search) => {
    search.createdAt().min(minusNinetyDays);
  });

  stream.on("data", (transaction) => {
  transactions.push({
    id: transaction.id,
    amount: transaction.amount,
    currency: transaction.currencyIsoCode,
    date: transaction.createdAt
  })
  transactionTotal += parseFloat(transaction.amount);
  });

  stream.on("end", (response) => {
    console.log(transactions);
   res.render('transactions', {transactions: transactions, transactionTotal: transactionTotal});
  });

  stream.resume();
}
// //testing space
router.get('/', function(req, res, next) {
let transactions = [];
let transactionTotal = 0;

const stream = gateway.transaction.search((search) => {
  search.createdAt().min(minusNinetyDays);
});

stream.on("data", (transaction) => {
transactions.push({
  id: transaction.id,
  amount: transaction.amount,
  status:transaction.status,
  currency: transaction.currencyIsoCode,
  date: transaction.createdAt
})
transactionTotal += parseFloat(transaction.amount);
});

stream.on("end", (response) => {
  console.log(transactions);
 res.render('transactions', {transactions: transactions, transactionTotal: transactionTotal});
});

stream.resume();
});

router.get('/transactions', function(req, res, next) {
  let transactions = [];
  let transactionTotal = 0;

  const stream = gateway.transaction.search((search) => {
    search.createdAt().min(minusNinetyDays);
  });

  stream.on("data", (transaction) => {
  transactions.push({
    id: transaction.id,
    amount: transaction.amount,
    currency: transaction.currencyIsoCode,
    date: transaction.createdAt
  })
  transactionTotal += parseFloat(transaction.amount);
  });

  stream.on("end", (response) => {
    console.log(transactions);
   res.render('transactions', {transactions: transactions, transactionTotal: transactionTotal});
  });

  stream.resume();
// getTransactions();
})

module.exports = router;
