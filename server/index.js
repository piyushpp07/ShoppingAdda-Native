const express = require('express');
const SK = "sk_test_51JObFKSAm54TGSWjFYtH6uivWmQClLYDdXu51tCxOAn2eSNITrZWre6AjEUbQQ7kYh8dnJiq0mF0dSOOnpgK1WS900vfYdpnqV";
const stripe = require('stripe')(SK)
require('dotenv').config()
const PK = "pk_test_51JObFKSAm54TGSWjZQQVnpytQbBKaz7MqR7ewLtoeqZSsO9SZUl7n3ZZm3zEYV3sYmQnZaVbzZCttT3in6KJTxKS00lJalhL2a";



const app = express();
app.use(express.json());
//4000002500003155 success
//4000000000009995 INsufficient
app.get('/', (req, res) => { res.send("Hello Paymeny Server is Running") })

app.post('/payment', async (req, res) => {
   const {
      paymentMethod,
      currency,
      amount,
      desc
   } = req.body
   console.log(amount)
   try {
      const paymentIntent = await stripe.paymentIntents.create({
         currency: "inr",
         payment_method_types: [paymentMethod],
         amount: amount,
         description: `Purchased Products worth ${amount}`
      })
      res.json({ client_secret: paymentIntent.client_secret })
   }
   catch (error) {
      console.log(error.message)
   }
})
const port = 3000
app.listen(port, () => {
   console.log(`App listening at https://localhost:${port}`);
})

