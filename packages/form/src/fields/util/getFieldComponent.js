import RadioField from '../radioField';
import TextField from '../textField';
import NumberField from '../numberField';
import StripeField from '../stripeField';
import CheckboxField from '../checkboxField';
import AutocompletField from '../autocompleteField';
import HiddenField from '../hiddenField';
import PanelCheckField from '../panelCheckField';
import PanelRadioField from '../panelRadioField';
import MonthField from '../monthField';

export const getFieldComponent = (
  type,
  { component = null, validator = null }
) => {
  return type === 'radio'
    ? component === 'panelRadio'
      ? PanelRadioField
      : RadioField
    : type === 'checkbox'
    ? component === 'panelCheck'
      ? PanelCheckField
      : CheckboxField
    : component === 'month'
    ? MonthField
    : type === 'hidden'
    ? HiddenField
    : component === 'stripePayment'
    ? StripeField
    : component === 'autocomplete'
    ? AutocompletField
    : validator === 'mask'
    ? NumberField
    : TextField;
};
