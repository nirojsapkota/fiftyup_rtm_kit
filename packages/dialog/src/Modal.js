import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Screen = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 400;
  background-color: rgba(47, 57, 65, 0.85);
  overflow: auto;
`;

const Wrapper = styled.div`
  max-width: 100%;
  width: 700px;

  @media (max-width: ${props => props.theme.grid.sm}em) {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <Screen onClick={this.props.onClose}>
        <Wrapper
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {this.props.children}
        </Wrapper>
      </Screen>,
      this.el
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};
