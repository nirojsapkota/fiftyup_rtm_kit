import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Paragraph } from '@rtm-ui/typography';
import Popover from './popover';
import TextFieldWithIcon from '../TextField/TextFieldWithIcon';

const Option = styled(Paragraph)`
  cursor: pointer;
`;

const StyledTextFieldWithIcon = styled(TextFieldWithIcon)`
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

const DropdownSelect = ({ options, ...props }) => {
  // const { inputComponent } = this.props;

  // const component = () => ({
  //   return React.createElement(inputComponent, updatedDataProps);
  // });

  return (
    <Popover
      display="block"
      anchor={(toggle, isOpen) => (
        <StyledTextFieldWithIcon
          {...props}
          hideErrors={isOpen}
          onClick={toggle}
          autoComplete="off"
        />
      )}
    >
      {toggle =>
        options.map(({ value, label }) => (
          <Option
            py={2}
            px={3}
            key={value}
            onClick={() => {
              props.form.setFieldValue(props.field.name, value);
              toggle();
            }}
          >
            {label}
          </Option>
        ))
      }
    </Popover>
  );
};

export default DropdownSelect;

DropdownSelect.propTypes = {
  options: t.arrayOf(t.shape({ value: t.string, label: t.string })),
};
