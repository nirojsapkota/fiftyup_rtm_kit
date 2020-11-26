import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@rtm-ui/icon';
import BaseRadioCheckboxField from '../baseRadioCheckboxField';

const RadioField = ({
  config: _config,
  fieldUtils: { setFieldValue },
  ...props
}) => {
  const fillColorName = (itemValue, fieldValue) => {
    return fieldValue === itemValue ? 'primary' : 'slightlyDarker';
  };

  return (
    <BaseRadioCheckboxField
      {...props}
      onClick={(name, value) => setFieldValue(name, value)}
      icon={({ itemValue, fieldValue }) => (
        <Icon
          fill={fillColorName(itemValue, fieldValue)}
          size={22}
          glyph={fieldValue === itemValue ? 'radio-active' : 'radio'}
        />
      )}
    />
  )
};

RadioField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default RadioField;
