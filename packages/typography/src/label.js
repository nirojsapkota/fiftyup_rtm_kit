import React from 'react';
import { Text } from './text';

const Label = props => <Text color="text" {...props} tag="label" />;

const defaultBodyProps = {
  align: 'left',
  weight: 'normal',
};

Label.defaultProps = defaultBodyProps;

export default Label;
