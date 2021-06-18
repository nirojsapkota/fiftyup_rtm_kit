import React, { useEffect, useState } from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import { Card, Box, Pane } from '@rtm-ui/layout';
import { Header, Small, Paragraph } from '@rtm-ui/typography';
import { Form, FormError } from '@rtm-ui/form';
import { Button } from '@rtm-ui/button';
import { Icon } from '@rtm-ui/icon';

import {
  submitLogin,
  getAutoCompletePostcode,
  submitLifeInsuranceQuoteDetails,
  submitCallbackTime,
} from './actions';

import GdprAgreement from './GdprAgreement';

const ButtonIConWrapper = styled(Box)`
  margin-top: -3px;
`;

const ButtonWrapper = styled(Box)`
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
`;

const CalculatorPanelWrapper = styled(Box)`
  height: 100%;
  overflow: unset;
  padding: 0px;
`;

const ThankYouMessageContainer = styled(Box)`
  width: 100%;
  justify-content: center;
  padding: 12px;
  text-align: center;
`;

const ContentBox = styled(Box)`
  margin: 0 auto;
  text-align: center;
  max-width: 1080px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const CalculatorPanelContentBox = styled(ContentBox)`
   position: sticky;
   top: 0%
   padding: 0px;
   align-self: flex-start;
 `;

const RowFlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  flex-direction: row;
  color: #2d3747;
`;

const CustomerContainerWrapper = styled(Box)`
  height: 100%;
  background: none;
  padding-top: 1rem;
  background: #f3f3f3;
  border-top: 1px solid #e0e0e0;
  padding-bottom: 4px;
`;

const ContainerWrapper = styled(Box)`
  background: none;
  padding-top: 1rem;
  background: linear-gradient(
    to bottom,
    rgba(240, 240, 240, 1) 0%,
    rgba(250, 250, 250, 1) 10%,
    rgba(255, 255, 255, 1) 40%,
    rgba(255, 255, 255, 1) 100%
  );
  border-top: 1px solid #e0e0e0;
  padding-bottom: 4px;
`;

const DisclaimerWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ContentWrapper = styled(Box)`
  max-width: 1080px;
  margin: auto;
`;

const SeeMoreOffersWrapper = styled(Box)`
  padding: 2rem;
`;

const SeeMoreOffers = props => {
  return (
    <SeeMoreOffersWrapper>
      <Button as="a" href={'/campaigns'}>
        See More Offers
      </Button>
    </SeeMoreOffersWrapper>
  );
};

const QuoteContentDefaultProps = {
  width: [1, 1, 1],
  px: [10, 10],
  // maxWidth: ['100%', '100%', '648px'],
};

const QuoteFormDefaultProps = {
  width: [1, 1, 1 / 2, 1 / 2],
  px: [10, 10, 15, 10],
  // maxWidth: ['100%', '100%', '388px', '460px'],
};

/**
 *
 * @param {string} value Expected format 44.44 (4 is an arbitrary value in this example)
 * @returns
 */

const PaddingStyleWrapper = ({ pane, wrapperStyle, ...props }) => {
  return pane === false ? (
    <Card px={[20, 20, 30, 40]} py={10} style={wrapperStyle}>
      {props.children}
    </Card>
  ) : (
    <Pane
      id="check"
      px={[20, 20, 30, 40]}
      py={10}
      style={wrapperStyle || null}
      backgroundColor="white"
    >
      {props.children}
    </Pane>
  );
};

