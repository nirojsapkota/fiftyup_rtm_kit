import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';

describe(`Month Picker `, () => {
  it(`Are months being rendered and clickable, and value will be sumbitted`, async () => {
    const handleSubmit = jest.fn(res => res[0].value);
    const {  getByValue, getByText, container, getByTestId, toHaveBeenCalledWith} = await render(
      <Form
        id="test"
        onSubmit={handleSubmit}
        fields={[
          {
            "label": "My home insurance renewal month is",
            "name": "renewal_month",
            "type": "text",
            config: {
              "component": "monthButtonGroup",
              "validator": "monthButtonGroup",
            },
            "useShortMonthName": false,
            "additionalChoices": [
              {
                "label": 'I dont know',
                "value": 'dont-know'
              },
              {
                "label": 'I dont currently have insurance',
                "value": 'dont-have'
            }]

          }
        ]}
      />
    );   
    
    const septemberButton = getByText('September');
    fireEvent.click(septemberButton);

    const submit = getByTestId(`submit-test`);
    fireEvent.click(submit);


    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledWith([{"additionalChoices": [{"label": "I dont know", "value": "dont-know"}, {"label": "I dont currently have insurance", "value": "dont-have"}], "config": {"component": "monthButtonGroup", "validator": "monthButtonGroup"}, "label": "My home insurance renewal month is", "name": "renewal_month", "type": "text", "useShortMonthName": false, "value": "September"}], {});
    });
  });


  it(`Are additional options being rendered and clickable, and value will be sumbitted`, async () => {
    const handleSubmit = jest.fn(res => res[0].value);
    const {  getByValue, getByText, container, getByTestId, toHaveBeenCalledWith} = await render(
      <Form
        id="test"
        onSubmit={handleSubmit}
        fields={[
          {
            "label": "My home insurance renewal month is",
            "name": "renewal_month",
            "type": "text",
            config: {
              "component": "monthButtonGroup",
              "validator": "monthButtonGroup",
            },
            "useShortMonthName": false,
            "additionalChoices": [
              {
                "label": 'I dont know',
                "value": 'dont-know'
              },
              {
                "label": 'I dont currently have insurance',
                "value": 'dont-have'
            }]

          }
        ]}
      />
    );   
    
    const septemberButton = getByText('I dont know');
    fireEvent.click(septemberButton);

    const submit = getByTestId(`submit-test`);
    fireEvent.click(submit);


    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledWith([{"additionalChoices": [{"label": "I dont know", "value": "dont-know"}, {"label": "I dont currently have insurance", "value": "dont-have"}], "config": {"component": "monthButtonGroup", "validator": "monthButtonGroup"}, "label": "My home insurance renewal month is", "name": "renewal_month", "type": "text", "useShortMonthName": false, "value": "dont-know"}], {});
    });
  });

  it(`Are short months being rendered and clickable, and value will be sumbitted`, async () => {
    const handleSubmit = jest.fn(res => res[0].value);
    const {  getByValue, getByText, container, getByTestId, toHaveBeenCalledWith} = await render(
      <Form
        id="test"
        onSubmit={handleSubmit}
        fields={[
          {
            "label": "My home insurance renewal month is",
            "name": "renewal_month",
            "type": "text",
            config: {
              "component": "monthButtonGroup",
              "validator": "monthButtonGroup",
            },
            "useShortMonthName": true,
            "additionalChoices": [
              {
                "label": 'I dont know',
                "value": 'dont-know'
              },
              {
                "label": 'I dont currently have insurance',
                "value": 'dont-have'
            }]
          }
        ]}
      />
    );   
    
    const septemberButton = getByText('Sep');
    fireEvent.click(septemberButton);

    const submit = getByTestId(`submit-test`);
    fireEvent.click(submit);


    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledWith([{"additionalChoices": [{"label": "I dont know", "value": "dont-know"}, {"label": "I dont currently have insurance", "value": "dont-have"}], "config": {"component": "monthButtonGroup", "validator": "monthButtonGroup"}, "label": "My home insurance renewal month is", "name": "renewal_month", "type": "text", "useShortMonthName": true, "value": "Sep"}], {});
    });
  });

  it(`Are defaultValues being submitted automatically`, async () => {

    const handleSubmit = jest.fn();
    const {  getByValue, getByText, container, getByTestId, toHaveBeenCalledWith} = await render(
      <Form
        id="test"
        onSubmit={handleSubmit}
        fields={[
          {
            "label": "My home insurance renewal month is",
            "name": "renewal_month",
            "type": "text",
            "defaultValue": "January",
            "config": {
              "component": "monthButtonGroup",
              "validator": "monthButtonGroup",
            },
            "useShortMonthName": false,
            "additionalChoices": [
              {
                "label": 'I dont know',
                "value": 'dont-know'
              },
              {
                "label": 'I dont currently have insurance',
                "value": 'dont-have'
            }]

          }
        ]}
      />
    );   

    const januaryButton = getByText('January');
    fireEvent.click(januaryButton);

    const submit = getByTestId(`submit-test`);
    fireEvent.click(submit);


    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledWith([{"additionalChoices": [{"label": "I dont know", "value": "dont-know"}, {"label": "I dont currently have insurance", "value": "dont-have"}], "config": {"component": "monthButtonGroup", "validator": "monthButtonGroup"}, "defaultValue": "January", "label": "My home insurance renewal month is", "name": "renewal_month", "type": "text", "useShortMonthName": false, "value": "January"}], {});
    });
  });

});
