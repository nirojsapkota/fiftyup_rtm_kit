import React from 'react';
import { Text } from './text';

const Paragraph = props => <Text color="text" {...props} tag="p" />;

const defaultBodyProps = {
  align: 'left',
  weight: 'normal',
};

Paragraph.defaultProps = defaultBodyProps;

export default Paragraph;
