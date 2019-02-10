import React from 'react';
import { Text } from './text';

const Label = props => <Text {...props} tag="label" />;

const defaultBodyProps = {
  align: 'left',
  weight: 'normal',
};

Label.defaultProps = defaultBodyProps;

export default Label;
