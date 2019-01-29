import React from 'react';
import t from 'prop-types';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import { getColor } from '@rtm-ui/theme';
import { Box } from '@rtm-ui/layout';
import Button from '@rtm-ui/button';
import { Header, Paragraph } from '@rtm-ui/typography';
import Icon from '@rtm-ui/icon';

import { submitLogin } from './actions';
import PostCodeField from '../PostCodeField';
import GdprAgreement from '../GdprAgreement';

const StyledInput = styled.input`
  padding: 8px 2px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 100%;
`;

const Error = styled(Paragraph)`
  text-align: center;
  color: ${props => getColor('error', props.theme)};
  * > span > svg {
    fill: ${props => getColor('error', props.theme)};
    padding-top: 2px;
  }
`;

const ButtonWrapper = styled(Box)`
  text-align: center;
  div {
    background: none;
  }

  * > svg {
    margin-top: -2px;
    fill: ${props => getColor('inverseText', props.theme)};
  }
`;

const TextInput = props => <StyledInput {...props} />;
const HiddenInput = props => <input type="hidden" {...props} />;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    // Set default state
    this.state = {
      errors: null,
    };

    // Binding event
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(values, actions) {
    let result;
    if (typeof this.props.handleSubmit === 'function') {
      result = await this.props.handleSubmit(
        this.props.loginUrl,
        values,
        this.props.authenticityToken
      );
    } else {
      result = await submitLogin(
        this.props.loginUrl,
        values,
        this.props.authenticityToken
      );
    }

    const { data } = result;

    if (data.errors) {
      this.setState({
        errors: data.errors,
      });
      actions.setSubmitting(false);
    } else if (typeof this.props.handleSuccess === 'function') {
      this.props.handleSuccess(result);
    } else {
      // Redirect to path when success login
      window.location.href = data.redirectPath;
    }
  }

  render() {
    const {
      hiddenFields,
      authenticityToken,
      title,
      buttonText,
      gdprProps,
      autocompletePostcodeUrl,
      buttonIcon,
    } = this.props;

    const { errors } = this.state;

    return (
      <React.Fragment>
        <Formik
          initialValues={{
            user: {
              postcode_suburb: '',
              email: '',
            },
            ...hiddenFields,
          }}
          onSubmit={this.handleSubmit}
          render={({ values, handleSubmit, isSubmitting }) => (
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
              <Header pt={[2, 2, 3, 4]} tag="h6">
                {title}
              </Header>
              <Box pb={2} pt={[2, 2, 3, 4]}>
                <Paragraph py={2}>My Postcode:</Paragraph>
                <Field
                  name="user.postcode_suburb"
                  render={({ field, form }) => (
                    <PostCodeField
                      form={form}
                      field={field}
                      inputComponent={TextInput}
                      authenticityToken={authenticityToken}
                      autocompletePostcodeUrl={autocompletePostcodeUrl}
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
                <Paragraph py={2}>My Email:</Paragraph>
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
              <ButtonWrapper py={[2, 2, 3, 4]}>
                <Button type="submit" disabled={isSubmitting} track="signin">
                  {buttonText}
                  {buttonIcon && <Icon inline glyph={buttonIcon} size={20} />}
                </Button>
                {errors && (
                  <Box pt={2}>
                    {errors.map(error => (
                      <Error key={error}>
                        <Icon glyph="error" size={20} /> {error}
                      </Error>
                    ))}
                  </Box>
                )}
              </ButtonWrapper>
              {<GdprAgreement {...gdprProps} />}
            </form>
          )}
        />
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  authenticityToken: t.string.isRequired,
  loginUrl: t.string.isRequired,
  handleSuccess: t.func,
  handleSubmit: t.func,
  // eslint-disable-next-line react/forbid-prop-types
  hiddenFields: t.object,
  title: t.string,
  buttonText: t.string,
  buttonIcon: t.string,
  // eslint-disable-next-line react/forbid-prop-types
  gdprProps: t.shape({}),
  autocompletePostcodeUrl: t.string,
};

LoginForm.defaultProps = {
  title:
    'Join One Big Switch today for FREE and instantly unlock your special offers!',
  buttonText: 'See the offers',
  buttonIcon: null,
};

export default LoginForm;
