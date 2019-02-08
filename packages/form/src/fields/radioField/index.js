import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Label } from '@rtm-ui/typography';
import { RadioInput } from './radioInput';

const StyledLabel = styled(Label)`
  cursor: pointer;
`;

const InputWrapper = props => (
  <Box>
    <RadioInput {...props} />
  </Box>
);

const Options = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

const LabelAndInput = styled(Box)`
  display: flex;
  align-items: center;
  min-width: 100px;
`;

const handleClick = (event, setFieldValue, name, value, isDisabled) => {
  event.preventDefault();
  if (!isDisabled) {
    setFieldValue(name, value);
  }
};

const RadioField = ({ options, name, ...rest }) => {
  return (
    <Options py={2}>
      {options.map(option => (
        <LabelAndInput key={option.value}>
          <InputWrapper
            {...option}
            {...rest}
            value={option.value}
            name={name}
            selected={rest.value === option.value}
            disabled={rest.disabled}
            id={`${name}_${option.value}`}
            onClick={e =>
              handleClick(
                e,
                rest.setFieldValue,
                name,
                option.value,
                rest.disabled
              )
            }
          />
          <StyledLabel
            px={2}
            onClick={e =>
              handleClick(
                e,
                rest.setFieldValue,
                name,
                option.value,
                rest.disabled
              )
            }
            htmlFor={`${name}_${option.value}`}
          >
            {option.label}
          </StyledLabel>
        </LabelAndInput>
      ))}
    </Options>
  );
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
