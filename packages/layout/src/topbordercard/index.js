import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../card';
import { getColor } from '@rtm-ui/theme';

const Wrapper = styled(Card)`   
  border-top-width: 7px;
  border-top-color: ${(props) => getColor(props.bordercolor, props.theme)};
  border-top-style: solid;
`;

const TopBorderCard = props => <Wrapper bordercolor="primary" {...props} />;

TopBorderCard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TopBorderCard;