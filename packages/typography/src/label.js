import React from 'react';
import { Text } from './text';

const Label = props => <Text color="text" {...props} tag="label" />;

const defaultBodyProps = {
  weight: 'normal',
  color: 'text',
};

Label.defaultProps = defaultBodyProps;

export default Label;
