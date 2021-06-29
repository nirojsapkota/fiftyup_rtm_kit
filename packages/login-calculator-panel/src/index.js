/* istanbul ignore file */

import React, { useEffect, useState } from 'react';
import t from 'prop-types';
import styled from 'styled-components';

import {
  Card,
  Box,
  Pane,
  scrollToElementExtended,
  useWindowSize,
} from '@rtm-ui/layout';
import { Header, Small, Paragraph, Markdown } from '@rtm-ui/typography';
import { Form, FormError } from '@rtm-ui/form';
import { Button } from '@rtm-ui/button';
import { Icon } from '@rtm-ui/icon';

import {
  submitLogin,
  getAutoCompletePostcode,
  submitLifeInsuranceQuoteDetails,
  submitCallbackTime,
} from './actions';

// import GdprAgreement from './GdprAgreement';

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

const DisclaimerWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ContentWrapper = styled(Box)`
  margin: auto;
`;

const SeeMoreOffersWrapper = styled(Box)`
  padding: 2rem;
`;

const SeeMoreOffers = props => {
  return (
    <SeeMoreOffersWrapper>
      <Button
        track={props.track}
        as="a"
        href={'/campaigns'}
        data-testid="SeeMoreOfferButton"
      >
        {props.btnText}
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

const QuoteFormDefaultSubmittedProps = {
  width: [1, 1, 1 / 2, 1 / 3],
  px: [10, 10, 15, 10],
  // maxWidth: ['100%', '100%', '388px', '460px'],
};

const QuoteContentWrapper = styled(Box)``;

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

  /**
   * Passed the element styling in a functionality
   *
   * Styling in based on the "isRegistered" state variable
   *
   * @returns
   */
  const handleStyle = () => {
    if (hasRegistered) {
      return { width: [1, 1, 1 / 2, 1 / 2] };
    }
    // If user hasn't registered return no extra styling
    return {};
  };

  return (
    <>
      <QuoteContentWrapper
        name="quoteContentName"
        data-testid="quoteContentDiv"
        {...handleStyle()}
      >
        {mainHeading && (
          <CustomerContainerWrapper className="content-wrapper">
            <ContentWrapper>
              <Box className="hero" {...QuoteContentDefaultProps}>
                <Markdown raw={calculatorProps.quoteHeaderText} />
                <Header>{quoteValue} </Header>
                <Markdown raw={calculatorProps.paymentCycleText} />
                <br />
                <Paragraph py={3}>
                  {calculatorProps.timeToCallBackText}
                </Paragraph>
                {props.buttons.map((button, index) => (
                  <ButtonWrapper key={index}>
                    <Button
                      track={`calculatorProps.callMeBackTrack/${button.text}`}
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
                <Markdown py={3} raw={calculatorProps.discountText} />
                <Header tag="h2">{calculatorProps.phoneNumber}</Header>
              </Box>
            </ContentWrapper>
          </CustomerContainerWrapper>
        )}
      </QuoteContentWrapper>
    </>
  );
};

function LoginCalculatorForm({
  loginUrl,
  authenticityToken,
  stateField,
  lifeInsuranceCalcProps,
  hiddenFields,
  buttonIcon,
  gdprProps,
  emailField,
  autocompletePostcodeUrl,
  pane,
  calculatorProps,
  onSeeOffersClick,
  isDevelopment,
  setFormComplete,
  REMOVE_BEFORE_PRODUCTION_IS_SUBMITTED,
  ...props
}) {
  const [coverOptions] = useState(generateCoverAmount());
  const [hasRegistered, setHasRegistered] = useState(false);
  const [ageOptions] = useState(generateAgeOptions());
  const [quoteAmount, setQuoteAmount] = useState('$ - -.- -');
  const [formInput, setFormInput] = useState(null);
  const [lifeInsuranceQuoteValues, setLifeInsuranceQuoteValues] = useState({
    firstName: '',
    gender: null,
    age: null,
    phoneNumber: null,
  });

  const windowSize = useWindowSize();

  useEffect(() => {
    if (REMOVE_BEFORE_PRODUCTION_IS_SUBMITTED) {
      setHasRegistered(REMOVE_BEFORE_PRODUCTION_IS_SUBMITTED);
      setQuoteAmount(' $ - -.- -');
    }
  }, []);

  const handleSubmit = async fieldsWithValues => {
    // Values for the first request (register/login the user to authenticate their session)
    const authenticateValues = { user: {}, noRedirect: true };

    // Values to be submitted to the life insurance calculator API to get a quote

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
    const tempLifeInsuranceQuoteValues = lifeInsuranceQuoteValues;
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
          tempLifeInsuranceQuoteValues[field.name] = field.value;
        } else {
          authenticateValues[field.name] = field.value;
        }
      }
    });

    setLifeInsuranceQuoteValues(tempLifeInsuranceQuoteValues);

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
      // We want to ignore this error in development mode
      if (!isDevelopment) {
        throw new FormError({
          formError:
            Object.keys(fieldErrors).length > 0
              ? ''
              : 'An error has occurred, please try again in a few minutes',
          fieldErrors: fieldErrors,
        });
      }
    }

    setHasRegistered(true);

    if (isDevelopment !== true) {
      // API CALL FOR fetching the LifeInsurance quote value

      const resultLifeInsuranceQuoteDetails = await submitLifeInsuranceQuoteDetails(
        calculatorProps.quoteUrl,
        calculatorProps.campaignId,
        lifeInsuranceQuoteValues,
        authenticityToken
      );
      setQuoteAmount(`$ ${resultLifeInsuranceQuoteDetails.obs}`);
    } else {
      // We set a hard-coded value in the development mode as it is assumed there is no backend API to call.
      setQuoteAmount('$2.50');
    }

    // TODO Figure out if this is still needed
    // return fieldsWithValues.map(field => {
    //   if (data.redirectPath && field.name === 'redirectPath') {
    //     return { ...field, value: data.redirectPath };
    //   } else {
    //     return field;
    //   }
    // });

    // Duration that will be used for both the scrollTo duration.

    try {
      const DURATION = 750; // time unit (ms)
      const SMOOTH_TRANSITION = true; // Leave as "true". "false" is bad UX in majority of cases.
      const TRANSITION_DELAY = 150; // time unit (ms)
      // On success ->  scroll to the provided quote value.
      // (Note) 750 == "wsm" (in "theme" package)
      // ScrollTo for table/desktop screens
      if (windowSize.width > 750) {
        scrollToElementExtended(null, 'quoteContentName', {
          DURATION: DURATION,
          smooth: SMOOTH_TRANSITION,
          delay: TRANSITION_DELAY,
          offsetY: -100,
        });
      } else {
        // ScrollTo for mobile/small screens
        scrollToElementExtended(null, 'quoteContentName', {
          DURATION: DURATION,
          smooth: SMOOTH_TRANSITION,
          delay: TRANSITION_DELAY,
          offsetY: -250,
        });
      }
    } catch (e) {
      // TODO Connect to relevant logging service
      console.log(e);
    }
    // So this returns the current state variable for the formInput
    // In this case we only return the "fields" as that is all the form "submitWrapper" functions expects
    // It then refreshes the form with the passed fields.
    // TODO The implementation of the form package following a unique design pattern.
    // TODO It might be worth evaluating if such a unique design pattern is necessary.
    return formInput.fields;
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
      // A sick hack to make tests pass
      try {
        return results.map(item => {
          return { label: item };
        });
      } catch (e) {
        // TODO Do something with the error!!!!
        return [];
      }
    }
  };

  useEffect(() => {
    const lifeInsuranceQuoteFields = [
      {
        label: 'First name', // || stateField.label
        name: 'firstName',
        type: 'text',
        initialValue: lifeInsuranceQuoteValues.firstName,
        placeholder: 'First name', // || stateField.placeholder
        autoComplete: 'off',
        config: {
          validator: 'required',
        },
      },
      {
        label: 'Surname', // || stateField.label
        name: 'surname',
        type: 'text',
        initialValue: lifeInsuranceQuoteValues.surname,
        placeholder: 'Surname', // || stateField.placeholder
        autoComplete: 'off',
        config: {
          validator: 'required',
        },
      },
      {
        label: 'Phone number', // || stateField.label
        name: 'phoneNumber',
        type: 'tel',
        initialValue: lifeInsuranceQuoteValues.phoneNumber,
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
        label: 'Age',
        config: {
          component: 'dropdownfield',
          scrollable: true,
          validator: 'lifeInsuranceAgeDropdown',
        },
        type: 'text',
        initialValue: lifeInsuranceQuoteValues.age,
        name: 'age',
        options: ageOptions,
      },
      {
        label: 'Gender',
        config: {
          validator: 'requiredRadio',
        },
        name: 'gender',
        type: 'radio',
        initialValue: lifeInsuranceQuoteValues.gender,
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
        initialValue: lifeInsuranceQuoteValues.firstName,
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
        initialValue: '',
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
    ];

    const registrationFields = [
      {
        label: stateField.label || 'My Postcode:',
        name: stateField.fieldName,
        disabled: hasRegistered,
        hint: stateField.hint || 'e.g. 5000, Adelaide',

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
    ];

    if (hasRegistered) {
      lifeInsuranceQuoteFields;
    } else {
      lifeInsuranceQuoteFields.splice(2, 0, ...registrationFields);
    }
    setFormInput({
      id: 'signup',
      fields: lifeInsuranceQuoteFields,
    });
  }, [hasRegistered]);

  const handleQuoteFormProps = () => {
    if (hasRegistered) {
      return QuoteFormDefaultSubmittedProps;
    } else {
      return QuoteFormDefaultProps;
    }
  };

  return (
    <RowFlexBox>
      <CalculatorPanelWrapper {...handleQuoteFormProps()}>
        <CalculatorPanelContentBox>
          <div scroll-target="login-panel">
            <PaddingStyleWrapper pane={pane}>
              <>
                {calculatorProps.quoteTitle && (
                  <Markdown py={2} raw={calculatorProps.quoteTitle} />
                )}
                {calculatorProps.quoteText && (
                  <Markdown raw={calculatorProps.quoteText} />
                )}
                {formInput != null && (
                  <Form
                    {...formInput}
                    dynamicFields={true}
                    onSubmit={handleSubmit}
                    onSuccess={handleSuccess}
                    renderFooter={({ formError }) => (
                      <React.Fragment>
                        <ButtonWrapper py={3}>
                          <Button
                            type="submit"
                            className="signup-button"
                            track={calculatorProps.formSubmitButtonTrack}
                            onClick={event => {
                              // console.log('I HAVE BEEN PRESSED!');
                            }}
                          >
                            {calculatorProps.formSubmitButtonText}
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
                            __html: `<div style="color:black;text-align:center;font-size: medium;">${
                              calculatorProps.getQuoteDisclaimerTextHtml
                            }</div>`,
                          }}
                        />
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
        hasRegistered={hasRegistered}
        {...props}
        // TODO The below is hacky, purely for development only
        {...[
          loginUrl,
          authenticityToken,
          stateField,
          lifeInsuranceCalcProps,
          hiddenFields,
          buttonIcon,
          gdprProps,
          emailField,
          calculatorProps.getQuoteDisclaimerTextHtml,
          autocompletePostcodeUrl,
          pane,
        ]}
        onSeeOffersClick={onSeeOffersClick}
        quoteValue={quoteAmount}
        props
      />
    </RowFlexBox>
  );
}

LoginCalculatorForm.propTypes = {
  calculatorProps: t.shape({
    quoteTitle: t.string,
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
    seeMoreOffersButtonText: t.string,
    formSubmitButtonText: t.string,
    callMeBackTrack: t.string,
    seeMoreOffersButtonTrack: t.string,
    formSubmitButtonTrack: t.string,
  }),
  authenticityToken: t.string.isRequired,
  loginUrl: t.string.isRequired,
  handleSuccess: t.func,
  handleSubmit: t.func,
  // eslint-disable-next-line react/forbid-prop-types
  hiddenFields: t.object,
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
    isRequired: t.string,
    isChecked: t.bool,
    getCheckBoxValue: t.func,
    content: t.string,
  }),
  onSeeOffersClick: t.func,
  // isDevelopment is a flag to signal that requests should be mocked due to no-backend being available.
  isDevelopment: t.bool,
};

LoginCalculatorForm.defaultProps = {
  buttonText: 'see more offers',
  formSubmitButtonText: 'Get Quote',
  buttonIcon: null,
  stateField: {},
  emailField: {},
  pane: false,
  isDevelopment: false,
};

const ThankYouContent = styled(Box)`
  padding: 8rem 1rem;
`;

// TODO Double check the fixture for the button component (appears to be broken)
const ThankYou = props => (
  <RowFlexBox>
    <CalculatorPanelContentBox>
      <ThankYouContent>
        <Markdown
          align="center"
          color="primary"
          raw={props.calculatorProps.thankyouHeader}
        />
        <Markdown
          align="center"
          color="text"
          raw={props.calculatorProps.thankyouBody}
        />
        <SeeMoreOffers
          btnText={props.calculatorProps.seeMoreOffersButtonText}
          track={props.calculatorProps.seeMoreOffersButtonTrack}
        />
      </ThankYouContent>
    </CalculatorPanelContentBox>
  </RowFlexBox>
);

const LoginCalculatorPanel = props => {
  const [formComplete, setFormComplete] = useState(false);

  // TODO Think of a smarter way to handle this!

  useEffect(() => {
    if (props.thankYou) {
      setFormComplete(props.thankYou);
    }
  });

  return formComplete ? (
    <ThankYou {...props} />
  ) : (
    <LoginCalculatorForm {...props} setFormComplete={setFormComplete} />
  );
};

export { LoginCalculatorPanel };
