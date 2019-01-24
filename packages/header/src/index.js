import React from 'react';
import PropTypes from 'prop-types';
import Logo from '@rtm-ui/logo';
import { Box } from '@rtm-ui/layout';
import styled from 'styled-components';

const Wrapper = styled(Box)``;

const Header = ({ logoUrl, entityBrand }) => (
  <Wrapper m="auto">
    <Logo customLogo={logoUrl} entityBrand={entityBrand} />
  </Wrapper>
);

Header.propTypes = {
  logoUrl: PropTypes.string,
  entityBrand: PropTypes.string,
};

export default Header;
