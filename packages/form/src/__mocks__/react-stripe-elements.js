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

const stripeEvent = e => {
  const value = e.target.value;
  if (value === '411111111111111') {
    return { complete: true };
  } else {
    return { error: true };
  }
};

export const CardElement = props => {
  return (
    <input
      onClick={props.onClick}
      onChange={e => props.onChange(stripeEvent(e))}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      data-testid="stripe-input"
      name="cc_token"
      type="text"
    />
  );
};
