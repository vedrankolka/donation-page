import './Donate.css';
import React from 'react';
import { Link } from 'react-router-dom';
import pleaseDonate from './img/PleaseDonate.jpeg'
import FormControl from '@mui/material/FormControl'
import { Button, FormHelperText, InputAdornment, OutlinedInput } from '@mui/material';

const minimumDonationAmount = 2;
const defaultDonationAmount = 10;

function Donation(props) {

    const [ amount, setAmount ] = React.useState("10")
    const handleChange = event => {
        if (event.target.value === "") {
            setAmount(defaultDonationAmount)
        } else {
            const newValue = Math.round(parseFloat(event.target.value) * 100) / 100
            setAmount(newValue)
        }
    }

    const [buttonText, setButtonText] = React.useState("Donate " + defaultDonationAmount + " EUR");

    React.useEffect(() => {
        if (amount > 0) {
            setButtonText("Donate " + amount + " EUR");
        } else {
            setButtonText("Donate");
        }
    }, [amount]);
    
    return (
        <div className="Donation">
            <h1>Donation</h1>
            <h4>Please consider donating to HustleCoupleOfficial. <Link to="/about">About</Link></h4>
            <div>
                <img alt="PleaseDonate.jpeg" src={pleaseDonate} width="240" height="140"/>
            </div>
            <div hidden={amount < minimumDonationAmount}><br/></div>
            <div hidden={amount === undefined || isNaN(amount) || amount >= minimumDonationAmount}>
                Because of fees, the minimum amount is {minimumDonationAmount} EUR.
            </div>
            <div>
                <FormControl  variant="outlined">
                <FormHelperText id="amount-helper-text">amount</FormHelperText>
                    <OutlinedInput
                        id="donation-amount"
                        onChange={handleChange}
                        endAdornment={<InputAdornment position="end">EUR</InputAdornment>}
                        aria-describedby="amount-helper-text"
                        inputProps={{
                            'aria-label': 'amount',
                        }}
                    />
                </FormControl>
                </div>
            <Button
                id="donate-button"
                variant="contained"
                disabled={amount === undefined || isNaN(amount) || amount < minimumDonationAmount}
                href={"/payment?amount=" + amount}>
                {buttonText}
            </Button>
        </div>
    )
}

export default Donation;