import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Paragraph } from '@rtm-ui/typography';
import { Logo } from '@rtm-ui/icon';
import Variant from '@rtm-ui/theme';

const Wrapper = styled(Box)`
  display: flex;
  max-width: ${props => props.maxWidth}px};
`;

const LogoWrapper = styled(Box)`
  * {
    background: none;
  }
`;

const Footer = ({ logoUrl, copyRightText, entityBrand, ...boxProps }) => {
  return (
    <Wrapper m="auto" {...boxProps}>
      <LogoWrapper pl={[1, 2, 4]}>
        <Variant variant="b">
          <Logo customLogo={logoUrl} entityBrand={entityBrand} />
        </Variant>
      </LogoWrapper>
      <Paragraph my="auto" ml="auto" pr={[1, 2, 4]}>
        {copyRightText}
      </Paragraph>
    </Wrapper>
  );
};

Footer.propTypes = {
  logoUrl: t.string,
  copyRightText: t.string,
  entityBrand: t.string,
};

Footer.defaultProps = {
  copyRightText: '© 2019 RevTech Media',
};

export default Footer;
