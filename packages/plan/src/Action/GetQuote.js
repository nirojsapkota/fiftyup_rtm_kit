import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, FormError, getFormValues } from '@rtm-ui/form';
import { Button } from '@rtm-ui/button';
import { Box, scrollToElement } from '@rtm-ui/layout';
import { Header, Markdown, Small } from '@rtm-ui/typography';

const axios = require('axios');

const phonebackButtons = [
  { text: 'Morning', value: '800' },
  { text: 'Afternoon', value: '1200' },
  { text: 'Evening', value: '1800' },
];

const QuoteValueText = styled(Header)`
  font-family: 'MuseoSans';
  font-weight: 500;
  font-size: 3em;
`;

const QuoteFormWrapper = styled(Box)``;

const QuoteContentWrapper = styled(Box)``;

const ThanyouWrapper = styled(Box)``;

const ButtonWrapper = styled(Box)`
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
`;

// Acts as a one-off 'useEffect' loads the potential age options on load.
const generateAgeOptions = props => {
  // Ruby (Rails) equivalent code
  // def age_options(age_range)
  // [].tap do |ages|
  //   ages << ["#{age_range.first - 1} years old or younger", age_range.first - 1]
  //   ages.concat age_range.map { |i| ["#{i} years old", i] }
  //   ages << ["#{age_range.last  + 1} years old or older", age_range.last + 1]
  // end

  const minAge = props.minAge || 16;
  const maxAge = props.maxAge || 69;
  // Lower bound - Hardcode
  let ageValues = [
    { label: `${maxAge + 1} years old or older`, value: `${maxAge + 1}` },
  ];

  for (let age = maxAge; age > minAge - 1; age -= 1) {
    ageValues.push({ label: `${age} years old`, value: age.toString() });
  }

  // Upper bound - Hardcode
  ageValues.push({
    label: `${minAge - 1} years old or younger`,
    value: `${minAge - 1}`,
  });
  return ageValues;
};

const formattedCovercapByage = (ageSelection, coverCaps) => {
  let formattedCoverCap = 2000000;

  if (coverCaps) {
    if(typeof coverCaps[ageSelection] === 'number') {
      formattedCoverCap = coverCaps[ageSelection];
    } else if (typeof coverCaps[ageSelection] === 'string') {
      formattedCoverCap = coverCaps[ageSelection].replace(/,/g, '') || 2000000;
    } else {
      return formattedCoverCap;
    }
  } else {
    return formattedCoverCap;
  }

  return parseFloat(formattedCoverCap);
}

/**
 * Helper function that passes the correct development state.
 * @returns
 */

// Acts as a one-off 'useEffect' loads the potential cover option amounts on load.
const generateCoverAmount = (selectedAge, coverCaps = {}) => {
  // JS Implementation of (Ruby Method - ERB file)( cover_list = (100_000..950_000).step(50_000).to_a + (1_000_000..2_000_000).step(100_000).to_a )
  let coverAmounts = [];

  let formattedCoverCap = formattedCovercapByage(selectedAge, coverCaps)

  let coverCap1 = formattedCoverCap
    ? formattedCoverCap <= 1000000
      ? formattedCoverCap
      : 1000000
    : 1000000;
  let coverCap2 = formattedCoverCap
    ? formattedCoverCap <= 2000001
      ? formattedCoverCap
      : 2000001
    : 2000001;

  for (let coverLimit = 100000; coverLimit < coverCap1; coverLimit += 50000) {
    coverAmounts.push({
      label: `$${coverLimit.toLocaleString()}`,
      value: coverLimit.toString(),
    });
  }

  for (
    let coverLimit = coverCap1;
    coverLimit <= coverCap2;
    coverLimit += 100000
  ) {
    coverAmounts.push({
      label: `$${coverLimit.toLocaleString()}`,
      value: coverLimit.toString(),
    });
  }
  return coverAmounts;
};

