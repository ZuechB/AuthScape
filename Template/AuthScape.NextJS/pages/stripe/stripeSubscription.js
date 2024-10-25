import React, {useEffect, useState} from 'react';
import { Box } from '@mui/system';

// import StripePayment from '../../components/stripe/wallet';
import Subscription from '../../components/stripe/subscription';

export default function Home({currentUser}) {

//   const [paymentLink, setPaymentLink] = useState("");

  return (
    <Box>
      <Box>
          Stripe Subscription
      </Box>
      <Box>
          <Subscription
            currentUser={currentUser} // if you want to attach to a users account
            amount={20.00}
            onResponse={async (response, id, paymentMethod) => {

                switch (response) {
                    case 'succeeded':
                        alert("succeeded: " + id + " paymentMethod: " + paymentMethod);
                    break;

                    case 'paid':
                        alert("paid: " + " paymentIntent: " + id);
                    break;
            
                    case 'processing':
                        alert("processing: " + id);
                    break;
            
                    case 'requires_payment_method':
                        alert("requires_payment_method");
                    break;
            
                    default:
                        alert("failed");
                    break;
                }
            }}
        />
      </Box>
    </Box>
  )
}
