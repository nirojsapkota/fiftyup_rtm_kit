import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography'
// import { Box } from '@rtm-ui/layout'

const Footer = ({children}) => <div>{children}</div>;

Footer.propTypes = {
  children: PropTypes.node
};

export default Footer;
