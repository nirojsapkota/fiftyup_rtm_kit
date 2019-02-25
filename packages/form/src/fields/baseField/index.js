import React from 'react';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Paragraph, Label } from '@rtm-ui/typography';
import { fieldTypes, getFieldComponent } from '../util/getFieldComponent';

export { fieldTypes };

const SmallText = styled(Paragraph)`
  font-size: 10px;
  ${props => props.showErrorColor && `color: red`};
`;

const Wrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  flex-wrap: wrap;
  margin: 5px 0;
`;

export default class BaseField extends React.Component {
  state = {
    focused: false,
    waiting: false,
  };

  toggleFocused = () => {
    this.setState(prevState => {
      return { focused: !prevState.focused };
    });
  };

  toggleWaiting = value => {
    this.setState(() => {
      return { waiting: value };
    });
  };

  render() {
    const {
      label,
      description,
      hint,
      helper,
      error,
      success,
      initialValue: _initialValue,
      ...props
    } = this.props;
    const Input = getFieldComponent(props.type, props.config);

    return props.type !== 'hidden' ? (
      <Box mb={10}>
        <Wrapper alignItems="flex-end">
          <Box>
            <Label font="serif" htmlFor={props.name}>
              {label}
            </Label>
            <SmallText>{description}</SmallText>
          </Box>
          <SmallText>{helper}</SmallText>
        </Wrapper>
        <Input
          {...props}
          showErrorColor={!this.state.focused && error}
          id={`${this.props.name}`}
          onFocus={this.toggleFocused}
          onBlur={this.toggleFocused}
          onWaiting={this.toggleWaiting}
        />
        {/* Ensure the page doesn't jump if a message is inserted */}
        <Wrapper style={{ minHeight: '12px' }}>
          <SmallText>{hint}</SmallText>
          <SmallText
            data-testid="fieldError"
            showErrorColor={!this.state.focused && error}
          >
            {this.state.waiting || error}
          </SmallText>
        </Wrapper>
      </Box>
    ) : (
      <Input {...props} id={`${this.props.name}`} />
    );
  }
}