const QuoteContent = ({
  mainHeading,
  quoteValue,
  calculatorProps,
  onSeeOffersClick,
  offerText,
  setFormComplete,
  hasRegistered,
  isDevelopment,
  ...props
}) => {
  const onSelectCallbackTime = async value => {
    await submitCallbackTime(
      calculatorProps.callbackUrl,
      calculatorProps.campaignId,
      { phoneBackPrefferedTime: value },
      props.authenticityToken
    );
    setFormComplete(true);
  };

  return (
    <>
      <div scroll-target="mainHeading" data-testid="quoteContentDiv">
        {mainHeading && (
          <CustomerContainerWrapper className="content-wrapper">
            <ContentWrapper>
              <Box className="hero" {...QuoteContentDefaultProps}>
                <Paragraph>{calculatorProps.quoteHeaderText}</Paragraph>
                <Header>{quoteValue} </Header>
                <h1>{calculatorProps.paymentCycleText}</h1>
                <br />
                <Paragraph py={3}>
                  {calculatorProps.timeToCallBackText}
                </Paragraph>
                {props.buttons.map(button => (
                  <ButtonWrapper>
                    <Button
                      disabled={quoteValue === '$ - -.- -' ? true : false}
                      appearDisabled={quoteValue === '$ - -.- -' ? true : false}
                      onClick={() =>
                        onSelectCallbackTime(
                          button.value.toString(),
                          isDevelopment
                        )
                      }
                    >
                      {button.text}
                    </Button>
                  </ButtonWrapper>
                ))}
                <Paragraph py={3}>{calculatorProps.discountText}</Paragraph>
                <Header>{calculatorProps.phoneNumber} </Header>

                <br />
                <br />

                {hasRegistered && offerText && (
                  <Button
                    onClick={() =>
                      onSeeOffersClick ? onSeeOffersClick() : null
                    }
                  >
                    {offerText}
                  </Button>
                )}
              </Box>
            </ContentWrapper>
          </CustomerContainerWrapper>
        )}
      </div>
    </>
  );
};

