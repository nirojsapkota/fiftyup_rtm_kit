import React from 'react';
import PropTypes from 'prop-types';
import Logo from '@rtm-ui/logo';
import { Box } from '@rtm-ui/layout';

const Header = ({ logoUrl, entityBrand }) => (
  <Box m="auto">
    <Logo customLogo={logoUrl} entityBrand={entityBrand} />
  </Box>
);

Header.propTypes = {
  logoUrl: PropTypes.string,
  entityBrand: PropTypes.string,
};

export default Header;
