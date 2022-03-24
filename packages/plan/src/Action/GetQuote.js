import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, FormError, getFormValues } from '@rtm-ui/form';
import { Button, ButtonGroup } from '@rtm-ui/button';
import { Theme as Variant } from '@rtm-ui/theme';
import { Card, Box } from '@rtm-ui/layout';
import { A, Header, Markdown, Paragraph } from '@rtm-ui/typography';

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
`

const formContainer = styled(Box)`
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const QuoteContentWrapper = styled(Box)``;

const ButtonWrapper = styled(Box)`
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
`;

const FooterBox = styled(Box)`
  display: flex;
  justify-content: 'center';
`;

// Acts as a one-off 'useEffect' loads the potential age options on load.
const generateAgeOptions = () => {
  // Ruby (Rails) equivalent code
  // def age_options(age_range)
  // [].tap do |ages|
  //   ages << ["#{age_range.first - 1} years old or younger", age_range.first - 1]
  //   ages.concat age_range.map { |i| ["#{i} years old", i] }
  //   ages << ["#{age_range.last  + 1} years old or older", age_range.last + 1]
  // end

  // Lower bound - Hardcode
  let ageValues = [{ label: '15 years old or younger', value: '15' }];

  for (let age = 16; age < 70; age += 1) {
    ageValues.push({ label: `${age} years old`, value: age.toString() });
  }

  // Upper bound - Hardcode
  ageValues.push({
    label: '70 years old or older',
    value: '70',
  });
  return ageValues;
};

/**
 * Helper function that passes the correct development state.
 * @returns
 */

// Acts as a one-off 'useEffect' loads the potential cover option amounts on load.
const generateCoverAmount = () => {
  // JS Implementation of (Ruby Method - ERB file)( cover_list = (100_000..950_000).step(50_000).to_a + (1_000_000..2_000_000).step(100_000).to_a )
  let coverAmounts = [];

  for (let coverLimit = 100000; coverLimit < 1000000; coverLimit += 50000) {
    coverAmounts.push({
      label: `$${coverLimit.toLocaleString()}`,
      value: coverLimit.toString(),
    });
  }
  for (let coverLimit = 1000000; coverLimit < 2000001; coverLimit += 100000) {
    coverAmounts.push({
      label: `$${coverLimit.toLocaleString()}`,
      value: coverLimit.toString(),
    });
  }
  return coverAmounts;
};

