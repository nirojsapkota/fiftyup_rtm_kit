import React from 'react';

export const injectStripe = component => {
  component.defaultProps = {
    stripe: {
      createToken: async () => {
        return { token: { id: 'tok_123' } };
      },
    },
  };
  return component;
};

export const StripeProvider = props => {
  return props.children;
};

export const Elements = props => {
  return props.children;
};

const stripeEvent = { error: true };

export const CardElement = props => {
  return (
    <input
      onClick={props.onClick}
      onChange={() => props.onChange(stripeEvent)}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      data-testid="stripe-input"
      name={props.name}
      type="text"
    />
  );
};
