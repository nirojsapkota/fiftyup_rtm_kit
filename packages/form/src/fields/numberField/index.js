import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';
import maskPatterns, { pipes } from '../util/maskPatterns';
import { inputStyle } from '../textField';

// const StyledInput = styled(MaskedInput)`
//   ${inputStyle};
// `;
const StyledInput = styled(({ showErrorColor, ...rest }) => (
  <MaskedInput {...rest} />
))`
  ${inputStyle};
`;

const NumberField = ({
  config: { mask },
  fieldUtils: _fieldUtils,
  onWaiting: _onWaiting,
  ...inputProps
}) => {
  return (
    <StyledInput
      mask={maskPatterns[mask]}
      pipe={pipes[mask]}
      guide={false}
      {...inputProps}
    />
  );
};

NumberField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default NumberField;
