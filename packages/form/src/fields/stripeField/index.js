import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import { injectStripe, CardElement } from 'react-stripe-elements';
import Stripe from './stripe';
import { inputStyle } from '../textField';
import { stripeStyle } from './styles';

const Wrapper = styled(Box)`
  ${inputStyle};
`;

const Card = props => {
  const [completed, setCompleted] = React.useState(false);

  const getStripeToken = () => {
    props.onWaiting('Establishing secure payment token');
    props.fieldUtils.setFieldError(props.name, null);
    props.stripe.createToken({ name: 'Some User' }).then(({ token }) => {
      props.onWaiting(false);

      props.fieldUtils.setFieldValue(props.name, token.id);
    });
  };

  const setEntryStatus = stripeEvent => {
    setCompleted(stripeEvent.complete);

    if (stripeEvent.complete) {
      getStripeToken();
    }
    if (stripeEvent.error) {
      props.fieldUtils.setFieldError(props.name, 'Incomplete payment details');
    }
  };

  const checkStatus = () => {
    if (!completed) {
      props.fieldUtils.setFieldError(props.name, 'Incomplete payment details');
    }
    props.onBlur();
  };

  return (
    <CardElement
      hidePostalCode
      style={stripeStyle}
      onBlur={checkStatus}
      onChange={stripeEvent => setEntryStatus(stripeEvent)}
      onFocus={() => {
        props.fieldUtils.setFieldTouched(props.name, true);
        props.onFocus();
      }}
    />
  );
};

const InjectedCard = injectStripe(Card);

const StripeField = props => {
  return (
    <Stripe>
      <Wrapper>
        <InjectedCard {...props} />
      </Wrapper>
    </Stripe>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onWaiting: PropTypes.func,
  setFieldTouched: PropTypes.func,
  setFieldError: PropTypes.func,
  setFieldValue: PropTypes.func,
  onBlur: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  stripe: PropTypes.object,
};

export default StripeField;
