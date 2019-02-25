import React from 'react';
import styled, { css } from 'styled-components';
import { getColor } from '@rtm-ui/theme';
import PropTypes from 'prop-types';

export const focusStyle = css`
  &:focus {
    z-index: 2;
    outline: none;
    box-shadow: inset 0 0 2px rgba(67, 90, 111, 0.18), inset 0 0 0 1px #579ad900,
      0 0 0 3px rgba(16, 112, 202, 0.07);
  }
`;

const disabledStyle = css`
  cursor: not-allowed;
  opacity: 0.5;
`;

export const inputStyle = css`
  padding: 8px 5px;
  font-family: Museo;
  color: ${props => `${getColor('text', props.theme)}`};
  font-size: 16px;
  border: none;
  border-bottom: 1px solid
    ${props =>
      `${getColor(props.showErrorColor ? 'error' : 'normal', props.theme)}`};
  display: block;
  width: 100%;
  ${props => props.disabled && disabledStyle};
  ${focusStyle};

  &::placeholder {
    color: ${props => `${getColor('normal', props.theme)}`};
  }
`;

const StyledInput = styled(({ showErrorColor, ...rest }) => (
  <input {...rest} />
))`
  ${inputStyle};
`;

const TextField = ({ config: _config, fieldUtils: _fieldUtils, ...props }) => (
  <StyledInput {...props} />
);

TextField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default TextField;
