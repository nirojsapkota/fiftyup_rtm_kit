import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const TextField = ({ config: _config, fieldUtils: _fieldUtils, ...props }) => (
  <S.Input {...props} />
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
