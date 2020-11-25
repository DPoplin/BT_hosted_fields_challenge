require("dotenv").config();
var express = require('express');
var router = express.Router();
const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
  });

var clientToken;

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/clientToken')
})

router.get('/clientToken', (req, res) => {
  gateway.clientToken.generate({})
  .then(response => {
    clientToken = response.clientToken;
    return clientToken;
  }).then(clientToken => {
    res.render('index', {clientToken: clientToken});
  })

  });



module.exports = router;
