import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import { Icon } from '@rtm-ui/icon';
import { backgroundStyle, getColor } from '@rtm-ui/theme';

const HeaderWrapper = styled.a`
  ${backgroundStyle};
  color: ${props => getColor('text', props.theme)};
  padding: 15px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoxWrapper = styled(Box)`
  border: 1px solid ${props => getColor('background', props.theme)};
  border-radius: 3px;
  border-radius: 3px;
  margin-top: 10px;
`;

const BodyWrapper = styled(Box)`
  padding: ${props => (props.active ? '16px' : '0')};
  height: ${props => (props.active ? '100%' : '0')};
  opacity: ${props => (props.active ? 1 : 0)};
  overflow: hidden;
`;

class Accordion extends React.Component {
  state = {
    items: [],
    activeItemIndex: null,
  };

  componentDidMount() {
    this.setState({
      activeItemIndex: this.props.activeItemIndex,
    });
  }

  chooseItem = index => {
    this.setState(prevState => ({
      activeItemIndex: prevState.activeItemIndex === index ? null : index,
    }));
  };

  render() {
    return (
      <Box>
        {this.props.items.map((item, index) => {
          return (
            <BoxWrapper key={index}>
              <HeaderWrapper onClick={() => this.chooseItem(index)}>
                <Box>{this.props.renderHeader(item)}</Box>
                <Icon
                  rotate={this.state.activeItemIndex === index ? -90 : null}
                  glyph="view-back"
                />
              </HeaderWrapper>
              <BodyWrapper active={index === this.state.activeItemIndex}>
                {this.props.renderItem(item)}
              </BodyWrapper>
            </BoxWrapper>
          );
        })}
      </Box>
    );
  }
}

Accordion.defaultProps = {
  activeItemIndex: null,
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  renderItem: PropTypes.func,
  renderHeader: PropTypes.func,
  activeItemIndex: PropTypes.number,
};

export { Accordion };
