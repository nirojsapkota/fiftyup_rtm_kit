import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Icon } from '@rtm-ui/icon';
import BaseRadioCheckboxField from '../baseRadioCheckboxField';

const IconContainer = styled(Box)`
  position: relative;
`;

const AbsoluteIcon = styled(Box)`
  position: absolute;
  left: 0;
`;

const CheckboxField = ({
  config: _config,
  fieldUtils: { setFieldValue },
  ...props
}) => {
  const isSingle = props.options.length === 1;
  return (
    <BaseRadioCheckboxField
      {...props}
      onClick={(name, value, fieldValues) => {
        isSingle
          ? setFieldValue(name, fieldValues === '' ? value : '')
          : setFieldValue(
            name,
            fieldValues.includes(value)
              ? fieldValues.filter(fieldValue => fieldValue !== value)
              : [...fieldValues, value]
          );
      }}
      icon={({ itemValue, fieldValue }) => {
        return (
          <IconContainer>
            <AbsoluteIcon>
              <Icon size={22} glyph="box" />
            </AbsoluteIcon>
            <Icon
              size={22}
              glyph={fieldValue.includes(itemValue) ? 'check' : 'void'}
            />
          </IconContainer>
        );
      }}
    />
  );
};

CheckboxField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default CheckboxField;
