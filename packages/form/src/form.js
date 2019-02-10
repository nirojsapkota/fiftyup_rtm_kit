import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import Button from '@rtm-ui/button';
import Icon from '@rtm-ui/icon';
import { Box } from '@rtm-ui/layout';
import { Header, Small } from '@rtm-ui/typography';
import BaseField, { fieldTypes } from './fields/baseField';
import {
  maskValidator,
  requiredValidator,
  requiredRadioValidator,
  emailValidator,
  passwordConfirmValidator,
  passwordComplexityValidator,
  zipcodeValidator,
} from './fields/util/validators';

const Footer = styled(Box)`
  display: flex;
  align-items: ${props => props.alignItems};
  justify-content: flex-end;
  flex-direction: column;
`;

const FormStatus = ({ formError, submitting }) => {
  return (
    // FIXME: minHeight due to not wanting to jump when nothing present
    <Box style={{ minHeight: '34px' }} p={2}>
      {formError &&
        !submitting && (
          <Small color="error" mr={10}>
            <Icon fill="error" size={16} glyph="view-close" />
            {formError || 'An error has ocurred, please try again.'}
          </Small>
        )}
    </Box>
  );
};

const validatorMap = {
  maskValidator,
  requiredValidator,
  requiredRadioValidator,
  emailValidator,
  passwordConfirmValidator,
  passwordComplexityValidator,
  zipcodeValidator,
};

const getSchema = fields => {
  const validationSchema = {};
  fields
    .filter(({ validator }) => validator)
    .forEach(({ name, validator, validatorArgs }) => {
      validationSchema[name] = validatorArgs
        ? validatorMap[`${validator}Validator`](...validatorArgs)
        : validatorMap[`${validator}Validator`];
    });

  return validationSchema;
};

// NOTE: this may become more annoying as it's current behavior
// is to store the last submitted state in localStorage and
// restore it as an initalValue, overriding what has been
// setup from the form configuration. A scenario where this
// may become annoying is when a user has changed a restored
// form, then refreshed the page to see their recent changes
// overridden by older changes.
const getInitialValues = (fields, storedValues = {}) => {
  const initialValues = {};
  fields.forEach(({ name, initialValue }) => {
    initialValues[name] =
      (storedValues && storedValues[name]) || initialValue || '';
  });
  return initialValues;
};

const Form = props => {
  const {
    onSubmit,
    fields,
    header,
    disabled: formDisabled,
    submitText,
    submitIcon,
    storedValues,
    status,
  } = props;
  const initialValues = getInitialValues(fields, storedValues);
  const schema = Yup.object().shape(getSchema(fields));

  return (
    // FIXME: temporary solution to hide step form
    <div style={{ opacity: formDisabled && 0 }} id={`form-${props.formId}`}>
      <Formik
        enableReinitialize // tell formik we're loading data from localStorage
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        render={({ handleSubmit, ...rest }) => (
          <React.Fragment>
            <Header tag="h6">{header}</Header>
            <form onSubmit={handleSubmit}>
              {fields.map(field => (
                <BaseField
                  {...field}
                  key={field.name}
                  disabled={formDisabled || field.disabled}
                  setFieldValue={rest.setFieldValue}
                  setFieldError={rest.setFieldError}
                  setFieldTouched={rest.setFieldTouched}
                  onChange={rest.handleChange}
                  value={rest.values[field.name]}
                  error={
                    (rest.touched[field.name] && rest.errors[field.name]) ||
                    props.errors[field.name]
                  }
                  success={
                    rest.touched[field.name] &&
                    !rest.errors[field.name] &&
                    !props.errors[field.name]
                  }
                />
              ))}
              <Footer alignItems="flex-end">
                <Box>
                  <Button
                    data-testid={`form-${props.formId}-submit`}
                    type="submit"
                    disabled={formDisabled || rest.isSubmitting}
                  >
                    {submitText || 'Get Started'}
                    {submitIcon && (
                      <Icon
                        inline
                        size={24}
                        fill="inverseText"
                        glyph={rest.isSubmitting ? 'switching' : submitIcon}
                      />
                    )}
                  </Button>
                </Box>
                <FormStatus
                  formError={props.formError}
                  submitting={rest.isSubmitting}
                />
              </Footer>
            </form>
          </React.Fragment>
        )}
      />
    </div>
  );
};

Form.defaultProps = {
  fields: [],
  errors: {},
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.keys(fieldTypes)),
    })
  ),
};

export default Form;
