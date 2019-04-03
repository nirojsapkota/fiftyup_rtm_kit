import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import Icon from '@rtm-ui/icon';
import { backgroundStyle, getColor } from '@rtm-ui/theme';

const HeaderWrapper = styled.a`
  ${backgroundStyle};
  color: ${props => getColor('text', props.theme)}
  padding: 15px;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BodyWrapper = styled(Box)`
  border: 1px solid ${props => getColor('background', props.theme)};
  border-radius: 3px;
  position: relative;
  top: -2px;
  padding: 8px;
`;

class Accordion extends React.Component {
  state = {
    items: [],
    activeItemIndex: null,
  };

  componentDidMount() {
    this.setState({
      items: this.props.items,
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
      <Box py={[1]}>
        {this.state.items.map((item, index) => {
          return (
            <div key={index}>
              <HeaderWrapper onClick={() => this.chooseItem(index)}>
                <Box>{this.props.renderHeader(item)}</Box>
                <Icon
                  rotate={this.state.activeItemIndex === index ? -90 : null}
                  glyph="view-back"
                />
              </HeaderWrapper>
              {index === this.state.activeItemIndex ? (
                <BodyWrapper>{this.props.renderItem(item)}</BodyWrapper>
              ) : null}
            </div>
          );
        })}
      </Box>
    );
  }
}

Accordion.defaultProps = {
  activeItemIndex: null
}

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  renderItem: PropTypes.func,
  renderHeader: PropTypes.func,
  activeItemIndex: PropTypes.number
};

export default Accordion;
