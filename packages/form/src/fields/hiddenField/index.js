import React from 'react';

const HiddenField = ({ fieldUtils: _fieldUtils, ...inputProps }) => (
  <input {...inputProps} type="hidden" />
);

export default HiddenField;
