import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography'
// import { Box } from '@rtm-ui/layout'

const Entity = ({children}) => <div>{children}</div>;

Entity.propTypes = {
  children: PropTypes.node
};

export default Entity;
