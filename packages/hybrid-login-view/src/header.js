import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from '@rtm-ui/icon';
import { Box } from '@rtm-ui/layout';
import styled, { ThemeContext } from 'styled-components';

const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BasicHeader = ({ ...boxProps }) => {
  const theme = React.useContext(ThemeContext);
  return (
    <Wrapper {...boxProps}>
      <Logo width={175} entityBrand={theme.logoGlyph} />
    </Wrapper>
  );
};

BasicHeader.propTypes = {
  logoUrl: PropTypes.string,
  entityBrand: PropTypes.string,
};

export default BasicHeader;
