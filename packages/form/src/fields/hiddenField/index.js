import React from 'react';

const HiddenField = ({ fieldUtils: _fieldUtils, error, ...inputProps }) => (
  <input {...inputProps} type="hidden" />
);

export default HiddenField;
