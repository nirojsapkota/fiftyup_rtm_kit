import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label } from '@rtm-ui/typography';
import Button, { ButtonGroup } from '@rtm-ui/button';
import { focusStyle } from '../textField';

const StyledButton = styled(Button)`
  ${focusStyle};
  display: flex;
  align-items: center;
`;

const BaseRadioCheckboxField = ({ options, name, ...rest }) => {
  return (
    <ButtonGroup py={2}>
      {options.map(option => (
        <StyledButton
          key={option.value}
          name={name}
          value={option.value}
          aria-labelledby={`${name}_${option.value}-label`}
          role="radio"
          id={`${name}_${option.value}`}
          asWrapper
          type="button"
          onClick={() => rest.onClick(name, option.value, rest.value)}
        >
          {rest.icon({ itemValue: option.value, fieldValue: rest.value })}
          <Label
            id={`${name}_${option.value}-label`}
            htmlFor={`${name}_${option.value}`}
            pl={10}
            pr={20}
          >
            {option.label}
          </Label>
        </StyledButton>
      ))}
    </ButtonGroup>
  );
};

BaseRadioCheckboxField.propTypes = {
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

export default BaseRadioCheckboxField;
