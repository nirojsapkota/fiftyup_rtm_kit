import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getColor, getWeight } from '@rtm-ui/theme';
import { useTracker } from '@rtm-ui/tracker';
import { Text } from '@rtm-ui/typography';

var URL = require('url');

const TextStyle = styled(Text)`
  text-decoration: none;
  font-weight: ${props => (props.weight ? getWeight(props.weight) : 400)};
  color: ${props => getColor(props.color || 'link', props.theme)};
  &:hover {
    color: ${props => getColor('linkHover', props.theme)};
    cursor: pointer;
  }
`;

const A = ({ track, onClick, href, ...props }) => {
  const { ref, trackEvent } = useTracker();

  if (href) {
    const parsedUrl = URL.parse(href);
    var absoluteUrl = URL.format(parsedUrl);
  } else {
    var absoluteUrl = href;
  }


  return (
    <TextStyle
      ref={ref}
      onClick={e => trackEvent(e, track, onClick)}
      {...props}
      href={absoluteUrl}
    />
  );
};

A.defaultProps = {
  tag: 'a',
};

A.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export { A };
