import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { useScript } from './useScript';

const Stripe = ({ apiKey, children }) => {
  const [loaded, error] = useScript('https://js.stripe.com/v3/');

  let stripe = null;
  if (loaded && window.Stripe) {
    stripe = window.Stripe(apiKey);
  }

  if (error) {
    return (
      <div data-testid="stripe-load-error">Unable to load payment gateway</div>
    );
  }

  return (
    <StripeProvider stripe={stripe}>
      <Elements
        fonts={[
          {
            family: 'MuseoSans',
            src: `url(https://fonts.resources.revtech.media/museosans_500-webfont.woff)`,
          },
          {
            family: 'Museo',
            src: `url(https://fonts.resources.revtech.media/museo_500-webfont.woff)`,
          },
        ]}
      >
        {children}
      </Elements>
    </StripeProvider>
  );
};

export default Stripe;
