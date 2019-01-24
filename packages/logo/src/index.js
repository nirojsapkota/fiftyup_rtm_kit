import React from 'react';
import styled from 'styled-components';
import t from 'prop-types';
import { InlineSvg, Glyph } from '@rtm-ui/icon';
import Img from '@rtm-ui/img';

const Logo = ({ customLogo, entityBrand }) => {
  if (entityBrand === 'ninesaver') {
    return (
      <SvgWrapper>
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
      </SvgWrapper>
    );
  }

  if (customLogo) {
    return <Img src={customLogo} alt="logo" />;
  }

  // FIXME: need update for load local logo or load svg for obs and fiftyup
  return null;
};

// TODO: This has static fixed dimension as of now
export const SvgWrapper = styled.span`
  display: inline-block;
  flex: 0 0 32px;
  width: 132px;
  height: 57px;
  position: relative;
  color: inherit;
`;

Logo.propTypes = {
  customLogo: t.string,
  entityBrand: t.string,
};

export default Logo;
