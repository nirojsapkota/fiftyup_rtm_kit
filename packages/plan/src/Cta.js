import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from '@rtm-ui/layout';

const StyledCard = styled(Card)`
  display: inherit;
`;

const Cta = ({ children }) => {
  return <StyledCard my={2}>{children}</StyledCard>;
};

export default Cta;

Cta.propTypes = {
  children: PropTypes.node,
};
