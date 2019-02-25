import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form, { FormError } from '../index';
import { Box } from '@rtm-ui/layout';
import { Small } from '@rtm-ui/typography';
import Button from '@rtm-ui/button';
import { getFieldProps } from './fieldSetup';

const form = {
  id: 'test-form',
  fields: [getFieldProps('email')],
};

describe(`<Form />`, async () => {
  it(`renderFooter is a function`, async () => {
    const handleSubmit = jest.fn(() => {
      throw new FormError({
        formError: 'test form error',
      });
    });
    const buttonText = 'test button text';
    const buttonTestId = `button-test-id`;
    const { getByTestId, getByLabelText, container } = await render(
      <Form
        onSubmit={handleSubmit}
        {...form}
        renderFooter={formError => {
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

    const itemInput = await getByLabelText(form.fields[0].label);
    await fireEvent.change(itemInput, {
      target: { value: 'user@example.com' },
    });

    await fireEvent.click(submit);

    await wait(async () => {
      expect(handleSubmit).toHaveBeenCalled();
      expect(container).toHaveTextContent('test form error');
    });
  });
});
