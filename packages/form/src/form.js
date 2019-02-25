import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Small } from '@rtm-ui/typography';
import Button from '@rtm-ui/button';
import BaseField from './fields/baseField';
import { setupForm, getFieldErrors } from './util/helpers';
import { FormContext } from './formContext';
import { FormError } from './formError';

export { FormError };

export const getFormValues = fields => {
  const values = {};
  fields.map(field => {
    values[field.name] = field.value;
  });

  return values;
};

const FooterBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

const Form = ({ onSubmit, fields: providedFields, id, ...props }) => {
  const [fields, setFields] = React.useState(providedFields);
  const [serverErrors, setServerErrors] = React.useState({
    formError: props.formError || null,
    fieldErrors: props.fieldErrors || {},
  });
  const { validationSchema, initialValues } = setupForm(fields, id);
  const context = React.useContext(FormContext) || {};

  const submitWrapper = async (...args) => {
    try {
      // Undo server errors
      setServerErrors({ formError: '', fieldErrors: {} });
      const [submitValues, formikBag] = args;
      const fieldsWithValues = fields.map(field => {
        return { ...field, value: submitValues[field.name] };
      });
      const response = await onSubmit(fieldsWithValues, context);
      if (Array.isArray(response)) {
        await setFields(response);
      } else {
        throw new FormError({
          formError: 'Something went wrong',
          fieldErrors: {},
        });
      }

      formikBag.setSubmitting(false);
      if (typeof props.onSuccess === 'function') {
        await props.onSuccess({ id, values: getFormValues(response) });
      }
    } catch (e) {
      setServerErrors(e.object);
    }
  };

  // Pass these values straight through with no submission
  React.useEffect(function() {
    if (props.passThru) {
      validationSchema.isValid(initialValues).then(valid => {
        if (valid) {
          props.onSuccess({ id, values: initialValues });
        }
      });
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={submitWrapper}
      render={({ handleSubmit, isSubmitting, isValidating, ...rest }) => {
        const fieldUtils = {
          setFieldValue: rest.setFieldValue,
          setFieldTouched: rest.setFieldTouched,
          setFieldError: rest.setFieldError,
        };

        return (
          <form onSubmit={handleSubmit}>
            {fields.map(field => (
              <BaseField
                key={field.name}
                fieldUtils={fieldUtils}
                {...field}
                value={rest.values[field.name]}
                onChange={rest.handleChange}
                error={
                  serverErrors.fieldErrors[field.name] ||
                  getFieldErrors(rest, field)
                }
              />
            ))}
            {props.renderFooter || (
              <FooterBox>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <Box
                    mb={10}
                    style={{ display: 'flex', alignSelf: 'flex-end' }}
                  >
                    <Button data-testid={`submit-${id}`} type="submit">
                      Submit
                    </Button>
                  </Box>
                  <Box
                    style={{
                      height: '12px',
                      display: 'flex',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Small align="left" color="error">
                      {serverErrors.formError}
                    </Small>
                  </Box>
                </Box>
              </FooterBox>
            )}
          </form>
        );
      }}
    />
  );
};

export default Form;

Form.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({ ...BaseField.propTypes })),
};
