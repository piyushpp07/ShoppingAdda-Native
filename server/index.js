import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51JObFKSAm54TGSWjZQQVnpytQbBKaz7MqR7ewLtoeqZSsO9SZUl7n3ZZm3zEYV3sYmQnZaVbzZCttT3in6KJTxKS00lJalhL2a";
const SECRET_KEY = "sk_test_51JObFKSAm54TGSWjFYtH6uivWmQClLYDdXu51tCxOAn2eSNITrZWre6AjEUbQQ7kYh8dnJiq0mF0dSOOnpgK1WS900vfYdpnqV";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
   try {
      
      const paymentIntent = await stripe.paymentIntents.create({
         amount: 1099, //lowest denomination of particular currency
         currency: "usd",
         payment_method_types: ["card"], //by default
      });

      const clientSecret = paymentIntent.client_secret;

      res.json({
         clientSecret: clientSecret,
      });
   } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
   }
});