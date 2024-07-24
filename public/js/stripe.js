/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe('pk_test_51PdQlTH17ql1yV7OxcMuh5kU3ohvDDSSQbJONntWjjBN6fsuY8U8YGtpOlqrYPqUOH1lXkEHpjRyXJrbMwGXmpf700yGofCPqs');
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
