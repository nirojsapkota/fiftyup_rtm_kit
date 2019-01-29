import styled from 'styled-components';

const SvgWrapper = styled.span`
  flex: 0 0 ${props => `${props.size}px`};
  width: ${props => (props.width ? `${props.width}px` : `${props.size}px`)};
  height: ${props => (props.height ? `${props.height}px` : `${props.size}px`)};
  min-width: ${props =>
    props.minWidth ? `${props.minWidth}px` : `${props.size}px`};
  min-height: ${props =>
    props.minHeight ? `${props.minHeight}px` : `${props.size}px`};
  position: ${props => props.position || 'absolute'};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  color: ${props => props.color || 'inherit'};
`;

export default SvgWrapper;
