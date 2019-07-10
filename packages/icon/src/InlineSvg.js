import styled, { css } from 'styled-components';
import { getColor } from '@rtm-ui/theme';

const InlineSvg = styled.svg`
  position: ${props => props.position || 'absolute'};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: ${props => props.color || 'inherit'};
  fill: ${props => getColor(props.fill || 'text', props.theme)};

  #secondary {
    stroke: ${props => getColor(props.strokeSecondary || 'text', props.theme)};
    fill: ${props => getColor(props.fill || 'text', props.theme)};
  }
  #primary {
    stroke: ${props => getColor(props.strokePrimary || 'text', props.theme)};
    fill: ${props => getColor(props.fill || 'text', props.theme)};
  }

  transition: all 0.2s ease;
  ${props =>
    props.rotate &&
    css`
      transform: rotate(${props.rotate}deg);
    `};

  ${props =>
    props.hover &&
    css`
      &:hover {
        fill: ${getColor(props.hover, props.theme)};
      }
    `};
`;

export default InlineSvg;
