import React from 'react';
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Box } from '@rtm-ui/layout';
import { Small } from '@rtm-ui/typography';
import { Button } from '@rtm-ui/button';
import { Form, FormError } from '../index';
import { getFieldProps } from './fieldSetup';

const mockSuccessResponse = ['2000, BARANGAROO'];
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});
jest
  .spyOn(global, 'fetch')
  .mockImplementation(() => mockFetchPromise)
  .mockImplementation(() => mockFetchPromise);

const form = {
  id: 'test-form',
  fields: [getFieldProps('email'), getFieldProps('postcode')],
};

describe(`<Form />`, () => {
  // TODO RENABLE AND SOLVE
  it(`progressiveReveal doesn't break`, async () => {
    const handleSubmit = jest.fn(() => {
      throw new FormError({
        formError: 'test form error',
        fieldErrors: {},
      });
    });
    const buttonText = 'test button text';
    const buttonTestId = `button-test-id`;
    const { getByTestId, getByLabelText, container } = await render(
      <Form
        onSubmit={handleSubmit}
        progressiveReveal
        {...form}
        renderFooter={({ formError }) => {
          return (
            <React.Fragment>
              <Box>
                <Button data-testid={buttonTestId} type="submit">
                  {buttonText}
                </Button>
              </Box>
              <Box>
                <Small align="left" color="error">
                  {formError}
                </Small>
              </Box>
            </React.Fragment>
          );
        }}
      />
    );

    const submit = await getByTestId(buttonTestId);
    expect(submit.textContent).toEqual(buttonText);

    const emailInput = await getByLabelText(form.fields[0].label);
    await fireEvent.change(emailInput, {
      target: { value: 'user@example.com' },
    });
    const zipCodeInput = await getByLabelText(form.fields[1].label);
    await fireEvent.change(zipCodeInput, {
      target: { value: '5000, Ashfield' },
    });

    await fireEvent.click(submit);

    await wait(async () => {
      expect(handleSubmit).toHaveBeenCalled();
      expect(container).toHaveTextContent('test form error');
    });
  });

  // TODO RENABLE AND SOLVE
  it(`renderFooter is a function`, async () => {
    const handleSubmit = jest.fn(() => {
      throw new FormError({
        formError: 'test form error',
        fieldErrors: {},
      });
    });
    const buttonText = 'test button text';
    const buttonTestId = `button-test-id`;
    const { getByTestId, getByLabelText, container } = await render(
      <Form
        onSubmit={handleSubmit}
        {...form}
        renderFooter={({ formError }) => {
          return (
            <React.Fragment>
              <Box>
                <Button data-testid={buttonTestId} type="submit">
                  {buttonText}
                </Button>
              </Box>
              <Box>
                <Small align="left" color="error">
                  {formError}
                </Small>
              </Box>
            </React.Fragment>
          );
        }}
      />
    );

    const submit = await getByTestId(buttonTestId);
    expect(submit.textContent).toEqual(buttonText);

    const emailInput = await getByLabelText(form.fields[0].label);
    await fireEvent.change(emailInput, {
      target: { value: 'user@example.com' },
    });
    const zipCodeInput = await getByLabelText(form.fields[1].label);
    await fireEvent.change(zipCodeInput, {
      target: { value: '5000, Ashfield' },
    });

    await fireEvent.click(submit);

    await wait(async () => {
      expect(handleSubmit).toHaveBeenCalled();
      expect(container).toHaveTextContent('test form error');
    });
  });

  it(`handle display errors`, async () => {
    const handleSubmit = jest.fn(() => {
      throw new FormError({
        formError: 'test form error',
        fieldErrors: { postcode: 'zipcode not valid' },
      });
    });

    const { getByTestId, getByLabelText, queryAllByTestId } = await render(
      <Form onSubmit={handleSubmit} {...form} />
    );

    const submit = await getByTestId(`submit-${form.id}`);

    const emailInput = await getByLabelText(form.fields[0].label);
    await fireEvent.change(emailInput, {
      target: { value: 'user@example.com' },
    });
    const zipCodeInput = await getByLabelText(form.fields[1].label);
    await fireEvent.change(zipCodeInput, {
      target: { value: '5000, Ashfield' },
    });
    await fireEvent.click(submit);

    const errorContainers = await queryAllByTestId('fieldError');

    await wait(async () => {
      expect(handleSubmit).toHaveBeenCalled();
      expect(errorContainers[1]).toHaveTextContent('zipcode not valid');
    });

    await wait(async () => {
      const item = await getByLabelText('2000, BARANGAROO');
      await fireEvent.click(item);
    });

    await wait(async () => {
      expect(errorContainers[0]).not.toHaveTextContent('zipcode not valid');
    });
  });
});
