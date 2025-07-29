import express from "express"; 
import Stripe from "stripe";
 
const router = express.Router(); 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use environment variable   

router.post("/", async (req, res) => {
  try { 
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
