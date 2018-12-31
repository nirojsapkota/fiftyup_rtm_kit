import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paragraph } from '@rtm-ui/typography';

const StyledParagraph = styled(Paragraph)`
  background: inherit;
`;

const Disclaimer = () => {
  return (
    <StyledParagraph p={30}>
      * Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
      ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel
      facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
      suspendisse ultrices gravida.{' '}
    </StyledParagraph>
  );
};

export default Disclaimer;
