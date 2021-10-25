import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import { Card, Box } from '@rtm-ui/layout';
import { Header, Small } from '@rtm-ui/typography';
import { Form, FormError } from '@rtm-ui/form';
import { Button } from '@rtm-ui/button';
import { Icon } from '@rtm-ui/icon';

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
    this.handleEmptyResult = this.handleEmptyResult.bind(this);
  }

  async handleSubmit(fieldsWithValues) {
    const {
      trackingData,
      loginUrl,
      authenticityToken,
      stateField,
      buttonTrack,
    } = this.props;

    const values = { user: {} };
    fieldsWithValues.forEach(field => {
      if (field.name === 'email') {
        values['user'][field.name] = field.value;
      } else if (field.name === stateField.fieldName) {
        if (stateField.options) {
          values['user'][field.name] = stateField.options.filter(
            option => option['label'] === field.value
          )[0]['value'];
        } else {
          values['user'][field.name] = field.value;
        }
      } else {
        values[field.name] = field.value;
      }
    });

    const result = await submitLogin(
      loginUrl,
      values,
      authenticityToken,
      trackingData,
      buttonTrack
    );
    const { data } = result;

    if (data.errors) {
      const fieldErrors = {};
      data.errors.forEach(error => {
        if (error.toLowerCase().indexOf(stateField.errorValue) !== -1) {
          fieldErrors[stateField.fieldName] = error;
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

  async handleEmptyResult() {
    return 'Invalid Postcode';
  }

  async autoCompleteSearch(searchTerm) {
    const { stateField } = this.props;
    if (stateField.options) {
      return stateField.options.filter(
        option =>
          option['label'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    } else {
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
  }

  render() {
    const {
      title,
      hiddenFields,
      authenticityToken,
      buttonText,
      buttonTrack,
      buttonIcon,
      gdprProps,
      stateField,
      emailField,
      showFullNameField,
      showPhoneNumberField,
      isExitIntent,
    } = this.props;

    const formInput = {
      id: 'signup',
      fields: [
        showFullNameField &&
          !isExitIntent && {
            label: 'First Name:',
            name: 'firstName',
            type: 'text',
            placeholder: 'First Name',
            config: {
              validator: 'required',
            },
          },
        showFullNameField &&
          !isExitIntent && {
            label: 'Last Name:',
            name: 'lastName',
            type: 'text',
            placeholder: 'Last Name',
            config: {
              validator: 'required',
            },
          },
        {
          label: stateField.label || 'My Postcode:',
          name: stateField.fieldName,
          type: 'text',
          placeholder: stateField.placeholder || 'Postcode',
          autoComplete: 'off',
          hint: stateField.hint || '5000, Adelaide',
          config: {
            component: 'autocomplete',
            validator: stateField.validator,
            validatorArgs: stateField.options
              ? [stateField.options.map(option => option['label'])]
              : undefined,
            searchFunction: this.autoCompleteSearch,
            onEmptyResult: this.handleEmptyResult,
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
        showPhoneNumberField &&
          !isExitIntent && {
            label: 'Phone Number:',
            name: 'phone',
            type: 'text',
            placeholder: 'Phone Number',
            config: {
              validator: 'required',
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
        <Header py={4} tag="h6" align="center">
          {title}
        </Header>
        <Form
          {...formInput}
          onSubmit={this.handleSubmit}
          onSuccess={this.handleSuccess}
          renderFooter={({ formError }) => (
            <React.Fragment>
              <GdprAgreement {...gdprProps} />
              <ButtonWrapper py={3}>
                <Button
                  type="submit"
                  className="signup-button"
                  track={buttonTrack || 'signin'}
                >
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
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

const LoginPanel = ({ wrapperStyle, ...props }) => {
  if (props.isExitIntent) {
    return <LoginForm {...props} />;
  } else {
    return (
      <Card px={[20, 20, 30, 40]} py={10} style={wrapperStyle}>
        <LoginForm {...props} />
      </Card>
    );
  }
};

LoginPanel.propTypes = {
  isExitIntent: t.bool,
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
  stateField: t.shape({
    label: t.string,
    placeholder: t.string,
    hint: t.string,
    fieldName: t.string,
    options: t.array,
    validator: t.string,
    errorValue: t.string,
  }),
  emailField: t.shape({
    label: t.string,
    placeholder: t.string,
  }),
  showFullNameField: t.bool,
  showPhoneNumberField: t.bool,
  wrapperStyle: t.object,
};

LoginPanel.defaultProps = {
  title:
    'Join One Big Switch today for FREE and instantly unlock your special offers!',
  buttonText: 'See the offers',
  buttonIcon: null,
  stateField: {},
  emailField: {},
  showFullNameField: false,
  showFullNameField: false,
  isExitIntent: false,
};

export { LoginPanel };
