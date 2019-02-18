import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Button from '@rtm-ui/button';
import BaseField from './fields/baseField';
import { setupForm, getFormErrors, getFieldErrors } from './util/helpers';
import { useLocalStorage } from './util/useLocalStorage';
import { FormContext } from './formContext';

const passThruSubmit = async values => {
  return values;
};

const Form = ({ onSubmit = passThruSubmit, fields, id, ...props }) => {
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

      const response = await onSubmit(...args, context);

      await setStoredValues(filterObject(response, sensitiveFields));

      props.onSuccess({ id, values: response });
    } catch (e) {
      getFormErrors(e, fields);
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
                {...field}
                value={rest.values[field.name]}
                error={getFieldErrors(rest, field)}
                onChange={rest.handleChange}
                fieldUtils={fieldUtils}
              />
            ))}
            {props.renderFooter || (
              <Button data-testid={`submit-${id}`} type="submit">
                Submit
              </Button>
            )}
          </form>
        );
      }}
    />
  );
};

export default Form;
