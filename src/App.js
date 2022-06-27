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

  useEffect(() => {
    fetch("/config").then(async (r) => {
      if (!r.ok) {
        console.log("Response is not OK: " + r.message);
      }

      const { publishableKey } = await r.json();
      console.log(publishableKey);
      setStripePromise(loadStripe(publishableKey));
    })
    .catch(error => {
      console.error("Shiii: " + error)
    });
  }, []);

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
