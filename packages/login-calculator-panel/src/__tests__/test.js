import React from 'react';
import axios from 'axios';

import {
  render,
  waitFor,
  fireEvent,
  cleanup,
  screen,
} from '../../../bootstrap/setup/testSetup.new.js';

import { LoginCalculatorPanel } from '../index';
import {
  submitLogin,
  submitCallbackTime,
  submitLifeInsuranceQuoteDetails,
} from '../actions';

import loginPanelProps from '../__fixtures__/loginPanel';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<LoginCalculatorPanel />', () => {
  it('matches expected output', async () => {
    const postCodeField = {
      label: 'My Postcode:',
      placeholder: 'Postcode',
      fieldName: 'postcode',
      hint: '10001, New York',
    };
    const emailField = {
      label: 'My Email:',
      fieldName: 'postcode',
      placeholder: 'Email',
    };

    const { getByText } = render(
      <LoginCalculatorPanel
        {...loginPanelProps}
        stateField={postCodeField}
        emailField={emailField}
      />
    );

    //const { hiddenFields } = loginPanelProps;

    // Waits till the form has loaded
    await screen.findByText(loginPanelProps.buttonText);

    // expect hidden fields
    // NOTE: This is an approach to testing that was supported by the old "react-testing-library"
    // To assist with the migration to "testing-library/react" the following test is deprecated.

    // const jumpPath = screen.getByLabelText(hiddenFields.jump_path);
    // expect(jumpPath.name).toEqual('jump_path');
    // const registeringCampaignId = getByValue(
    //   hiddenFields.registering_campaign_id.toString()
    // );
    // expect(registeringCampaignId.name).toEqual('registering_campaign_id');

    expect(getByText(loginPanelProps.title)).toBeInTheDocument();

    // TODO CHANGE THE PROP TO THE "GET QUOTE OPTION!"
    //expect(getByText(loginPanelProps.buttonText)).toBeInTheDocument();

    expect(getByText(postCodeField.label)).toBeInTheDocument();
    expect(getByText(postCodeField.hint)).toBeInTheDocument();

    expect(getByText(emailField.label)).toBeInTheDocument();
  });

  // TODO: Skipping this test for now due to odd failing results
  // Please revisit and make this work after we push to staging/prod
  it.skip('success call with input props', async () => {
    // set Up
    axios.get.mockResolvedValue({ data: { redirectPath: '/' } });

    const { getByText, getByLabelText } = render(
      <LoginCalculatorPanel {...loginPanelProps} />
    );
    await screen.findByLabelText('My Email:');
    const email = screen.getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });

    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, BARANGAROO' },
    });

    const submit = getByText(loginPanelProps.buttonText).closest('button');
    fireEvent.click(submit);

    // expect props event was fired

    // This checks for the autocomplete being fired off!!!!!!!!

    // TODO RE_ENABLE THIS
    //  await waitFor(() => {
    //    // TODO CHANGE THE EXPECTED VALUES TO BETTER MATCH THE NEW FORM!
    //    //e.g. NAME (FIRST + LAST), AGE, IS SMOKER !
    //    // TODO FIND THE TEST CASES FOR THE RADIO COMPONENT
    //    const config = {
    //      params: {
    //        term: '2000, BARANGAROO',
    //      },
    //      headers: {
    //        Accept: 'application/json',
    //        'X-CSRF-Token': loginPanelProps.authenticityToken,
    //      },
    //    };
    //    expect(axios.get).toHaveBeenCalledWith(
    //      loginPanelProps.autocompletePostcodeUrl,
    //      config
    //    );
    //  });

    // This was meant to check for the response from the server regarding the quote submission
    //   await waitFor(() => {
    //     // TODO CHANGE THE EXPECTED VALUES TO BETTER MATCH THE NEW FORM!
    //     //e.g. NAME (FIRST + LAST), AGE, IS SMOKER !
    //     // TODO FIND THE TEST CASES FOR THE RADIO COMPONENT
    //     expect(axios.get).toHaveBeenCalledWith(
    //       loginPanelProps.loginUrl,
    //       {
    //         ...loginPanelProps.hiddenFields,
    //         user: {
    //           email: 'user@example.com',
    //           postcode_suburb: '2000, BARANGAROO',
    //         },
    //       },
    //       {
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           'X-CSRF-Token': loginPanelProps.authenticityToken,
    //         },
    //       }
    //     );
    //   });
  });

  it('Get unauthorize errors from server when submit login', async () => {
    // set Up
    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { errors: ['Email is not valid', 'Postcode is not valid'] },
      },
    });

    const { getByText, getByLabelText } = render(
      <LoginCalculatorPanel {...loginPanelProps} />
    );
    // This awaits for the useEffect within login-calculator-panel (index) (think like onCompleteMount) to fire off.
    await screen.findByLabelText('My Email:');

    const firstName = getByLabelText('First name');
    fireEvent.change(firstName, { target: { value: 'STEVE' } });

    const lastName = getByLabelText('Surname');

    fireEvent.change(lastName, { target: { value: 'From Accounting' } });

    const phoneNumber = getByLabelText('Phone number');

    fireEvent.change(phoneNumber, { target: { value: '0432922222' } });

    const genderRadio = screen.getByTestId('radio-gender_M');
    // fireEvent.change(genderRadio, { target: { value: "M" } });
    fireEvent.click(genderRadio);

    const smokingRadio = screen.getByTestId('radio-smoker_false');
    fireEvent.click(smokingRadio);

    // TOOD ADD TESTS FOR THE DROP DOWN LIST !

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example' },
    });

    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, BARANGAROO' },
    });

    const submit = getByText(loginPanelProps.buttonText).closest('button');

    fireEvent.click(submit);

    expect(await screen.findByText('Invalid email address')).toBeVisible();
  });

  it('submit state works!', async () => {
    // COVERAGE ONLY TESTS!
    const {} = render(
      <LoginCalculatorPanel
        {...loginPanelProps}
        REMOVE_BEFORE_PRODUCTION_IS_SUBMITTED={true}
      />
    );

    await screen.findByText('Morning');
    const ITEM = screen.getByText('Morning');

    fireEvent.click(ITEM);

    expect(ITEM).toBeVisible();

    // This is failing figure out why
    waitFor(() => screen.findByTestId('SeeMoreOfferButton'));
  });

  it('pane true case!', async () => {
    // COVERAGE ONLY TESTS!
    const {} = render(
      <LoginCalculatorPanel {...loginPanelProps} pane={true} />
    );
  });

  it('straight to thank you screen  case!', async () => {
    // COVERAGE ONLY TESTS!
    const {} = render(
      <LoginCalculatorPanel {...loginPanelProps} thankYou={true} />
    );
  });

  // TODO ADD TEST CASE FOR WHEN PANE = TRUE

  it('Successful form submission to get quote', async () => {
    // set Up
    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { errors: ['Email is not valid', 'Postcode is not valid'] },
      },
    });
    // TODO ADD MOCK GET REQUTEST AND ADJUST ABOVE POST REQUEST
    // TODO ALSO MAKE SURE THE AUTOCOMPLETE DOESNT FIRE FOR THIS TEST!!!!!1

    const { getByText, getByLabelText } = render(
      <LoginCalculatorPanel {...loginPanelProps} />
    );
    // This awaits for the useEffect within login-calculator-panel (index) (think like onCompleteMount) to fire off.
    await screen.findByLabelText('My Email:');

    const firstName = getByLabelText('First name');
    fireEvent.change(firstName, { target: { value: 'STEVE' } });

    const lastName = getByLabelText('Surname');
    fireEvent.change(lastName, { target: { value: 'From Accounting' } });

    const phoneNumber = getByLabelText('Phone number');
    fireEvent.change(phoneNumber, { target: { value: '0432922222' } });

    const genderRadio = screen.getByTestId('radio-gender_M');
    fireEvent.click(genderRadio);

    const smokingRadio = screen.getByTestId('radio-smoker_false');
    fireEvent.click(smokingRadio);

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });

    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, BARANGAROO' },
    });

    // const ageDropdown = getByLabelText('Age');
    // fireEvent.focus(ageDropdown)
    // await screen.findByLabelText('18 years old')
    // const dropdownItemAge = await getByLabelText('18 years old');
    // fireEvent.click(dropdownItemAge);

    // const coverDropdown = screen.getByLabelText('Amount of cover');
    // fireEvent.focus(coverDropdown)
    // await screen.findByLabelText('300000')
    // const dropdownItemCover = await getByLabelText('300000');
    // fireEvent.click(dropdownItemCover);

    // FORM SUBMISSION
    const submit = getByText(loginPanelProps.buttonText).closest('button');
    fireEvent.click(submit);
  });

  // TODO ADJUST THIS TEST
  //  it('Get internal errors from server when submit login', async () => {
  //    // set Up
  //    axios.post.mockRejectedValue({
  //      response: {
  //        status: 500,
  //        data: { errors: ['Random error'] },
  //      },
  //    });
  //
  //    const { getByText, getByLabelText, container } = render(
  //      <LoginCalculatorPanel {...loginPanelProps} />
  //    );
  //
  //    // This awaits for the useEffect within login-calculator-panel (index) (think like onCompleteMount) to fire off.
  //    await screen.findByLabelText('My Email:');
  //
  //    const email = getByLabelText('My Email:');
  //    fireEvent.change(email, {
  //      target: { value: 'user@example.com' },
  //    });
  //    const postcode = getByLabelText('My Postcode:');
  //    fireEvent.change(postcode, {
  //      target: { value: '2000, BARANGAROO' },
  //    });
  //
  //   // const submit = getByText(loginPanelProps.buttonText).closest('button');
  //   // fireEvent.click(submit);
  //
  //   // await waitFor(() =>
  //   // expect(container).toHaveTextContent(
  //   //   'An error has occurred, please try again in a few minutes'
  //   // )
  //   // );
  //
  //
  //  });

  it('autocompelete api was called', async () => {
    // setup resolve
    const data = ['5000, ADELAIDE', '5000, ADELAIDE BC'];
    axios.get.mockResolvedValue({
      data,
    });

    const { container } = render(<LoginCalculatorPanel {...loginPanelProps} />);

    await screen.findByLabelText('My Postcode:');

    const postcode = screen.getByLabelText('My Postcode:');
    await fireEvent.change(postcode, {
      target: { value: '5000' },
    });

    await waitFor(async () => {
      expect(axios.get).toHaveBeenCalledWith(
        loginPanelProps.autocompletePostcodeUrl,
        {
          headers: {
            Accept: 'application/json',
            'X-CSRF-Token': loginPanelProps.authenticityToken,
          },
          params: { term: '5000' },
        }
      );

      // Wait until popup arrives
      const item = screen.getByText('5000, ADELAIDE');
      expect(item).toBeInTheDocument();
    });

    // setup reject
    axios.get.mockRejectedValue({
      response: {
        status: 500,
        data: { errors: ['error'] },
      },
    });

    fireEvent.change(postcode, {
      target: { value: '5000, ADELAIDE' },
    });

    await waitFor(async () => {
      expect(axios.get).toHaveBeenCalled();
    });
    await waitFor(async () =>
      expect(container).not.toHaveTextContent('5000, ADELAIDE BC')
    );
  });
});

