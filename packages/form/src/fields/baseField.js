import React from 'react';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Paragraph } from '@rtm-ui/typography';
import Icon from '@rtm-ui/icon';
import RadioField from './radioField';
import TextField from './textField';
import NumberField from './numberField';
import StripeField from './stripeField';

const Label = styled.label``;

export const fieldTypes = {
  radio: RadioField,
  paymentField: StripeField,
  text: TextField,
  password: TextField,
  tel: NumberField,
};

const Container = styled(Box)``;

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

  toggleWaiting = () => {
    this.setState(prevState => {
      return { waiting: !prevState.waiting };
    });
  };

  render() {
    const {
      label,
      description,
      validator,
      hint,
      helper,
      error,
      success,
      initialValue, // FIXME: destructuring to remove
      validatorArgs, // FIXME: destructuring to remove
      ...props
    } = this.props;
    const Input =
      props.type === 'radio'
        ? RadioField
        : props.type === 'paymentField'
          ? StripeField
          : props.mask !== undefined
            ? NumberField
            : TextField;

    return (
      <Container mb={10}>
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
            {this.state.waiting && 'Waiting'}
            {error}
            {success && <Icon glyph="check" fill="secondary" size={10} />}
          </SmallText>
        </Wrapper>
      </Container>
    );
  }
}
