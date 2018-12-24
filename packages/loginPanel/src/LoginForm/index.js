import React from 'react';
// import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import styled from 'styled-components';

import { Box } from '@rtm-ui/layout';
import Button from '@rtm-ui/button';

// import { submitLogin } from './actions';
// import { LOGIN_URL } from './constants';

const StyledInput = styled.input`
  padding: 8px 2px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
`;

const TextInput = props => <StyledInput {...props} />;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(values, actions) {
  // const result = submitLogin(LOGIN_URL, values, this.props.authenticityToken);
  // actions.isSubmitting(false);
  // }

  render() {
    return (
      <Formik
        initialValues={{
          user: {
            postcode_suburb: '',
            email: '',
          },
        }}
        onSubmit={this.handleSubmit}
        render={({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Box py={2}>
              Join One Big Switch today for FREE
              <br />
              and instantly unlock your special offers!
            </Box>
            <Box py={2}>
              <Box py={2}>My Postcode:</Box>
              <Field
                name="user[postcode_suburb]"
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
                name="user[email]"
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
            <Button type="submit" disabled={isSubmitting}>
              See the offer
            </Button>
          </form>
        )}
      />
    );
  }
}
LoginForm.propTypes = {};

export default LoginForm;
