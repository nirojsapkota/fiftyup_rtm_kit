import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Pane } from '@rtm-ui/layout';

const Positioner = styled.span`
  position: relative;
`;

const AnchorWrapper = styled.span``;

const PositionedPane = styled(Pane)`
  position: absolute;
  top: ${props => props.gapWidth + props.dimensions.height}px;
  left: 0;
  min-width: ${props => props.dimensions.width}px;
  z-index: 1000;
`;

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    anchorDimensions: {
      x: null,
      y: null,
      width: null,
      height: null,
      top: null,
      bottom: null,
      left: null,
      right: null,
    },
  };

  componentDidMount() {
    const rect = this.myRef.current.getBoundingClientRect();
    this.setState({
      anchorDimensions: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      },
    });
  }

  render() {
    const { anchor, children, gapWidth } = this.props;
    return (
      <Positioner>
        <AnchorWrapper ref={this.myRef}>{anchor}</AnchorWrapper>
        <PositionedPane
          gapWidth={gapWidth}
          dimensions={this.state.anchorDimensions}
          elevation="2"
        >
          {children}
        </PositionedPane>
      </Positioner>
    );
  }
}

Popover.defaultProps = {
  gapWidth: 10,
};

export default Popover;
