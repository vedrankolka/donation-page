import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

function Payment(props) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');
  const backendAddress = process.env.REACT_APP_DONATION_SERVER_URL

  const [ searchParams, setSearchParams ] = useSearchParams();
  var amountInEUR = searchParams.get('amount');
  // set amount in cents
  var amount = parseInt(amountInEUR) * 100;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(backendAddress + "/create-payment-intent?amount=" + amount)
      .then((res) => res.json())
      .then(({clientSecret}) => setClientSecret(clientSecret));
  }, [amount, backendAddress]);

  return (
    <>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
          <CheckoutForm id="checkout-form"/>
        </Elements>
      )}
    </>
  );
}

export default Payment;