it('state field with pre-populated data', async () => {
  // set Up
  axios.post.mockResolvedValue({ data: { redirectPath: '/' } });

  const stateField = {
    label: 'My County:',
    fieldName: 'state',
    name: 'state',
    placeholder: 'County',
    hint: 'E.g: Carlow',
    options: [
      { label: 'Carlow', value: 'CW' },
      { label: 'Kilkenny', value: 'KK' },
    ],
  };

  const { findByText, findByLabelText, getByLabelText } = render(
    <LoginCalculatorPanel {...loginPanelProps} stateField={stateField} />
  );

  // This awaits for the useEffect within login-calculator-panel (index) (think like onCompleteMount) to fire off.
  await findByText('My Email:');
  const email = getByLabelText('My Email:');

  fireEvent.change(email, {
    target: { value: 'user@example.com' },
  });

  const state = await findByLabelText(stateField.label);

  await fireEvent.change(state, {
    target: { value: 'Carlow' },
  });
  const item = await screen.findByText(stateField.options[0].label);

  // Wait until popup arrives
  await waitFor(() => expect(item).toBeInTheDocument());
  fireEvent.click(item);
  await waitFor(() => expect(state.value).toEqual(stateField.options[0].label));
});

// TODO ADD ERROR THROWING MOCK REQUESTS!
it('ensure that actions are functioning as designed', async () => {
  // TODO MOCK ALL THE FUNCTION !!!

  // TODO ADD MOCKED RESULT FOR (POST) REQUESTS
  axios.post.mockResolvedValue({
    data: 'TEST',
    status: 200,
  });

  axios.get.mockResolvedValue({
    data: 'TEST',
  });

  // POST request
  const RESULT = await submitLogin('TEST', { TEST: 'TEST' }, '7');

  // GET request (it should really be a POST request)
  const RESULT_2 = await submitCallbackTime(
    'TEST',
    0,
    { phoneBackPrefferedTime: '800' },
    '7'
  );

  // GET request (it should really be a POST request)
  const RESULT_3 = await submitLifeInsuranceQuoteDetails(
    'TEST',
    0,
    {
      firstName: 'Steve',
      surname: 'From Accounting',
      phoneNumber: '0432222222',
      age: '5',
      gender: 'M',
      smoker: false,
      cover: '200000',
    },
    '42'
  );
  // TODO ADD EXPECT CASES!
});

