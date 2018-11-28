import React from 'react';
import { Text } from './text';

const Header = props => <Text {...props} />;

Header.defaultProps = {
  tag: 'h1',
  align: 'left',
  weight: 'bold',
  color: 'primary',
  font: 'sansSerif',
  scale: 1,
};

export default Header;
