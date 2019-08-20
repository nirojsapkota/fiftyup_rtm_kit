import React from 'react';
import { Button } from '@rtm-ui/button';
import RequestCallback from './Action/RequestCallback';

export const PrimaryAction = props => {
  return props.track === 'request_call_back' ? (
    <RequestCallback
      {...props}
      isSubmitted={props.isPhonebackSubmitted}
      onSuccess={() => props.setPhonebackSubmitted(true)}
      renderTrigger={
        typeof props.renderTrigger === 'function'
          ? open => props.renderTrigger({ onClick: open })
          : open => (
              <Button track={props.track} onClick={open}>
                {props.cta}
              </Button>
            )
      }
    />
  ) : typeof props.renderTrigger === 'function' ? (
    props.renderTrigger({ track: props.track, as: 'a', href: props.link })
  ) : (
    <Button track={props.track} as="a" href={props.link}>
      {props.cta}
    </Button>
  );
};
