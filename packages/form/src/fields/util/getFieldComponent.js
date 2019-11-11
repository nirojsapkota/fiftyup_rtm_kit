import AutocompletField from '../autocompleteField';
import CheckboxField from '../checkboxField';
import DropdownField from '../dropdownField';
import HiddenField from '../hiddenField';
import MonthField from '../monthField';
import NumberField from '../numberField';
import PanelCheckField from '../panelCheckField';
import PanelRadioField from '../panelRadioField';
import RadioField from '../radioField';
import StripeField from '../stripeField';
import TextField from '../textField';

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
              : component === 'dropdownfield'
                ? DropdownField
                : validator === 'mask'
                  ? NumberField
                  : TextField;
};
