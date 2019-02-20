import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@rtm-ui/button';
import { Box, Card } from '@rtm-ui/layout'
import { Header } from '@rtm-ui/typography'
import Icon from '@rtm-ui/icon';
import Modal from './Modal';

const CloseDialogWrapper = styled(Box)`
  display: flex;
  background: 'white';
  justify-content: 'flex-end';
  flex-flow: column;
`;

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ isOpen: false });
  };

  open() {
    this.setState({ isOpen: true });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.renderTrigger(this.open)}
        {this.state.isOpen && (
          <Modal isOpen={this.state.isOpen} width="medium" onClose={this.close}>
            <Card>
              <CloseDialogWrapper>
                <Button asWrapper onClick={this.close}>
                  <Header weight='normal' color='text' tag='h6' align="right">
                    Close<Icon center glyph='view-close' />
                  </Header>
                </Button>
              </CloseDialogWrapper>
              { this.props.renderContainer({triggerClose: this.close}) }
            </Card>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

Dialog.defaultProps = {
  renderTrigger: (open) => {
    return <Button onClick={open}>Show Dialog</Button>
  }
}

Dialog.propTypes = {
  renderContainer: PropTypes.func,
  renderTrigger: PropTypes.func,
};

export default Dialog;
