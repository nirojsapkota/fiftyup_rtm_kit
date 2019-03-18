import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Paragraph } from '@rtm-ui/typography';
import { getColor } from '@rtm-ui/theme';

const PendantWrapper = styled(Box)`
  background: ${props => getColor('secondary', props.theme)};
  position: relative;
  width: 80%;
  margin-top: -10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  p {
    color: ${props => getColor('inverseText', props.theme)};
    font-size: 14px;
  }
`;

const PositionWrapper = styled(Box)`
  position: relative;
`;

export const PendantPositioner = props => (
  <PositionWrapper>{props.children}</PositionWrapper>
);

const Pendant = ({ children, ...props }) => (
  <PendantWrapper {...props}>
    <Paragraph align="left" p="5px" weight="bold">
      {children}
    </Paragraph>
  </PendantWrapper>
);

export default Pendant;

Pendant.propTypes = {
  children: t.string.isRequired,
};
PendantPositioner.propTypes = {
  children: t.node,
};
