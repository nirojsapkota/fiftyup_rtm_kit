import React from 'react';
import PropTypes from 'prop-types';
import { Tracker } from '@rtm-ui/tracker';
import { StyledButton, WrapperButton } from './style';

export const Base = ({
  track,
  onClick,
  children,
  asWrapper,
  ...buttonProps
}) => {
  const Component = asWrapper ? WrapperButton : StyledButton;

  return track ? (
    <Tracker
      render={trackEvent => (
        <Component onClick={() => trackEvent(track, onClick)} {...buttonProps}>
          {children}
        </Component>
      )}
    />
  ) : (
    <Component onClick={onClick} {...buttonProps}>
      {children}
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
