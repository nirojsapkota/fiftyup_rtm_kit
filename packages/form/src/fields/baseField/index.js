import React from 'react';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Paragraph, Label } from '@rtm-ui/typography';
import RadioField from '../radioField';
import TextField from '../textField';
import NumberField from '../numberField';
import StripeField from '../stripeField';
import CheckboxField from '../checkboxField';
import AutocompleteField from '../autocompleteField';

export const fieldTypes = {
  radio: RadioField,
  paymentField: StripeField,
  text: TextField,
  password: TextField,
  tel: NumberField,
};

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
      validator,
      hint,
      helper,
      error,
      success,
      initialValue: _initialValue,
      validatorArgs: _validatorArgs,
      ...props
    } = this.props;
    const Input =
      props.type === 'radio'
        ? RadioField
        : props.type === 'checkbox'
          ? CheckboxField
          : props.type === 'paymentField'
            ? StripeField
            : props.type === 'autocomplete'
              ? AutocompleteField
              : props.mask !== undefined
                ? NumberField
                : TextField;

    return (
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
    );
  }
}
