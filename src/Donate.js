import './Donate.css';
import React from 'react';
import { Link } from 'react-router-dom';
import pleaseDonate from './img/PleaseDonate.jpeg'
import FormControl from '@mui/material/FormControl'
import { FormHelperText, InputAdornment, OutlinedInput } from '@mui/material';

function Donation(props) {

    const [ amount, setAmount ] = React.useState("10")

    const handleChange = event => {
        setAmount(event.target.value)
    }
    
    return (
        <div className="Donation">
            <h1>Donation</h1>
            <h4>Please consider donating to HustleCoupleOfficial. <Link to="/about">About</Link></h4>
            <div>
                <img alt="PleaseDonate.jpeg" src={pleaseDonate} width="240" height="140"/>
            </div>
            <div>
                <FormControl  variant="outlined">
                <FormHelperText id="amount-helper-text">amount</FormHelperText>
                    <OutlinedInput
                        id="donation-amount"
                        onChange={handleChange}
                        endAdornment={<InputAdornment position="end">HRK</InputAdornment>}
                        aria-describedby="amount-helper-text"
                        inputProps={{
                        'aria-label': 'amount',
                        }}
                    />
                    
                    </FormControl>
                </div>
            <Link to={"/payment?amount=" + amount} className="DonationLink">Donate</Link>

        </div>
    )
}

export default Donation;