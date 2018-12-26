import React from 'react';
// import t from 'prop-types';
import { Formik, Field } from 'formik';
import styled from 'styled-components';

import { Box } from '@rtm-ui/layout';
import Button from '@rtm-ui/button';
import { Paragraph } from '@rtm-ui/typography';

import { submitLogin } from './actions';
import { LOGIN_URL } from './constants';

const StyledInput = styled.input`
  padding: 8px 2px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
`;

const TextInput = props => <StyledInput {...props} />;
const HiddenInput = props => <input type="hidden" {...props} />;
const ErrorWrapper = props => <Paragraph {...props} />;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    // Set default state
    this.state = {
      redirectPath: null,
      errors: null,
    };

    // Binding event
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(values, actions) {
    const result = await submitLogin(LOGIN_URL, values);
    if (result && !result.errors) {
      if (typeof this.props.handleRedirect === 'function') {
        this.props.handleRedirect(result);
      } else {
        this.setState({
          redirectPath: result.redirectPath,
        });
      }
    } else {
      this.setState({
        errors: result.errors,
      });
    }
    actions.setSubmitting(false);
  }

  render() {
    const { redirectPath, errors } = this.state;
    // Redirect to path when success login
    if (redirectPath) {
      window.location.href = redirectPath;
    }

    const { hiddenFields, authenticityToken } = this.props;

    return (
      <Formik
        initialValues={{
          user: {
            postcode_suburb: '',
            email: '',
          },
          authenticityToken,
          ...hiddenFields,
        }}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {Object.keys(values).map(
              key =>
                key !== 'user' && (
                  <Field
                    key={key}
                    name={key}
                    render={({ field }) => <HiddenInput {...field} id={key} />}
                  />
                )
            )}
            <Box py={2}>
              Join One Big Switch today for FREE
              <br />
              and instantly unlock your special offers!
              <br />
              (This text should be configured by entity)
            </Box>
            <Box py={2}>
              {errors &&
                errors.map(error => <ErrorWrapper>{error}</ErrorWrapper>)}
            </Box>
            <Box py={2}>
              <Box py={2}>My Postcode:</Box>
              <Field
                name="user.postcode_suburb"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="user.postcode_suburb"
                    aria-labelledby="user.postcode_suburb"
                    placeholder="Postcode"
                    required
                  />
                )}
              />
            </Box>
            <Box py={2}>
              <Box py={2}>My Email:</Box>
              <Field
                name="user.email"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    id="user.email"
                    aria-labelledby="user.email"
                    placeholder="Email"
                    required
                  />
                )}
              />
            </Box>
            <Button type="submit">See the offer</Button>
          </form>
        )}
      />
    );
  }
}
LoginForm.propTypes = {};

export default LoginForm;