function LoginCalculatorForm({
  loginUrl,
  authenticityToken,
  stateField,
  lifeInsuranceCalcProps,
  title,
  hiddenFields,
  buttonText,
  buttonIcon,
  gdprProps,
  emailField,
  quoteText,
  autocompletePostcodeUrl,
  pane,
  calculatorProps,
  onSeeOffersClick,
  offerText,
  isDevelopment,
  setFormComplete,
  ...props
}) {
  const [coverOptions, setCoverOptions] = useState(generateCoverAmount());
  const [hasRegistered, setHasRegistered] = useState(false);
  const [ageOptions, setAgeOptions] = useState(generateAgeOptions());
  const [quoteAmount, setQuoteAmount] = useState('$ - -.- -');
  const [formInput, setFormInput] = useState(null);
  const [submittedCallbackRequest, setSubmittedCallbackRequest] = useState(
    false
  );

  const {
    campaignId,
    quoteUrl,
    callbackUrl,
    getQuoteDisclaimerTextHtml,
  } = calculatorProps;

  const handleSubmit = async fieldsWithValues => {
    // Values for the first request (register/login the user to authenticate their session)
    const authenticateValues = { user: {}, noRedirect: true };

    // Values to be submitted to the life insurance calculator API to get a quote
    const lifeInsuranceQuoteValues = {};

    const lifeInsuranceQuoteKeys = [
      'age',
      'gender',
      'smoker',
      'cover',
      'phoneNumber',
      'surname',
      'firstName',
    ];
    /**
     * Q: What does this do?
     *
     * A: It "crawls" the form submission & extracts values.
     *
     */

    fieldsWithValues.forEach(field => {
      if (field.name === 'email') {
        authenticateValues['user'][field.name] = field.value;
      } else if (field.name === stateField.fieldName) {
        if (stateField.options) {
          authenticateValues['user'][field.name] = stateField.options.filter(
            option => option['label'] === field.value
          )[0]['value'];
        } else {
          authenticateValues['user'][field.name] = field.value;
        }
      } else {
        // Checks for field that belongs to the lifeInsuranceQuote API
        // Allocates the field to the lifeInsuranceQuote object in the event of a match.
        if (lifeInsuranceQuoteKeys.includes(field.name)) {
          lifeInsuranceQuoteValues[field.name] = field.value;
        } else {
          authenticateValues[field.name] = field.value;
        }
      }
    });

    if (isDevelopment) {
    } else if (!hasRegistered) {
      const resultSubmitLogin = await submitLogin(
        loginUrl,
        authenticateValues,
        authenticityToken
      );

      const { data } = resultSubmitLogin;
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

      setHasRegistered(true);
    }
    // API CALL FOR fetching the LifeInsurance quote value
    if (isDevelopment !== true) {
      const resultLifeInsuranceQuoteDetails = await submitLifeInsuranceQuoteDetails(
        quoteUrl,
        campaignId,
        lifeInsuranceQuoteValues,
        authenticityToken
      );
      setQuoteAmount(`$ ${resultLifeInsuranceQuoteDetails.obs}`);
    } else {
      setQuoteAmount('$2.50');
    }
    // TODO Verify that this has been made redundant & remove this prop
    // if (this.props.onSubmit != null && this.props.onSubmit != undefined)
    //   // TODO Pass the calculate quote that is received from the API!
    //   this.props.onSubmit();

    // TODO Figure out if this is still needed
    // return fieldsWithValues.map(field => {
    //   if (data.redirectPath && field.name === 'redirectPath') {
    //     return { ...field, value: data.redirectPath };
    //   } else {
    //     return field;
    //   }
    // });
  };

  const handleSuccess = async form => {
    // Redirects to specified path
    const redirectPath = form.values.redirectPath;
    if (redirectPath) {
      window.location.href = redirectPath;
    }
  };

  /**
   * Helper function that passes the correct development state.
   * @returns
   */
  const handlePostcodeConfig = () => {
    if (isDevelopment) {
      return {
        validator: 'required',
      };
    } else {
      return {
        component: 'autocomplete',
        validator: stateField.validator,
        validatorArgs: stateField.options
          ? [stateField.options.map(option => option['label'])]
          : undefined,
        searchFunction: autoCompleteSearch,
        onEmptyResult: handleEmptyResult,
      };
    }
  };

  const handleEmptyResult = async () => {
    return 'Invalid Postcode';
  };

  // Acts as a one-off 'useEffect' loads the potential cover option amounts on load.
  function generateCoverAmount() {
    // JS Implementation of (Ruby Method - ERB file)( cover_list = (100_000..950_000).step(50_000).to_a + (1_000_000..2_000_000).step(100_000).to_a )
    const coverAmounts = [];

    for (let coverLimit = 100000; coverLimit < 1000000; coverLimit += 50000) {
      coverAmounts.push({
        label: `$${coverLimit}`,
        value: coverLimit.toString(),
      });
    }
    for (let coverLimit = 1000000; coverLimit < 2000001; coverLimit += 100000) {
      coverAmounts.push({
        label: `$${coverLimit}`,
        value: coverLimit.toString(),
      });
    }
    return coverAmounts;
  }

  // Acts as a one-off 'useEffect' loads the potential age options on load.
  function generateAgeOptions() {
    // Ruby (Rails) equivalent code
    // def age_options(age_range)
    // [].tap do |ages|
    //   ages << ["#{age_range.first - 1} years old or younger", age_range.first - 1]
    //   ages.concat age_range.map { |i| ["#{i} years old", i] }
    //   ages << ["#{age_range.last  + 1} years old or older", age_range.last + 1]
    // end

    // Lower bound - Hardcode
    const ageValues = [{ label: '15 years old or younger', value: '15' }];

    for (let age = 16; age < 70; age += 1) {
      ageValues.push({ label: `${age} years old`, value: age.toString() });
    }

    // Upper bound - Hardcode
    ageValues.push({
      label: '70 years old or older',
      value: '70',
    });
    return ageValues;
  }

  const autoCompleteSearch = async searchTerm => {
    if (stateField.options) {
      return stateField.options.filter(
        option =>
          option['label'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
    } else {
      const results = await getAutoCompletePostcode(
        autocompletePostcodeUrl,
        searchTerm,
        authenticityToken
      );

      return results.map(item => {
        return { label: item };
      });
    }
  };

  useEffect(() => {
    setFormInput({
      id: 'signup',
      fields: [
        {
          label: 'First name', // || stateField.label
          name: 'firstName',
          type: 'text',
          placeholder: 'First name', // || stateField.placeholder
          autoComplete: 'off',
          config: {
            //component: 'autocomplete',
            validator: 'required',
            //validatorArgs: stateField.options
            //  ? [stateField.options.map(option => option['label'])]
            //  : undefined,
            // searchFunction: () => console.log("first name being called"),
            //onEmptyResult: this.handleEmptyResult,
          },
        },
        {
          label: 'Surname', // || stateField.label
          name: 'surname',
          type: 'text',
          placeholder: 'Surname', // || stateField.placeholder
          autoComplete: 'off',
          config: {
            //component: 'autocomplete',
            //validator: 'required',
            //validatorArgs: stateField.options
            //  ? [stateField.options.map(option => option['label'])]
            //  : undefined,
            //searchFunction: this.autoCompleteSearch,
            //onEmptyResult: this.handleEmptyResult,
          },
        },
        {
          label: 'Phone number', // || stateField.label
          name: 'phoneNumber',
          type: 'tel',
          placeholder: 'Phone number', // || stateField.placeholder
          autoComplete: 'off',
          config: {
            validator: 'valueMatch',
            validatorArgs: [
              '(^(([0][1-9][0-9]{8})|([1-9][0-9]{7})))',
              'Please enter a valid phone number',
            ],
          },
        },
        {
          label: stateField.label || 'My Postcode:',
          name: stateField.fieldName,
          disabled: hasRegistered,
          type: 'text',
          placeholder: stateField.placeholder || 'Postcode',
          autoComplete: 'off',
          config: handlePostcodeConfig(),
        },
        {
          label: emailField.label || 'My Email:',
          name: 'email',
          type: 'text',
          disabled: hasRegistered,
          placeholder: emailField.placeholder || 'Email',
          config: {
            validator: 'email',
          },
        },
        {
          label: 'Age',
          config: {
            component: 'dropdownfield',
            scrollable: true,
            validator: 'lifeInsuranceAgeDropdown',
          },
          type: 'text',
          name: 'age',
          value: '',
          options: ageOptions,
        },
        {
          label: 'Gender',
          config: {
            validator: 'requiredRadio',
          },
          name: 'gender',
          value: '',
          type: 'radio',
          options: [
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
          ],
        },
        {
          label: 'Smoking status',
          config: {
            validator: 'requiredRadio',
          },
          name: 'smoker',
          value: '',
          type: 'radio',
          options: [
            { label: 'Non Smoker', value: false },
            { label: 'Smoker', value: true },
          ],
        },
        {
          label: 'Amount of cover',
          config: {
            component: 'dropdownfield',
            scrollable: true,
            validator: 'required',
          },
          type: 'text',
          name: 'cover',
          value: '',
          options: coverOptions,
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
    });
  }, []);
  //  }, [hasResgisterd]);

  return !submittedCallbackRequest ? (
    <RowFlexBox>
      <CalculatorPanelWrapper {...QuoteFormDefaultProps}>
        <CalculatorPanelContentBox>
          <div scroll-target="login-panel">
            <PaddingStyleWrapper pane={pane}>
              <>
                <Header py={2} tag="h6">
                  {title || 'Get A Quick Quote Now'}
                </Header>
                <Paragraph>{quoteText || ''}</Paragraph>
                {formInput != null && (
                  <Form
                    {...formInput}
                    onSubmit={handleSubmit}
                    onSuccess={handleSuccess}
                    renderFooter={({ formError }) => (
                      <React.Fragment>
                        <GdprAgreement {...gdprProps} />
                        <ButtonWrapper py={3}>
                          <Button
                            type="submit"
                            className="signup-button"
                            track="signin"
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
                        <DisclaimerWrapper
                          dangerouslySetInnerHTML={{
                            __html: `<div style="color:black;text-align:center;font-size: medium;">${getQuoteDisclaimerTextHtml}</div>`,
                          }}
                        />
                        {hasRegistered && <SeeMoreOffers />}
                      </React.Fragment>
                    )}
                  />
                )}
              </>
            </PaddingStyleWrapper>
          </div>
        </CalculatorPanelContentBox>
      </CalculatorPanelWrapper>
      <QuoteContent
        calculatorProps={calculatorProps}
        authenticityToken={authenticityToken}
        setFormComplete={setFormComplete}
        {...props}
        // TODO The below is hacky, purely for development only
        {...[
          loginUrl,
          authenticityToken,
          stateField,
          lifeInsuranceCalcProps,
          title,
          hiddenFields,
          buttonText,
          buttonIcon,
          gdprProps,
          emailField,
          quoteText,
          getQuoteDisclaimerTextHtml,
          autocompletePostcodeUrl,
          pane,
        ]}
        onSeeOffersClick={onSeeOffersClick}
        offerText={offerText}
        quoteValue={quoteAmount}
        props
      />
    </RowFlexBox>
  ) : (
    <ThankYouMessageContainer>
      <Pane id="check" px={[20, 20, 30, 40]} py={10} backgroundColor="white">
        <Header>Thank you! :) {/* TODO center text */}</Header>{' '}
      </Pane>
    </ThankYouMessageContainer>
  );
}

LoginCalculatorForm.propTypes = {
  calculatorProps: t.shape({
    showQuoteCalculator: t.bool,
    campaignId: t.number,
    quoteText: t.string,
    getQuoteDisclaimerTextHtml: t.string,
    percentDiscount: t.number,
    discountText: t.string,
    phoneNumber: t.string,
    quoteHeaderText: t.string,
    paymentCycleText: t.string,
    timeToCallBackText: t.string,
    callbackUrl: t.string,
    quoteUrl: t.string,
  }),
  onSubmit: t.func,
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
  wrapperStyle: t.object,
  pane: t.bool,
  gdprProps: t.shape({
    enableCheckBox: t.bool,
    isRequire: t.string,
    isChecked: t.bool,
    getCheckBoxValue: t.func,
    content: t.string,
  }),
  onSeeOffersClick: t.func,
  offerText: t.string,
  // isDevelopment is a flag to signal that requests should be mocked due to no-backend being available.
  isDevelopment: t.bool,
};

LoginCalculatorForm.defaultProps = {
  title:
    'Join One Big Switch today for FREE and instantly unlock your special offers!',
  buttonText: 'Get quote',
  buttonIcon: null,
  stateField: {},
  emailField: {},
  onSubmit: () => null,
  pane: false,
  // TODO Remove this for production deployment
  offerText: 'See more offers',
};

const ThankYouContent = styled(Box)`
  padding: 8rem 1rem;
`;

const ThankYou = () => {
  return (
    <RowFlexBox>
      <CalculatorPanelContentBox>
        <ThankYouContent>
          <Header tag="h2" align="center" color="primary">
            Thank you for requesting a call back
          </Header>
          <Header tag="h6" align="center" color="text">
            An insurance team member will call you back within 2 business days.
          </Header>
          <SeeMoreOffers />
        </ThankYouContent>
      </CalculatorPanelContentBox>
    </RowFlexBox>
  );
};

const LoginCalculatorPanel = props => {
  const [formComplete, setFormComplete] = useState(false);

  return formComplete ? (
    <ThankYou />
  ) : (
    <LoginCalculatorForm {...props} setFormComplete={setFormComplete} />
  );
};

export { LoginCalculatorPanel };