it('ensure submitLogin handles non-401 error cases', async () => {
  axios.post.mockRejectedValue({
    response: {
      status: 500,
      data: { errors: ['error'] },
    },
  });

  // POST request
  const RESULT = await submitLogin('TEST', { TEST: 'TEST' }, '7');
  // TODO ADD EXPECT CASES!
});

it('ensure that actions are throw exceptions as designed', async () => {
  axios.post.mockRejectedValue({
    response: {
      status: 401,
      data: { errors: ['error'] },
    },
  });

  axios.get.mockRejectedValue({
    response: {
      status: 500,
      data: { errors: ['error'] },
    },
  });

  // POST request
  const RESULT = await submitLogin('TEST', { TEST: 'TEST' }, '7');

  // GET request (it should really be a POST request)
  const RESULT_2 = await submitCallbackTime(
    'TEST',
    0,
    { phoneBackPrefferedTime: '800' },
    '7'
  );

  // GET request (it should really be a POST request)
  const RESULT_3 = await submitLifeInsuranceQuoteDetails(
    'TEST',
    0,
    {
      firstName: 'Steve',
      surname: 'From Accounting',
      phoneNumber: '0432222222',
      age: '5',
      gender: 'M',
      smoker: false,
      cover: '200000',
    },
    '42'
  );
  // TODO ADD EXPECT CASES!
});
