import React from 'react';
import { Text } from './text';

const Span = props => <Text {...props} tag="span" />;

const defaultBodyProps = {
  align: 'left',
  weight: 'normal',
};

Span.defaultProps = defaultBodyProps;

export default Span;
