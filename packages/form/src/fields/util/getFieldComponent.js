import RadioField from '../radioField';
import TextField from '../textField';
import NumberField from '../numberField';
import StripeField from '../stripeField';
import CheckboxField from '../checkboxField';
import AutocompletField from '../autocompleteField';

export const getFieldComponent = (
  type,
  { component = null, validator = null }
) => {
  return type === 'radio'
    ? RadioField
    : type === 'checkbox'
      ? CheckboxField
      : component === 'stripePayment'
        ? StripeField
        : component === 'autocomplete'
          ? AutocompletField
          : validator === 'mask'
            ? NumberField
            : TextField;
};
