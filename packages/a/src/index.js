import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getColor, getWeight } from '@rtm-ui/theme';
import { Tracker } from '@rtm-ui/tracker';
import { Text } from '@rtm-ui/typography';

const TextStyle = styled(Text)`
  text-decoration: none;
  font-weight: ${props => (props.weight ? getWeight(props.weight) : 400)};
  color: ${props => getColor(props.color || 'link', props.theme)};
  &:hover {
    color: ${props => getColor('linkHover', props.theme)};
    cursor: pointer;
  }
`;

const A = ({ track, onClick, ...props }) => {
  return track ? (
    <Tracker
      render={trackEvent => (
        <TextStyle onClick={() => trackEvent(track, onClick)} {...props} />
      )}
    />
  ) : (
    <TextStyle onClick={onClick} {...props} />
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
