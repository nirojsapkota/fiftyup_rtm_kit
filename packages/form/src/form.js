import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import Button from '@rtm-ui/button';
import BaseField from './fields/baseField';
import { setupForm, getFieldErrors } from './util/helpers';
import { useLocalStorage } from './util/useLocalStorage';
import { FormContext } from './formContext';

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

const passThruSubmit = async values => {
  return values;
};

const Form = ({
  onSubmit = passThruSubmit,
  fields: providedFields,
  id,
  ...props
}) => {
  const [fields, setFields] = React.useState(providedFields);

  const [serverErrors, setServerErrors] = React.useState({
    formError: null,
    fieldErrors: {},
  });
  const [storedValues, setStoredValues] = useLocalStorage(id, {});
  const { validationSchema, initialValues } = setupForm(
    fields,
    id,
    storedValues
  );

  const filterObject = (raw, sensitiveKeys) => {
    return Object.keys(raw)
      .filter(key => !sensitiveKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = raw[key];
        return obj;
      }, {});
  };

  const context = React.useContext(FormContext) || {};

  const submitWrapper = async (...args) => {
    try {
      const sensitiveFields = fields
        .filter(({ sensitive }) => sensitive === true)
        .map(({ name }) => name);

      const [submitValues, formikBag] = args;
      const fieldsWithValues = fields.map(field => {
        return { ...field, value: submitValues[field.name] };
      });
      const response = await onSubmit(fieldsWithValues, context);
      await setFields(response);

      // TODO: this might just be replaced with reducer/localstorage
      // await setStoredValues(filterObject(response, sensitiveFields));

      await props.onSuccess({ id, values: getFormValues(fields) });
    } catch (e) {
      console.log(e);
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
                onChange={rest.handleChange}
                fieldUtils={fieldUtils}
                value={rest.values[field.name]}
                {...field}
                error={
                  serverErrors.fieldErrors[field.name] ||
                  getFieldErrors(rest, field)
                }
              />
            ))}
            {props.renderFooter || (
              <FooterBox>
                <Button data-testid={`submit-${id}`} type="submit">
                  Submit
                </Button>
              </FooterBox>
            )}
          </form>
        );
      }}
    />
  );
};

export default Form;
