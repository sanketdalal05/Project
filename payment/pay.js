const express = require('express');
const Stripe = require('stripe')
const app = express();

  const port = 4545;
  const stripe = Stripe('sk_test_51J9S8oSF819buh81zq9HIFpFUMeB14LM70A7dkiA3gUtFHDg0SHugz1mZIvtscsegtOXUtzihwtdAO6LMHij2hvc00cLqaCyGy')
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.post('/', async (req, res)=>{
  try{
          const am = req.body.amount * 100;
          const email = req.body.email;
  
          await stripe.charges.create({
              amount: am,
              currency: "INR",
              source: "tok_mastercard",
          }, function (err, result) {
              console.log(result.receipt_url)
              res.send(`payment succesfull for ${email} of ${result.amount / 100}​​​​​​​​rs transaction id is ${result.balance_transaction}​​​​​​​​ you can check receipt at ${result.receipt_url}​​​​​​​​`);
          })
  
      } catch (err) {
          console.log(err);
      } 
  })
  
app.listen(4545, function() {
    console.log('listening on 4545');
  })