import './App.css';
import Payment from './Payment'
import Completion from './Completion'
import About from './About'

import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {loadStripe} from '@stripe/stripe-js';
import Donation from './Donate';

function App() {
  const [ stripePromise, setStripePromise ] = useState(null);
  const backendAddress = process.env.REACT_APP_DONATION_SERVER_URL
  console.log(backendAddress)

  useEffect(() => {
    fetch(backendAddress + "/config").then(async (r) => {
      if (!r.ok) {
        console.log("Response is not OK: " + r.message);
      }

      const { publishableKey } = await r.json();
      console.log("PUBLISHABLE_KEY = " + publishableKey);
      setStripePromise(loadStripe(publishableKey));
    })
    .catch(error => {
      console.error("Shiii: " + error)
    });
  }, [backendAddress]);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Donation/>} />
          <Route path="/payment" element={<Payment stripePromise={stripePromise} />} />
          <Route path="/completion" element={<Completion stripePromise={stripePromise} />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
