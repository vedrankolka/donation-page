import {useEffect, useState} from 'react';
import fingerGuns from './img/FingerGuns.png'

function Completion(props) {
  const [ messageBody, setMessageBody ] = useState('');
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
    });
  }, [stripePromise]);

  return (
    <>
      <h1>Thanks!</h1>
      <div><img alt="FingerGuns.png" src={fingerGuns} width="240" height="140"/></div>
      <a href="/">home</a>
    </>
  );
}

export default Completion;
