import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Card } from '@rtm-ui/layout';

function isOrContainsNode(parent, child) {
  return parent === child || (parent.contains && parent.contains(child));
}

const Positioner = styled.span`
  position: relative;
  display: ${props => props.display};
`;

const AnchorWrapper = styled.span`
  display: block;
`;

const positionMap = {
  top: 'bottom',
  bottom: 'top',
};
const PositionedPane = styled(Card)`
  position: absolute;
  ${props =>
    `${positionMap[props.position]}: ${props.gapWidth +
      props.dimensions.height}px`};
  min-width: ${props => props.dimensions.width}px;
  max-height: ${props => props.maxHeight}px;
  z-index: 1000;
  left: 0;
  overflow: hidden;
`;

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.anchorRef = React.createRef();
    this.popoverRef = React.createRef();

    this.state = {
      isOpen: this.props.isOpen,
      isControlled: this.props.isControlled,
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

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const rect = this.anchorRef.current.getBoundingClientRect();
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

    this._anchorNode = this.anchorRef.current;
    this._popoverNode = this.popoverRef.current;

    const targetWithinPopover = target => {
      return [this._anchorNode, this._popoverNode].some(contextNode => {
        return contextNode && isOrContainsNode(contextNode, target);
      });
    };

    const onMouseUp = event => {
      if (!targetWithinPopover(event.target) && this.state.isOpen) {
        this.setState({ isOpen: false });
      }
    };

    document.addEventListener('mouseup', onMouseUp);

    this.cleanup = () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }

  componentWillUnmount() {
    this.cleanup();
  }

  toggle() {
    const { isOpen } = this.state;
    return !this.state.isControlled && this.setState({ isOpen: !isOpen });
  }

  render() {
    const {
      anchor,
      children,
      display,
      gapWidth,
      maxHeight,
      position,
    } = this.props;
    return (
      <React.Fragment>
        <Positioner display={display} ref={this.popoverRef}>
          <AnchorWrapper ref={this.anchorRef}>
            {typeof anchor === 'function'
              ? anchor(this.toggle, this.state.isOpen)
              : anchor}
          </AnchorWrapper>
          {this.state.isOpen && (
            <PositionedPane
              maxHeight={maxHeight}
              gapWidth={gapWidth}
              position={position}
              dimensions={this.state.anchorDimensions}
              elevation="2"
            >
              {typeof children === 'function'
                ? children(this.toggle)
                : children}
            </PositionedPane>
          )}
        </Positioner>
      </React.Fragment>
    );
  }
}

Popover.defaultProps = {
  gapWidth: 10,
  display: 'inline-block',
  maxHeight: 200,
  position: 'bottom',
};

export default Popover;

Popover.propTypes = {
  isOpen: t.bool,
  isControlled: t.bool,
  // eslint-disable-next-line react/forbid-prop-types
  anchor: t.any,
  // eslint-disable-next-line react/forbid-prop-types
  children: t.any,
  display: t.string,
  gapWidth: t.number,
  maxHeight: t.number,
  position: t.string,
};
