const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const createCheckoutSession = async (productId: string, price: number, productName: string) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/rate-pay',
      cancel_url: 'http://localhost:3000/rate-pay',
    });

    return {
      id: session.id,
      url: session.url,
    };
  } catch (error) {
    throw new Error('Error creating Checkout Session: ' + error.message);
  }
};
