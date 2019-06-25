import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@rtm-ui/button';
import { Box } from '@rtm-ui/layout';
import { focusStyle } from '../textField';

const StyledButton = styled(Button)`
  ${focusStyle};
  display: flex;
  align-items: flex-start;
  flex: 1;
  width: ${props => props.optionWidth}%;
  min-width: 120px;
  & > * {
    width: 100%;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

const BasePanelRadioCheckboxField = ({
  options,
  name,
  columns = 3,
  ...rest
}) => {
  const optionWidth = 100 / columns;
  return (
    <Wrapper py={10}>
      {options.map(option => (
        <StyledButton
          optionWidth={optionWidth}
          key={option.value}
          name={name}
          value={option.value}
          aria-labelledby={`${name}_${option.value}-label`}
          role="radio"
          id={`${name}_${option.value}`}
          data-testid={`${rest.type}-${name}_${option.value}`}
          asWrapper
          type="button"
          onClick={() => rest.onClick(name, option.value, rest.value)}
        >
          {rest.children({ option, name, fieldValue: rest.value })}
        </StyledButton>
      ))}
    </Wrapper>
  );
};

BasePanelRadioCheckboxField.propTypes = {
  autoComplete: PropTypes.string,
  icon: PropTypes.func,
  name: PropTypes.string,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default BasePanelRadioCheckboxField;
