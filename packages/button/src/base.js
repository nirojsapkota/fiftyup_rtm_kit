import React from 'react';
import PropTypes from 'prop-types';
import { Tracker } from '@rtm-ui/tracker';
import { StyledButton, WrapperButton, ContentWrapper, ButtonLink } from './style';

export const Base = ({
  track,
  onClick,
  children,
  asWrapper,
  block,
  ...buttonProps
}) => {
  const Component = asWrapper ? WrapperButton : buttonProps.as === 'a' ? ButtonLink : StyledButton;

  const content = asWrapper || buttonProps.as === 'a' ? <React.Fragment>{children}</React.Fragment> : <ContentWrapper>{children}</ContentWrapper>;

  return track ? (
    <Tracker
      render={trackEvent => (
        <Component block={block} onClick={() => trackEvent(track, onClick)} {...buttonProps}>
          {content}
        </Component>
      )}
    />
  ) : (
      <Component block={block} onClick={onClick} {...buttonProps}>
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
