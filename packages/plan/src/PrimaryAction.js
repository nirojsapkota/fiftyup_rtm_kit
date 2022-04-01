import React from 'react';
import { Button } from '@rtm-ui/button';
import { Box } from '@rtm-ui/layout';
import RequestCallback from './Action/RequestCallback';

export const PrimaryAction = props => {
  if (props.track === 'request_call_back') {
    return(
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
    );
  } else if(typeof props.renderTrigger === 'function' && props.track === 'get_quote') {
    return(props.renderTrigger({ track: props.track}));
  } else if(typeof props.renderTrigger === 'function') {
    return(props.renderTrigger({ track: props.track, as: 'a', href: props.link }));
  } else if(props.track === 'get_quote') {
    return(<Box />);
  } else {
    return(
      <Button track={props.track} as="a" href={props.link}>
        {props.cta}
      </Button>
    );
  }
};
