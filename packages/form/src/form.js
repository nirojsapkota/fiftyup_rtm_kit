import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Small } from '@rtm-ui/typography';
import { Button } from '@rtm-ui/button';
import BaseField, { FieldGroup } from './fields/baseField';
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
  justify-content: ${props => (props.centeredSubmit ? 'center' : 'flex-end')};
`;

const Form = ({
  onSubmit,
  quickSubmit,
  autoSearch,
  dynamicFields,
  getNewestFieldValue,
  fields: providedFields,
  TURN_OFF_AUTOCOMPLETE,
  id,
  FormListener,
  ...props
}) => {
  const [fields, setFields] = React.useState(providedFields);
  // istanbul ignore if
  if (dynamicFields) {
    useEffect(() => {
      setFields(providedFields);

      return () => {
        dynamicFields = false;
      };
    }, [providedFields]);
  }

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
        setFields(response);
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

  // NOTE: Autosubmit has some quirks, we don't have much of
  // an ability to autosubmit text fields as they can possibly
  // be any length - for now we're only supporting fields with
  // explicity use 'setFieldValue', that's because we know when
  // that function is called the value will be 100% complete
  // this feels like a hack and can probably be improved with some
  // field-level autosearch settings.
  const autoSubmit = () => {
    const submitNode = document.getElementById(`hidden-submit-${id}`);
    if (submitNode) {
      submitNode.click();
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

    return () => {
      props.passThru = false;
    };
  }, []);

  const handleTurnOffAutoComplete = () => {
    if (TURN_OFF_AUTOCOMPLETE) {
      return 'off';
    }
    // If this function returns null/undefined
    // the HTML property "autocomplete" isn't applied
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={submitWrapper}
    >
      {formikProps => {
        const {
          handleSubmit,
          zisSubmitting,
          validateForm,
          isValidating,
          handleChange,
          ...rest
        } = formikProps;

        const fieldUtils = {
          setFieldValue: (field, value) => {
            // filter out field's error message from server errors.
            const fieldErrors = Object.keys(serverErrors.fieldErrors).reduce(
              (obj, key) => {
                if (key !== field) {
                  // istanbul ignore next
                  return { ...obj, [key]: serverErrors.fieldErrors[key] };
                }
                return obj;
              },
              {}
            );

            // update server errors message
            setServerErrors({
              formError: serverErrors.formError,
              fieldErrors,
            });

            rest.setFieldValue(field, value);
            // istanbul ignore next
            getNewestFieldValue &&
              typeof getNewestFieldValue == 'function' &&
              getNewestFieldValue(field, value);
            (autoSearch || quickSubmit) &&
              validateForm().then(() => {
                autoSubmit();
              });
          },
          setFieldTouched: rest.setFieldTouched,
          setFieldError: rest.setFieldError,
        };

        return (
          <form
            onSubmit={handleSubmit}
            autoComplete={handleTurnOffAutoComplete()}
          >
            {/* What is this hidden button for ??? */}
            <button type="submit" hidden id={`hidden-submit-${id}`} />
            <FieldGroup
              fields={fields}
              values={rest.values}
              animate={props.progressiveReveal}
            >
              {field => (
                <BaseField
                  key={field.name}
                  fieldUtils={fieldUtils}
                  {...field}
                  value={rest.values[field.name]}
                  onChange={handleChange}
                  error={
                    serverErrors.fieldErrors[field.name] ||
                    (!autoSearch && getFieldErrors(rest, field))
                  }
                />
              )}
            </FieldGroup>
            {typeof props.renderFooter === 'function'
              ? props.renderFooter({ formError: serverErrors.formError })
              : props.renderFooter ||
                (!quickSubmit && (
                  <FooterBox centeredSubmit={props.centeredSubmit}>
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                      <Box
                        mb={10}
                        style={{ display: 'flex', alignSelf: 'flex-end' }}
                      >
                        <Button
                          align="center"
                          data-testid={`submit-${id}`}
                          type="submit"
                        >
                          {rest.submitText || 'Submit'}
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
                ))}
            {/* Form value(s) change listener */}
            {FormListener && <FormListener />}
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;

Form.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({ ...BaseField.propTypes })),
};
