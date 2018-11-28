import React from 'react';
import { Text } from './text';

const Small = props => <Text {...props} tag="small" />;

const defaultBodyProps = {
  align: 'left',
  weight: 'normal',
};

Small.defaultProps = defaultBodyProps;

export default Small;
