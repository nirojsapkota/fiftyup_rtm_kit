import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography'
// import { Box } from '@rtm-ui/layout'

const Header = ({children}) => <div>{children}</div>;

Header.propTypes = {
  children: PropTypes.node
};

export default Header;
