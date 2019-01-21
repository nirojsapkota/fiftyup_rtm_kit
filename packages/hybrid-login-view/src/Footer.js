import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import Img from '@rtm-ui/img';
import { Paragraph } from '@rtm-ui/typography';

const Wrapper = styled(Box)`
  display: flex;
  max-width: ${props => props.boxWidth};
`;

const Footer = ({ logoUrl, copyRightText, ...boxProps }) => {
  return (
    <Wrapper m="auto" {...boxProps}>
      <Img src={logoUrl} pl={[1, 2, 4]} alt="Footer logo" />
      <Paragraph my="auto" ml="auto" pr={[1, 2, 4]}>
        {copyRightText}
      </Paragraph>
    </Wrapper>
  );
};

Footer.propTypes = {
  logoUrl: t.string,
  copyRightText: t.string,
};

Footer.defaultProps = {
  copyRightText: '© 2019 RevTech Media',
};

export default Footer;
