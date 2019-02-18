import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';
import { formInputs } from './fieldSetup';

const setup = (form, handleSubmit, value) => {
  const { getByLabelText, getByTestId, ...rest } = render(
    <Form {...form} onSubmit={handleSubmit} />
  );

  const field = form.fields[0];
  let input;
  if (field.type === 'radio' || field.type === 'checkbox') {
    input = getByLabelText(field.options[0].label);
    fireEvent.click(input);
  } else {
    input = getByLabelText(field.label);
    fireEvent.change(input, {
      target: { value: value },
    });
  }

  const submit = getByTestId(`submit-${form.id}`);
  fireEvent.click(submit);

  return { ...rest };
};

formInputs.map(({ valid: validEntry, invalid: invalidEntry = [], form }) => {
  const { name, type, validator, mask = null } = form.fields[0];

  const validatorDescription =
    validator === 'mask' ? `${mask} mask` : validator;
  describe(`For an input of type ${type} and ${validatorDescription} validator`, async () => {
    const validEntries = Array.isArray(validEntry) ? validEntry : [validEntry];
    validEntries.map(valid => {
      describe(`with valid input of ${valid.entry}`, async () => {
        it(`it's expected value of ${valid.expect ||
          valid.entry} are in submit payload`, async () => {
          const handleSubmit = jest.fn();

          setup(form, handleSubmit, valid.entry);

          await wait(() => {
            expect(handleSubmit).toHaveBeenCalledWith(
              { [name]: valid.expect || valid.entry },
              expect.anything(),
              expect.anything()
            );
          });
        });
      });
    });

    const invalidEntries = Array.isArray(invalidEntry)
      ? invalidEntry
      : [invalidEntry];

    invalidEntries.map(invalid => {
      describe(`with invalid input of ${invalid.entry}`, async () => {
        it(`the submit handler is not called`, async () => {
          const handleSubmit = jest.fn();

          setup(form, handleSubmit, invalid.entry);

          await wait(() => {
            expect(handleSubmit).not.toHaveBeenCalled();
          });
        });

        it(`an error message is shown`, async () => {
          const { queryAllByTestId } = setup(form, () => {}, invalid.entry);

          const errorContainers = queryAllByTestId('fieldError');
          await wait(() => {
            expect(errorContainers[0]).toHaveTextContent(invalid.expect);
          });
        });
      });
    });
  });
});
