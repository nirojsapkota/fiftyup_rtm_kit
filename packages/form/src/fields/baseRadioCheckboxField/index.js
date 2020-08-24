import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label } from '@rtm-ui/typography';
import { Button, ButtonGroup } from '@rtm-ui/button';
import { focusStyle } from '../textField/styles';

const StyledButton = styled(Button)`
  ${focusStyle};
  display: flex;
  align-items: flex-start;
`;


const BaseRadioCheckboxField = ({ options, name, ...rest }) => {
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const isSingle = options.length === 1;
  return (
    <>
      <ButtonGroup py={2}>
        {options.map(option => (
          <StyledButton
            key={option.value}
            name={name}
            value={option.value}
            aria-labelledby={`${name}_${option.value}-label`}
            role="radio"
            id={`${name}_${option.value}`}
            data-testid={`${rest.type}-${name}_${option.value}`}
            asWrapper
            type="button"
            onClick={() => {
              if (isSingle) {
                setCheckboxValue(!checkboxValue);
                document.getElementById(`input-${name}`).value = !checkboxValue;
              }
              rest.onClick(name, option.value, rest.value);

            }}
          >
            {rest.icon({ itemValue: option.value, fieldValue: rest.value })}
            <Label
              id={`${name}_${option.value}-label`}
              htmlFor={`${name}_${option.value}`}
              pl={10}
              pr={20}
              pt="4px"
            >
              {option.label}
            </Label>
          </StyledButton>
        ))}
      </ButtonGroup>
      {isSingle && <input type="hidden" name={name} id={`input-${name}`} value={checkboxValue} />}
    </>
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
