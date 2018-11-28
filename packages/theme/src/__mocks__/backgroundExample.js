import React from 'react';
import styled from 'styled-components';
import { backgroundStyle } from '../util';

const StyledDiv = styled.div`
  ${backgroundStyle};
`;

// eslint-disable-next-line import/prefer-default-export
export const MockWrapper = props => <StyledDiv {...props} />;
