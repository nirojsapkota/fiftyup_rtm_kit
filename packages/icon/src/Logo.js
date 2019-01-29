import React from 'react';
import t from 'prop-types';
import Img from '@rtm-ui/img';
import styled from 'styled-components';
import InlineSvg from './InlineSvg';
import SvgWrapper from './SvgWrapper';
import { Glyph } from './Icon';

const StyledSvgWrapper = styled(SvgWrapper)`
  display: inline-block;
`;

const Logo = ({ customLogo, entityBrand }) => {
  if (entityBrand === 'ninesaver') {
    return (
      <StyledSvgWrapper size={32} width={132} height={57} position="relative">
        <InlineSvg
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="1.414"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="title"
          viewBox="0 0 150 37"
          preserveAspectRatio="xMidYMid meet"
          fill="primary"
          fit
          className="logo"
        >
          <title id="title">logo</title>
          <Glyph glyph="ninesaver-logo" />
        </InlineSvg>
      </StyledSvgWrapper>
    );
  }

  // FIXME: workaround for load outside image
  if (customLogo) {
    return <Img src={customLogo} alt="logo" />;
  }

  // FIXME: need update for load svg of obs or fiftyup
  return null;
};

Logo.propTypes = {
  customLogo: t.string,
  entityBrand: t.string,
};

export default Logo;
