import React from 'react';
import { Text } from './text';

const Header = props => <Text color="primary" {...props} />;

Header.defaultProps = {
  tag: 'h1',
  weight: 'bold',
  color: 'primary',
  font: 'sansSerif',
};

export default Header;
