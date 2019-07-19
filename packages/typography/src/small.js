import React from 'react';
import { Text } from './text';

const Small = props => <Text color="text" {...props} tag="small" />;

const defaultBodyProps = {
  weight: 'normal',
  color: 'text',
};

Small.defaultProps = defaultBodyProps;

export default Small;
