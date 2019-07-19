import React from 'react';
import { Text } from './text';

const Paragraph = props => <Text color="text" {...props} tag="p" />;

const defaultBodyProps = {
  weight: 'normal',
  color: 'text',
};

Paragraph.defaultProps = defaultBodyProps;

export default Paragraph;
