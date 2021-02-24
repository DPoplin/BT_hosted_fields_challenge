//jshint esversion: 6
require("dotenv").config();
const express = require('express');
const router = express.Router();
const braintree = require('braintree');


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
});


router.post('/', (req, res, next) => {
  const nonceFromTheClient = req.body.paymentMethodNonce;
  const newCustomer = gateway.customer.create({
    paymentMethodNonce: nonceFromTheClient,
    creditCard: {
      options: {
        verifyCard: true
      }
    }
  }, (err, result) => {
    if (result.success) {
      console.log(result);
      const paymentMethodToken = result.customer.paymentMethods[0].token;
      console.log(paymentMethodToken);
      const newTransaction = gateway.transaction.sale({
        amount: '10.00',
        paymentMethodToken: paymentMethodToken,
        options: {
          submitForSettlement: true
        }
      }, (error, result) => {
        if (result) {
          res.send(result);
        } else {
          res.status(500).send(error);
        }
      });
    } else if (!result.success) {
      console.log(result.status);
      res.send(result.status);
    } else {
      res.send(err);
    }
  });


});

module.exports = router;
