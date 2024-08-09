import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51PlypHP3r7cZXzMpybermuvDWgXuC1xZwQtKYd0NXOC9ExusXSilMOsYuv5RlPzTqmm7asB0Oxuorxta3ZYavCpA003qICswq1'); 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