const GetQuote = props => {
  const sampleResult = {'obs': '38.61', 'standard': '200', 'savings': '20', 'lead_id': '222'};
  const [quoteResult, setQuoteResult] = React.useState(null);
  const [quoteStep, setQuoteStep] = React.useState(1);
  const [quoteFieldsValues, setQuoteFieldsValues] = React.useState({})
  const calculatorFields = [
    {
      label: 'First name', // || stateField.label
      name: 'first_name',
      type: 'text',
      initialValue: quoteFieldsValues.first_name,
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
      initialValue: quoteFieldsValues.surname,
      placeholder: 'Surname', // || stateField.placeholder
      autoComplete: 'off',
      config: {
      validator: 'required',
      },
    },
    {
      label: 'Phone number', // || stateField.label
      name: 'phone_number',
      type: 'tel',
      initialValue: quoteFieldsValues.phone_number,
      placeholder: 'Phone number', // || stateField.placeholder
      autoComplete: 'off',
      config: {
      validator: 'valueMatch',
      validatorArgs: [
          '^(([0][1-9][0-9]{8}))$',
          'Phone number must start with 0 and be 10 digits long',
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
      initialValue: quoteFieldsValues.age,
      name: 'age',
      options: generateAgeOptions(),
    },
    {
      label: 'Gender',
      config: {
      validator: 'requiredRadio',
      },
      name: 'gender',
      type: 'radio',
      initialValue: quoteFieldsValues.gender,
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
      initialValue: quoteFieldsValues.smoker,
      type: 'radio',
      options: [
      { label: 'Non Smoker', value: 'false' },
      { label: 'Smoker', value: 'true' },
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
      name: 'cover_required',
      initialValue: quoteFieldsValues.cover_required,
      options: generateCoverAmount(),
    },
    {
      label: '',
      name: 'redirectPath',
      type: 'hidden',
      config: {},
    }
  ]

  const submitHandler = async (values, userApiAuthToken, campaignId, link) => {
    let data = {
      campaign_id: campaignId,
      life_insurance_lead_fragment: {},
      lead: {}
    };

    values.forEach(field => {
      if (field.name === 'smoker' || field.name === 'cover_required') {
        data['life_insurance_lead_fragment'][field.name] = field.value;
      } else {
        data['lead'][field.name] = field.value;
      }
    });

    console.log('data: ', data);

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': userApiAuthToken,
      }
    };

    await axios.post(link, data, config).then(response => {
      // response = {"standard":"38.61","obs":"32.82","savings":"69.50","lead_id":1367596}
      setQuoteResult(response.data);
      setQuoteStep(2);
      setQuoteFieldsValues(getFormValues(values));
      return response.data;
    }).catch(error => {
      // Comment out for now
      throw new FormError({
        formError: 'Unexpected problem, please contact support.',
        fieldErrors: { username: 'That username already exists' } //sample
      });
    });

    // return response;
  };

  const successHandler = async (values) => {
    return values;
  };

  const submitPhoneback = async (link, value) => {
    let data = {
      campaign_id: campaignId,
      phoneback: {preferred_time: value},
    };

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Authorization': userApiAuthToken,
      }
    };

    await axios.post(link, data, config).then(response => {
      setQuoteStep(3);
      setQuoteFieldsValues(getFormValues(values));
      return response.data;
    }).catch(error => {
      // Comment out for now
      throw new FormError({
        formError: 'Unexpected problem, please contact support.',
        fieldErrors: { username: 'That username already exists' } //sample
      });
    });
  }



  return (
    <Box py={10} px={15}>
      {/* STEP ONE: Display the quote form */}
      {quoteStep === 1 && <Form
        id="life-form"
        onSubmit={async values => {
          const data = await submitHandler(values, props.userApiAuthToken, props.campaignId, props.link)
          return submitHandler(values, props.userApiAuthToken, props.campaignId, props.link)
        }}
        onSuccess={successHandler}
        fields={calculatorFields}
        renderFooter={({FormError}) => (
          <React.Fragment>
            <Button block width="100%" type="submit">Submit</Button>
            {FormError && (
              <Box pt={2}>
                <Small align="left" color="error">
                  <Icon fill="error" glyph="error" size={15} />
                  {FormError}
                </Small>
              </Box>
            )}
          </React.Fragment>
        )}
      />}

      {/* STEP STEP: Show the quote */}
      {quoteStep === 2 && <QuoteContentWrapper>
        <ButtonWrapper>
          <Markdown py={3} raw={props.calculatorProps.quoteHeaderText} />
          <QuoteValueText>${quoteResult.obs}</QuoteValueText>
          <Markdown raw={props.calculatorProps.paymentCycleText} />
          <Markdown pt={4} pb={3} raw={props.calculatorProps.timeToCallBackText} />
          {phonebackButtons.map((button, index) => (
            <ButtonWrapper>
              <Button block py={3} track='virtual/call_me_back' key={index}
                onClick={() =>{
                  submitPhoneback(props.link2, button.value)
                }} >
                {button.text}
              </Button>
            </ButtonWrapper>
          ))}
        </ButtonWrapper>
        {props.calculatorProps.phoneNumber && <Box py={2}>
          <p>or call</p>
          <Markdown py={2} raw={props.calculatorProps.phoneNumber} />
        </Box>}
        <Button asWrapper
          onClick={() => {
            setQuoteResult(0);
            setQuoteStep(1);
        }}>
          <Paragraph>{`Generate a new quote`}</Paragraph>
        </Button>
      </QuoteContentWrapper>}

      {/* STEP THREE: Show a thank you message */}
      {quoteStep === 3 && <Markdown py={2} raw={props.calculatorProps.thankyouBody} />}
    </Box>
  )
};

GetQuote.propTypes = {
  onSuccess: PropTypes.func,
  formInput: PropTypes.shape({}),
}

export default GetQuote;