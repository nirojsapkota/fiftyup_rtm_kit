import React from 'react';
import PropTypes from 'prop-types';
import { useTracker } from '@rtm-ui/tracker';
import { generateAbsoluteUrl } from '@rtm-ui/layout';
import {
  StyledButton,
  WrapperButton,
  ContentWrapper,
  ButtonLink,
} from './style';

export const Base = ({
  track,
  onClick,
  children,
  asWrapper,
  block,
  href,
  ...buttonProps
}) => {
  const { ref, trackEvent } = useTracker();
  const Component = asWrapper
    ? WrapperButton
    : buttonProps.as === 'a'
    ? ButtonLink
    : StyledButton;

  const content =
    asWrapper || buttonProps.as === 'a' ? (
      <React.Fragment>{children}</React.Fragment>
    ) : (
      <ContentWrapper>{children}</ContentWrapper>
    );

  let absoluteUrl = href;
  if (href) {
    absoluteUrl = generateAbsoluteUrl(href);
  } else {
    absoluteUrl = href;
  }

  return (
    <Component
      ref={ref}
      block={block}
      onClick={e => trackEvent(e, track, onClick)}
      href={absoluteUrl}
      {...buttonProps}
    >
      {content}
    </Component>
  );
};

Base.propTypes = {
  track: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  block: PropTypes.bool,
  asWrapper: PropTypes.bool,
};
