import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import Button from '@rtm-ui/button';

const StyledInput = styled.input`
  padding: 8px 2px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
`;

const TextInput = props => <StyledInput {...props} />;

const Form = ({ onSubmit }) => (
  <Formik
    initialValues={{
      email: '',
      postcode: '',
    }}
    // You may find the HTML 5 validation works fine
    // in this case and this is not necessary
    validate={values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }}
    onSubmit={onSubmit}
    render={({ values, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit}>
        {Object.keys(values).map(key => (
          <Box py={2} key={key}>
            <Box py={2} key={key}>
              <label htmlFor={key}>{key}</label>
            </Box>
            <Field
              name={key}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id={key}
                  aria-labelledby={key}
                  placeholder={key}
                />
              )}
            />
          </Box>
        ))}
        <Button type="submit" disabled={isSubmitting}>
          Get Started
        </Button>
      </form>
    )}
  />
);

Form.propTypes = {
  onSubmit: PropTypes.func,
};

export default Form;
