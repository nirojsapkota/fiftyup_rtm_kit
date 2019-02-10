import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

class Stripe extends React.Component {
  state = { stripe: null };

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe('pk_test_82Xn9YM3wF2LVCLD0kPewINf'),
      });
    } else {
      const stripeScript = document.querySelector('#stripe-js');

      if (stripeScript) {
        stripeScript.addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({
            stripe: window.Stripe('pk_test_82Xn9YM3wF2LVCLD0kPewINf'),
          });
        });
      }
    }
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
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
          {this.props.children}
        </Elements>
      </StripeProvider>
    );
  }
}

export default Stripe;
