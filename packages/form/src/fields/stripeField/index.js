import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import { injectStripe, CardElement } from 'react-stripe-elements';
import Stripe from './stripe';
import { inputStyle } from '../textField';

// TODO grab these from theme object via withTheme()
const style = {
  base: {
    color: '#565656',
    letterSpacing: '0.025em',
    fontFamily: 'MuseoSans',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#9e2146',
  },
};

const Wrapper = styled.div`
  ${inputStyle};
`;

class Card extends React.Component {
  state = {
    complete: false,
  };

  getStripeToken = async () => {
    this.props.setFieldError(this.props.name, null);
    // TODO: grab the username or id and use it here
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      this.props.onWaiting();

      this.props.setFieldValue(this.props.name, token.id);
    });
  };

  setEntryStatus = stripeEvent => {
    // TODO: grab the error from stripeEvent.error and pass it up
    this.setState({ complete: stripeEvent.complete });

    if (stripeEvent.complete) {
      this.getStripeToken();
    }
  };

  checkStatus = () => {
    if (this.state.complete) {
      this.getStripeToken();
    } else {
      this.props.setFieldError(this.props.name, 'Incomplete payment details');
    }
    this.props.onBlur();
  };

  render() {
    return (
      <CardElement
        hidePostalCode
        style={style}
        onBlur={this.checkStatus}
        onChange={stripeEvent => this.setEntryStatus(stripeEvent)}
        onFocus={() => {
          this.props.setFieldTouched(this.props.name, true);
          this.props.onFocus();
        }}
      />
    );
  }
}

const InjectedCard = injectStripe(Card);

const InputWrapper = props => {
  return (
    <Stripe>
      <Box>
        <Wrapper>
          <InjectedCard {...props} />
        </Wrapper>
      </Box>
    </Stripe>
  );
};

const StripeField = props => {
  return <InputWrapper {...props} />;
};

Card.propTypes = {
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onWaiting: PropTypes.func,
  setFieldTouched: PropTypes.func,
  setFieldError: PropTypes.func,
  setFieldValue: PropTypes.func,
  onBlur: PropTypes.func,
  stripe: PropTypes.objectOf({
    createToken: PropTypes.func,
  }),
};

export default StripeField;
