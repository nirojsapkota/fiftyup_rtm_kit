import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Pane } from '@rtm-ui/layout';
import { Header } from '@rtm-ui/typography';
import Icon from '@rtm-ui/icon';

const A = styled.a`
  cursor: pointer;
  display: block;
  text-transform: uppercase;

  &:hover {
    background: #eee;
  }
`;

const SheetItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #efefef;
`;

const SheetWrapper = styled(Pane)`
  position: absolute;
  right: ${props => (props.isClosed ? '-330px' : '0')};
  transition: all 0.3s ease;
  top: 0;
  bottom: 0;
  max-width: 80%;
  width: 330px;
  background: white;
  z-index: 10;
`;

const ScreenWrapper = styled.div`
  position: absolute;
  background: black;
  opacity: 0.25;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${props => (props.isClosed ? 'none' : 'auto')};
`;

const Screen = props => {
  return <ScreenWrapper onClick={props.onClick} isClosed={props.isClosed} />;
};

const Wrapper = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

class Sheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClosed: this.props.isClosed,
    };
  }

  componentDidMount() {
    this.setState({
      isClosed: this.props.isClosed,
    });
  }

  toggle = () => {
    this.setState(prevState => {
      return { isClosed: !prevState.isClosed };
    });
  };

  render() {
    return (
      <Wrapper>
        <Screen
          data-testid="nav-screen"
          onClick={this.toggle}
          isClosed={this.state.isClosed}
        />
        <SheetWrapper elevation={2} isClosed={this.state.isClosed}>
          <SheetItem p={20}>
            {this.props.headerAction || <div />}
            <A onClick={this.toggle}>
              <Box>
                <Icon size={48} fill="primary" glyph="view-close" />
              </Box>
            </A>
          </SheetItem>
          {this.props.items.map(({ id, onClick, label }) => (
            <A key={id} onClick={onClick}>
              <SheetItem p={20}>
                <Header style={{ lineHeight: '2' }} tag="h6">
                  {label}
                </Header>
                <Box>
                  <Icon fill="primary" inline glyph="view-forward" />
                </Box>
              </SheetItem>
            </A>
          ))}
        </SheetWrapper>
        {this.props.children({ toggle: this.toggle })}
      </Wrapper>
    );
  }
}

Screen.propTypes = {
  onClick: PropTypes.func,
  isClosed: PropTypes.bool,
};

Sheet.propTypes = {
  isClosed: PropTypes.bool,
  headerAction: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onClick: PropTypes.func,
      label: PropTypes.string,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

export default Sheet;