const GetQuote = props => {
  const [ageSelection, setAgeSelection] = React.useState(null);
  const [quoteResult, setQuoteResult] = React.useState(null);
  const [quoteStep, setQuoteStep] = React.useState(1);
  const [quoteFieldsValues, setQuoteFieldsValues] = React.useState({});
  const [submittingQuote, setSubmittingQuote] = React.useState(false);
  const [submittingPhoneback, setSubmittingPhoneback] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState({
    formError: props.formError || null,
    fieldErrors: props.fieldErrors || {},
  });
  let calculatorFields = [
    {
      label: 'First name', // || stateField.label
      labelSuper: '*',
      name: 'first_name',
      type: 'text',
      initialValue: quoteFieldsValues.first_name,
      placeholder: 'First name', // || stateField.placeholder
      autoComplete: 'off',
      config: {
        validator: 'required',
      },
      className: 'inline-fields first',
    },
    {
      label: 'Surname', // || stateField.label
      name: 'last_name',
      type: 'text',
      initialValue: quoteFieldsValues.last_name,
      placeholder: 'Surname', // || stateField.placeholder
      autoComplete: 'off',
      config: {},
      className: 'inline-fields',
    },
    {
      label: 'Phone number', // || stateField.label
      labelSuper: '*',
      name: 'primary_contact_no',
      type: 'tel',
      initialValue: quoteFieldsValues.primary_contact_no,
      placeholder: 'Phone number', // || stateField.placeholder
      autoComplete: 'off',
      config: {
        validator: 'valueMatch',
        validatorArgs: [
          '^(([0][1-9][0-9]{8}))$',
          'Must start with 0 and be 10 digits long',
        ],
      },
      className: 'inline-fields first',
    },
    {
      label: 'Age',
      labelSuper: '*',
      config: {
        component: 'dropdownfield',
        scrollable: true,
        validator: 'lifeInsuranceAgeDropdown',
        validatorArgs: [
          props.calculatorProps.minAgeAvailment,
          props.calculatorProps.maxAgeAvailment,
        ],
      },
      type: 'text',
      initialValue: quoteFieldsValues.age,
      name: 'age',
      inputMode: 'none',
      options: generateAgeOptions({
        minAge: props.calculatorProps.minAgeAvailment,
        maxAge: props.calculatorProps.maxAgeAvailment,
      }),
      className: 'inline-fields',
      onDropdownChange: val => {
        setAgeSelection(val);
      },
    },
    {
      label: 'Gender',
      labelSuper: '*',
      config: {
        validator: 'requiredRadio',
      },
      name: 'gender',
      type: 'radio',
      initialValue: quoteFieldsValues.gender,
      options: [{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }],
      className: 'inline-fields first',
    },
    {
      label: 'Smoking status',
      labelSuper: '*',
      config: {
        validator: 'requiredRadio',
      },
      name: 'smoker',
      initialValue: quoteFieldsValues.smoker,
      type: 'radio',
      options: [
        { label: 'Non Smoker', value: 'false' },
        { label: 'Smoker', value: 'true' },
      ],
      className: 'inline-fields',
    },
  ];

  const coverCapByAge = formattedCovercapByage(ageSelection, props.calculatorProps.coverCaps)

  const coverField = {
    label: 'Amount of cover',
    labelSuper: '*',
    config: {
      component: 'dropdownfield',
      scrollable: true,
      validator: 'lessThan',
      validatorArgs: [
        coverCapByAge,
        `Must not be more than ${coverCapByAge.toLocaleString('en-US')}`,
      ],
    },
    type: 'text',
    name: 'cover_required',
    inputMode: 'none',
    options: generateCoverAmount(ageSelection, props.calculatorProps.coverCaps),
  };

  const submitHandler = async values => {
    try {
      setSubmittingQuote(true);
      setServerErrors({ formError: '', fieldErrors: {} });

      let data = {
        campaign_id: props.campaignId,
        life_insurance_lead_fragment: {},
        lead: {},
      };

      values.forEach(field => {
        if (field.name === 'smoker' || field.name === 'cover_required') {
          data['life_insurance_lead_fragment'][field.name] = field.value;
        } else {
          data['lead'][field.name] = field.value;
        }
      });

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': props.userApiAuthToken,
        },
      };

      const response = await axios
        .post(props.link, data, config)
        .then(response => {
          //  Sample Response: {"standard":"38.61","obs":"32.82","savings":"69.50","lead_id":1367596}
          setQuoteResult(response.data);
          setQuoteStep(2);
          setQuoteFieldsValues(getFormValues(values));
          scrollToElement(null, 'ctaSection');
          return response;
        })
        .catch(error => {
          throw new FormError({
            formError: 'Unexpected problem, please contact support.',
            fieldErrors: {}, //sample
          });
        });

      setSubmittingQuote(false);
      return response;
    } catch (e) {
      setSubmittingQuote(false);
      setServerErrors(e.object);
    }
  };

  const submitPhoneback = async ({
    link,
    campaignId,
    userApiAuthToken,
    value,
  }) => {
    try {
      setSubmittingPhoneback(true);

      let data = {
        campaign_id: campaignId,
        phoneback: { preferred_time: value },
      };

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': userApiAuthToken,
        },
      };

      await axios
        .patch(link, data, config)
        .then(response => {
          setQuoteStep(3);
          setSubmittingPhoneback(false);
          scrollToElement(null, 'ctaSection');
          return response.data;
        })
        .catch(error => {
          setSubmittingPhoneback(false);
          throw new FormError({
            formError: 'Unexpected problem, please contact support.',
            fieldErrors: {}, //sample
          });
        });
    } catch (e) {
      setSubmittingPhoneback(false);
      setServerErrors(e.object);
    }
  };

  const [calcFields, setCalcFields] = React.useState([
    ...calculatorFields,
    coverField,
  ]);

  React.useEffect(() => {
    setCalcFields([...calculatorFields, coverField]);
  }, [ageSelection]);

  return (
    <Box py={16} px={30}>
      {/* STEP ONE: Display the quote form */}
      {quoteStep === 1 && (
        <QuoteFormWrapper data-testid="quoteStep1">
          {props.calculatorProps.quoteHeader && (
            <Markdown raw={props.calculatorProps.quoteHeader} />
          )}
          <Form
            id="life-form"
            TURN_OFF_AUTOCOMPLETE={true}
            onSubmit={submitHandler}
            dynamicFields={true}
            fields={calcFields}
            renderFooter={({ FormError }) => (
              <React.Fragment>
                {FormError && (
                  <Box pt={2}>
                    <Small align="left" color="error">
                      <Icon fill="error" glyph="error" size={15} />
                      {FormError}
                    </Small>
                  </Box>
                )}
                <Button
                  appearDisabled={submittingQuote}
                  disabled={submittingQuote}
                  block
                  track="get_quote"
                  width="100%"
                  type="submit"
                >
                  {props.calculatorProps.formSubmitButtonText}
                </Button>
                <Box
                  style={{
                    height: '15px',
                    display: 'flex',
                    alignSelf: 'flex-end',
                  }}
                >
                  <Small align="left" color="error">
                    {serverErrors.formError}
                  </Small>
                </Box>
                {props.calculatorProps.getQuoteDisclaimerText && (
                  <Box>
                    <Small>
                      <Markdown
                        scale={0.75}
                        py={2}
                        raw={props.calculatorProps.getQuoteDisclaimerText}
                      />
                    </Small>
                  </Box>
                )}
              </React.Fragment>
            )}
          />
        </QuoteFormWrapper>
      )}

      {/* STEP STEP: Show the quote */}
      {quoteStep === 2 && (
        <QuoteContentWrapper data-testid="quoteStep2">
          <ButtonWrapper>
            <Markdown
              py={3}
              raw={props.calculatorProps.quoteResultHeaderText}
            />
            <QuoteValueText>${quoteResult.obs}</QuoteValueText>
            <Markdown raw={props.calculatorProps.paymentCycleText} />
            <Markdown
              pt={4}
              pb={3}
              raw={props.calculatorProps.timeToCallBackText}
            />
            {phonebackButtons.map((button, index) => (
              <ButtonWrapper key={index}>
                <Button
                  block
                  py={3}
                  track="call_me_back"
                  key={index}
                  disabled={submittingPhoneback}
                  appearDisabled={submittingPhoneback}
                  onClick={() => {
                    submitPhoneback({
                      link: props.calculatorProps.callbackUrl,
                      campaignId: props.campaignId,
                      value: button.value,
                      userApiAuthToken: props.userApiAuthToken,
                    });
                  }}
                >
                  {button.text}
                </Button>
              </ButtonWrapper>
            ))}
            <Box
              style={{
                height: '15px',
                display: 'flex',
                alignSelf: 'flex-end',
              }}
            >
              <Small align="left" color="error">
                {serverErrors.formError}
              </Small>
            </Box>
          </ButtonWrapper>
          {props.calculatorProps.phoneNumber && (
            <Box py={2}>
              <Markdown py={2} raw={props.calculatorProps.phoneNumber} />
            </Box>
          )}
          {props.calculatorProps.newQuoteText && (
            <Markdown
              raw={props.calculatorProps.newQuoteText}
              onClick={() => {
                setQuoteResult(0);
                setQuoteStep(1);
              }}
            />
          )}
        </QuoteContentWrapper>
      )}

      {/* STEP THREE: Show a thank you message */}
      {quoteStep === 3 && (
        <ThanyouWrapper data-testid="quoteStep3">
          <Markdown py={2} raw={props.calculatorProps.thankyouBody} />
        </ThanyouWrapper>
      )}
    </Box>
  );
};

GetQuote.propTypes = {
  onSuccess: PropTypes.func,
  formInput: PropTypes.shape({}),
};

export default GetQuote;
