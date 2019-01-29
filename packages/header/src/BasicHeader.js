import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from '@rtm-ui/icon';
import { Box } from '@rtm-ui/layout';
import styled from 'styled-components';

const Wrapper = styled(Box)`
  display: flex;
`;

const BasicHeader = ({ logoUrl, entityBrand, ...boxProps }) => (
  <Wrapper>
    <Box m="auto" {...boxProps}>
      <Logo customLogo={logoUrl} entityBrand={entityBrand} />
    </Box>
  </Wrapper>
);

BasicHeader.propTypes = {
  logoUrl: PropTypes.string,
  entityBrand: PropTypes.string,
};

export default BasicHeader;
