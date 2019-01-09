import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Paragraph } from '@rtm-ui/typography';
import Popover from './popover';

const Option = styled(Paragraph)`
  cursor: pointer;
`;

const DropdownSelect = ({
  options,
  field,
  inputComponent,
  inputEvents,
  popoverProps,
  form,
  setFieldValue,
  ...props
}) => {
  const inputElement = toggle => {
    const inputElementProps = {
      ...props,
      ...field,
      ...inputEvents,
      // hideErrors: isOpen,
      onClick: toggle,
      autoComplete: 'off',
    };
    return React.createElement(inputComponent, inputElementProps, null);
  };

  return (
    <Popover display="block" anchor={inputElement} {...popoverProps}>
      {toggle =>
        options.map(({ value, label }) => (
          <Option
            py={2}
            px={3}
            key={value}
            onClick={() => {
              if (typeof setFieldValue === 'function') {
                setFieldValue(field.name, value);
              } else {
                form.setFieldValue(field.name, value);
              }
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
  setFieldValue: t.func,
  /** Formik field object */
  field: t.shape({
    name: t.string,
    type: t.string,
  }),
  inputEvents: t.shape({
    onChange: t.func,
  }),
  /** Formik form object */
  form: t.shape({
    setFieldValue: t.func,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  inputComponent: t.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  popoverProps: t.object,
};
