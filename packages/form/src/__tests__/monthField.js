import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';

describe(`Month Picker `, () => {
  it(`can select the month picker when valid`, async () => {
    const handleSubmit = jest.fn();
    const {
      getByLabelText,
      getAllByDisplayValue,
      container,
      getByTestId,
    } = await render(
      <Form
        id="test"
        onSubmit={handleSubmit}
        fields={[
          {
            label: 'When does your current contract end?',
            name: 'month',
            type: 'text',
            config: {
              component: 'month',
              validator: '',
              showYear: true,
            },
          },
        ]}
      />
    );
    const itemInput = getAllByDisplayValue('')[0];
    fireEvent.change(itemInput, {
      target: { value: 'Sep, 2019' },
    });

    const submit = getByTestId(`submit-test`);
    fireEvent.click(submit);
    await wait(() => {
      expect(handleSubmit).toHaveBeenCalled();
      fireEvent.focus(itemInput);
    });

    const leftIcon = container.querySelector(`div.icon`);
    fireEvent.click(leftIcon);
    const icon1 = container.querySelector(`svg.view-back`);
    const icon2 = container.querySelector(`svg.view-forward`);
    expect(icon1).not.toBeDisabled();
    expect(icon2).not.toBeDisabled();
    fireEvent.click(icon1);
    fireEvent.click(icon2);

    const iconSelected = container.querySelector(`div.selected`);
    fireEvent.click(iconSelected);

    const input = container.querySelector('input');
    fireEvent.keyDown(input);
  });

  it(`preselects default value when available`, async () => {
    const handleSubmit = jest.fn();
    const {
      getByLabelText,
      getByDisplayValue,
      container,
      getByTestId,
    } = await render(
      <Form
        id="test"
        onSubmit={handleSubmit}
        fields={[
          {
            label: 'When does your current contract end?',
            name: 'month',
            type: 'text',
            defaultValue: 'Feb, 2020',
            config: {
              component: 'month',
              validator: '',
              showYear: true,
            },
          },
        ]}
      />
    );
    const itemInput = getByDisplayValue('Feb, 2020');
    fireEvent.change(itemInput, {
      target: { value: 'Sep, 2019' },
    });

    const submit = getByTestId(`submit-test`);
    fireEvent.click(submit);
    await wait(() => {
      expect(handleSubmit).toHaveBeenCalled();
      fireEvent.focus(itemInput);
    });

    const leftIcon = container.querySelector(`div.icon`);
    fireEvent.click(leftIcon);
    const icon1 = container.querySelector(`svg.view-back`);
    const icon2 = container.querySelector(`svg.view-forward`);
    expect(icon1).not.toBeDisabled();
    expect(icon2).not.toBeDisabled();
    fireEvent.click(icon1);
    fireEvent.click(icon2);

    const iconSelected = container.querySelector(`.selected`);
    fireEvent.click(iconSelected);

    const input = container.querySelector('input');
    fireEvent.keyDown(input);
  });

  it(`doesnt show date when date is false`, async () => {
    const handleSubmit = jest.fn();
    const {
      getByLabelText,
      getByDisplayValue,
      container,
      getByTestId,
    } = await render(
      <Form
        id="test"
        onSubmit={handleSubmit}
        fields={[
          {
            label: 'When does your current contract end?',
            name: 'month',
            type: 'text',
            defaultValue: 'Sep',
            config: {
              component: 'month',
              validator: '',
              showYear: false,
            },
          },
        ]}
      />
    );
    const itemInput = getByDisplayValue('Sep');
    fireEvent.change(itemInput, {
      target: { value: 'Sep' },
    });

    const submit = getByTestId(`submit-test`);
    fireEvent.click(submit);
    await wait(() => {
      expect(handleSubmit).toHaveBeenCalled();
      fireEvent.focus(itemInput);
    });

    const iconSelected = container.querySelector(`.selected`);
    console.log('ICON SELECTED: ', iconSelected);
    fireEvent.click(iconSelected);

    const input = container.querySelector('input');
    fireEvent.keyDown(input);
  });
});
