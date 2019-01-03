import React from 'react';
import t from 'prop-types';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import { getColor } from '@rtm-ui/theme';
import { Box, Card } from '@rtm-ui/layout';
import Button from '@rtm-ui/button';
import { Header, Paragraph } from '@rtm-ui/typography';

import { submitLogin } from './actions';
import { LOGIN_URL } from './constants';
import PostCodeField from '../PostCodeField';

const HeaderTitleStyled = styled(Header)`
  font-family: ${props =>
    props.font === 'serif'
      ? props.theme.fonts.serif
      : props.theme.fonts.sansSerif};
  font-size: 15px;
  text-align: left;
  line-height: 1.6;
  color: ${props => getColor(props.color || 'text', props.theme)};
  @media (min-width: ${props => props.theme.grid.md}em) {
    font-size: 18px;
  }
`;

const StyledInput = styled.input`
  padding: 8px 2px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 216px;
`;

const ButtonWrapper = styled(Box)`
  text-align: center;
`;

const TextInput = props => <StyledInput {...props} />;
const HiddenInput = props => <input type="hidden" {...props} />;

const ErrorWrapper = styled(Paragraph)`
  background: #faeded;
  position: relative;
  font-weight: 300;
  font-size: 1.14286rem;
  padding: 8px 20px;
  margin: 5px auto 5px;
  border: 1px solid #ca3838;
  color: #7b2121;
`;

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
    const result = await submitLogin(
      LOGIN_URL,
      values,
      this.props.authenticityToken
    );
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

    const { hiddenFields, authenticityToken, title, buttonText } = this.props;

    return (
      <Card px={20} py={15}>
        <Formik
          initialValues={{
            user: {
              postcode_suburb: '',
              email: '',
            },
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
                      render={({ field }) => (
                        <HiddenInput {...field} id={key} />
                      )}
                    />
                  )
              )}
              <HeaderTitleStyled>{title}</HeaderTitleStyled>
              {errors && (
                <Box py={2}>
                  {errors.map(error => (
                    <ErrorWrapper>{error}</ErrorWrapper>
                  ))}
                </Box>
              )}
              <Box py={2}>
                <Box py={2}>My Postcode:</Box>
                <Field
                  name="user.postcode_suburb"
                  render={({ field, form }) => (
                    <PostCodeField
                      form={form}
                      field={field}
                      inputComponent={TextInput}
                      authenticityToken={authenticityToken}
                      id="user.postcode_suburb"
                      aria-labelledby="user.postcode_suburb"
                      placeholder="Postcode"
                      popoverProps={{ maxHeight: 150 }}
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
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      title="Invalid email address"
                    />
                  )}
                />
              </Box>
              <ButtonWrapper pt={2}>
                <StyledButton type="submit">{buttonText}</StyledButton>
              </ButtonWrapper>
            </form>
          )}
        />
      </Card>
    );
  }
}
LoginForm.propTypes = {
  authenticityToken: t.string,
  handleRedirect: t.func,
  // eslint-disable-next-line react/forbid-prop-types
  hiddenFields: t.object,
  title: t.string,
  buttonText: t.string,
  buttonIcon: t.string,
};

LoginForm.defaultProps = {
  title:
    'Join One Big Switch today for FREE and instantly unlock your special offers!',
  buttonText: 'See the offer',
  buttonIcon: null,
};

export default LoginForm;
