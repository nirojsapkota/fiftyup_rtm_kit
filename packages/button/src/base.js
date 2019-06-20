import React from 'react';
import PropTypes from 'prop-types';
import { Tracker } from '@rtm-ui/tracker';
import { StyledButton, WrapperButton, ContentWrapper } from './style';

export const Base = ({
  track,
  onClick,
  children,
  asWrapper,
  block,
  ...buttonProps
}) => {
  const Component = asWrapper ? WrapperButton : StyledButton;

  return track ? (
    <Tracker
      render={trackEvent => (
        <Component onClick={() => trackEvent(track, onClick)} {...buttonProps}>
          <ContentWrapper block={block}>
           {children}
          </ContentWrapper>          
        </Component>
      )}
    />
  ) : (
    <Component onClick={onClick} {...buttonProps}>
      <ContentWrapper block={block}>
       {children}
      </ContentWrapper> 
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
