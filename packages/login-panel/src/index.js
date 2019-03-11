import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import { Card, Box } from '@rtm-ui/layout';
import { Header, Small } from '@rtm-ui/typography';
import Form, { FormError } from '@rtm-ui/form';
import Button from '@rtm-ui/button';
import Icon from '@rtm-ui/icon';

import { submitLogin, getAutoCompletePostcode } from './actions';
import GdprAgreement from './GdprAgreement';

const ButtonIConWrapper = styled(Box)`
  margin-top: -3px;
`;

const ButtonWrapper = styled(Box)`
  text-align: center;
`;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    // Binding event
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.autoCompleteSearch = this.autoCompleteSearch.bind(this);
  }

  async handleSubmit(fieldsWithValues) {
    const { loginUrl, authenticityToken } = this.props;

    const values = { user: {} };
    fieldsWithValues.forEach(field => {
      if (field.name === 'postcode_suburb' || field.name === 'email') {
        values['user'][field.name] = field.value;
      } else {
        values[field.name] = field.value;
      }
    });

    const result = await submitLogin(loginUrl, values, authenticityToken);
    const { data } = result;

    if (data.errors) {
      const fieldErrors = {};
      data.errors.forEach(error => {
        if (error.toLowerCase().indexOf('postcode') !== -1) {
          fieldErrors['postcode_suburb'] = error;
        } else if (error.toLowerCase().indexOf('email') !== -1) {
          fieldErrors['email'] = error;
        }
      });

      throw new FormError({
        formError:
          Object.keys(fieldErrors).length > 0
            ? ''
            : 'An error has occurred, please try again in a few minutes',
        fieldErrors: fieldErrors,
      });
    }

    return fieldsWithValues.map(field => {
      if (data.redirectPath && field.name === 'redirectPath') {
        return { ...field, value: data.redirectPath };
      } else {
        return field;
      }
    });
  }

  async handleSuccess(form) {
    const redirectPath = form.values.redirectPath;
    if (redirectPath) {
      window.location.href = redirectPath;
    }
  }

  async autoCompleteSearch(searchTerm) {
    const { autocompletePostcodeUrl, authenticityToken } = this.props;
    const results = await getAutoCompletePostcode(
      autocompletePostcodeUrl,
      searchTerm,
      authenticityToken
    );

    return results.map(item => {
      return { label: item };
    });
  }

  render() {
    const {
      title,
      hiddenFields,
      authenticityToken,
      buttonText,
      buttonIcon,
      gdprProps,
      postCodeField,
      emailField,
    } = this.props;

    const formInput = {
      id: 'signup',
      fields: [
        {
          label: postCodeField.label || 'My Postcode:',
          name: 'postcode_suburb',
          type: 'text',
          placeholder: postCodeField.placeholder || 'Postcode',
          autoComplete: 'off',
          hint: postCodeField.hint || '5000, Adelaide',
          config: {
            component: 'autocomplete',
            validator: 'zipcode',
            searchFunction: this.autoCompleteSearch,
          },
        },
        {
          label: emailField.label || 'My Email:',
          name: 'email',
          type: 'text',
          placeholder: emailField.placeholder || 'Email',
          config: {
            validator: 'email',
          },
        },
        {
          label: '',
          name: 'authenticity_token',
          type: 'hidden',
          initialValue: authenticityToken,
          config: {},
        },
        {
          label: '',
          name: 'redirectPath',
          type: 'hidden',
          config: {},
        },
        ...Object.keys(hiddenFields).map(key => ({
          label: '',
          name: key,
          type: 'hidden',
          initialValue: hiddenFields[key],
          config: {},
        })),
      ],
    };
    return (
      <React.Fragment>
        <Header py={3} tag="h6">
          {title}
        </Header>
        <Form
          {...formInput}
          onSubmit={this.handleSubmit}
          onSuccess={this.handleSuccess}
          renderFooter={({ formError }) => (
            <React.Fragment>
              <ButtonWrapper pb={3}>
                <Button type="submit" track="signin">
                  {buttonText}
                  {buttonIcon && (
                    <ButtonIConWrapper>
                      <Icon
                        fill="inverseText"
                        inline
                        glyph={buttonIcon}
                        size={20}
                      />
                    </ButtonIConWrapper>
                  )}
                </Button>
                {formError && (
                  <Box pt={2}>
                    <Small align="left" color="error">
                      <Icon fill="error" glyph="error" size={15} />
                      {formError}
                    </Small>
                  </Box>
                )}
              </ButtonWrapper>
              <GdprAgreement {...gdprProps} />
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

const LoginPanel = props => (
  <Card px={[20, 20, 30, 40]} py={10}>
    <LoginForm {...props} />
  </Card>
);

LoginPanel.propTypes = {
  authenticityToken: t.string.isRequired,
  loginUrl: t.string.isRequired,
  handleSuccess: t.func,
  handleSubmit: t.func,
  // eslint-disable-next-line react/forbid-prop-types
  hiddenFields: t.object,
  title: t.string,
  buttonText: t.string,
  buttonIcon: t.string,
  autocompletePostcodeUrl: t.string,
  postCodeField: t.shape({
    label: t.string,
    placeholder: t.string,
    hint: t.string,
  }),
  emailField: t.shape({
    label: t.string,
    placeholder: t.string,
  }),
};

LoginPanel.defaultProps = {
  title:
    'Join One Big Switch today for FREE and instantly unlock your special offers!',
  buttonText: 'See the offers',
  buttonIcon: null,
  postCodeField: {},
  emailField: {},
};

export default LoginPanel;
