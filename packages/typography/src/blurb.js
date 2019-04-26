import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Theme as Variant, backgroundStyle, getColor } from '@rtm-ui/theme';
import Header from './header';
import Paragraph from './paragraph';

const Wrapper = styled.div`
  background: ${props => getColor('background', props.theme)};
  ${backgroundStyle};

  ${props =>
    props.fillContainer &&
    css`
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        ${backgroundStyle};
      }
    `};
`;

export const Blurb = ({
  fillContainer,
  variant,
  header,
  body,
  right,
  center,
  ...rest
}) => {
  const align = right ? 'right' : center ? 'center' : 'left';
  const textProps = { align, ...rest };
  return (
    <Variant variant={variant}>
      <Wrapper fillContainer={fillContainer} flexDirection="column">
        <Box py={[2]} px={[2, 3]}>
          {header && (
            <Header tag={rest.tag || 'h5'} weight="bold" {...textProps}>
              {header}
            </Header>
          )}
          {body && <Paragraph {...textProps}>{body}</Paragraph>}
        </Box>
      </Wrapper>
    </Variant>
  );
};

Blurb.propTypes = {
  fillContainer: PropTypes.bool,
  header: PropTypes.string,
  body: PropTypes.string,
  right: PropTypes.bool,
  center: PropTypes.bool,
  variant: PropTypes.string,
};

Blurb.defaultProps = {
  variant: 'a',
};
