import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form, { StepForm, Accordion } from '../index';
import Button from '@rtm-ui/button';
import { Header } from '@rtm-ui/typography';
import { formInputs } from './fieldSetup';

const mockSuccessResponse = ['2000, BARANGAROO'];
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});
jest
  .spyOn(global, 'fetch')
  .mockImplementation(() => mockFetchPromise)
  .mockImplementation(() => mockFetchPromise);

const fireSubmitEvent = (fireEvent, formId, { getByTestId }) => {
  const submit = getByTestId(`submit-${formId}`);
  fireEvent.click(submit);
};

const fireFieldEvents = async (field, value, util) => {
  const { queryByLabelText, getByLabelText } = util;
  let input;

  if (field.type === 'radio' || field.type === 'checkbox') {
    input = await getByLabelText(field.options[0].label);
    // Toggle on and off to ensure we're handling properly
    await fireEvent.click(input);
    await fireEvent.click(input);
    await fireEvent.click(input);
  } else if (field.config.component === 'autocomplete') {
    input = await getByLabelText(field.label);
    await fireEvent.change(input, {
      target: { value: value },
    });
    await wait(async () => {
      // Wait until popup arrives
      const item = await getByLabelText('2000, BARANGAROO');
      // Click away to ensure popup is gone
      await fireEvent.mouseDown(util.getByText(field.label));
      await fireEvent.change(input, {
        target: { value: '' },
      });
      await expect(item).not.toBeInTheDocument();
      // Retype values
      input = await getByLabelText(field.label);
      await fireEvent.change(input, {
        target: { value: value },
      });
      // Check popup re-display when focus to input
      await fireEvent.mouseDown(util.getByText(field.label));
      await expect(item).not.toBeInTheDocument();
      await fireEvent.focus(input);
      await wait(async () => {
        const item = await getByLabelText('2000, BARANGAROO');
        await expect(item).toBeInTheDocument();
      });

      await wait(async () => {
        const item = await getByLabelText('2000, BARANGAROO');
        await fireEvent.click(item);
      });
    });
  } else {
    input = await getByLabelText(field.label);
    await fireEvent.change(input, {
      target: { value: value },
    });
  }
  return util;
};

const renderForm = async (form, handleSubmit) => {
  return render(<Form onSubmit={handleSubmit} {...form} />);
};

const renderStepForm = async stepForm => {
  return render(
    <StepForm {...stepForm} renderForm={formProps => formProps}>
      {({ activeFormId, forms }) => {
        return (
          <Accordion
            items={forms}
            activeItem={activeFormId}
            setOpenItems={(openItems, openingItemId) => [
              openItems,
              openingItemId,
            ]}
            itemHeader={({ item, onClick }) => (
              <Button asWrapper onClick={onClick}>
                <Header tag="h6">{item.id}</Header>
              </Button>
            )}
            itemBody={item => {
              return <Form {...item} />;
            }}
          />
        );
      }}
    </StepForm>
  );
};

const setup = async (form, asStepForm = false) => {
  const util = asStepForm ? await renderStepForm(form) : await renderForm(form);

  return util;
};

const fireEvents = async (value, form, util) => {
  const field = form.fields[0];
  await fireFieldEvents(field, value, util);
  await wait(async () => {
    await fireSubmitEvent(fireEvent, form.id, util);
  });

  return util;
};

formInputs.map(({ valid: validEntry, invalid: invalidEntry = [], form }) => {
  const {
    type,
    config: { validator, mask = null },
  } = form.fields[0];

  const validatorDescription =
    validator === 'mask' ? `${mask} mask` : validator;

  describe(`For an input of type ${type} and ${validatorDescription} validator`, async () => {
    const validEntries = Array.isArray(validEntry) ? validEntry : [validEntry];
    validEntries.map(valid => {
      describe(`with valid input of ${valid.entry}`, async () => {
        describe(`for regular forms`, async () => {
          const submitValidForm = async form => {
            const util = await setup(form);
            await fireEvents(valid.entry, form, util);

            return util;
          };

          it(`calls onSubmit and onSuccess on valid forms`, async () => {
            const handleSubmit = jest.fn(value => value);
            const handleSuccess = jest.fn();

            await submitValidForm({
              ...form,
              onSubmit: handleSubmit,
              onSuccess: handleSuccess,
            });

            await wait(async () => {
              await expect(handleSubmit).toHaveBeenCalledWith(
                [{ ...form.fields[0], value: valid.expect || valid.entry }],
                {}
              );
              await expect(handleSuccess).toHaveBeenCalled();
            });
          });

          it(`absorbs invalid handler responses and doesn't call the onSuccess callback`, async () => {
            const handleSubmit = jest.fn(() => 'Some invalid thing');
            const handleSuccess = jest.fn();

            await submitValidForm({
              ...form,
              onSubmit: handleSubmit,
              onSuccess: handleSuccess,
            });

            await wait(async () => {
              await expect(handleSubmit).toHaveBeenCalled();
              await expect(handleSuccess).not.toHaveBeenCalled();
            });
          });
        });
      });
    });
    const invalidEntries = Array.isArray(invalidEntry)
      ? invalidEntry
      : [invalidEntry];
    invalidEntries.map(invalid => {
      describe(`with invalid input of ${invalid.entry}`, async () => {
        describe(`for regular forms`, async () => {
          const submitValidForm = async form => {
            const util = await setup(form);
            await fireEvents(invalid.entry, form, util);

            return util;
          };

          it(`does not call submit and shows an error`, async () => {
            const handleSubmit = jest.fn(value => value);
            const handleSuccess = jest.fn();

            const form2 = {
              ...form,
              onSubmit: handleSubmit,
              onSuccess: handleSuccess,
            };

            const util = await setup(form2);
            await fireEvents(invalid.entry, form2, util);
            const errorContainers = await util.queryAllByTestId('fieldError');

            await wait(async () => {
              expect(errorContainers[0]).toHaveTextContent(invalid.expect);
              await expect(handleSubmit).not.toHaveBeenCalled();
            });
          });
        });
      });
    });
  });
});

const firstForm = [formInputs[0]];

firstForm.map(({ valid: validEntry, invalid: invalidEntry = [], form }) => {
  const {
    type,
    config: { validator, mask = null },
  } = form.fields[0];

  const validatorDescription =
    validator === 'mask' ? `${mask} mask` : validator;

  describe(`For an input of type ${type} and ${validatorDescription} validator`, async () => {
    const validEntries = Array.isArray(validEntry) ? validEntry : [validEntry];
    validEntries.map(valid => {
      describe(`with valid input of ${valid.entry}`, async () => {
        describe(`for step forms`, async () => {
          it(`calls the success handlers`, async () => {
            const handleSubmit = jest.fn(fields => fields);
            const handleEachSuccess = jest.fn();
            const handleFinalSuccess = jest.fn();

            const form2 = {
              ...form,
              id: `${form.id}-2`,
              fields: [
                {
                  ...form.fields[0],
                  label: `${form.fields[0].label}-2`,
                  name: `${form.fields[0].name}-2`,
                },
              ],
              onSubmit: handleSubmit,
            };

            const stepForm = {
              onEachSuccess: handleEachSuccess,
              onFinalSuccess: handleFinalSuccess,
              steps: [
                {
                  ...form,
                  passThru: true,
                  fields: [
                    {
                      ...form.fields[0],
                      initialValue: valid.expect,
                    },
                  ],
                  onSubmit: values => values,
                },
                form2,
              ],
            };

            const util = await setup(stepForm, true);
            await fireEvents(valid.entry, form, util);

            await wait(async () => {
              // await expect(handleSubmit).toHaveBeenCalled();
              await expect(handleEachSuccess).toHaveBeenCalled();
              await wait(async () => {
                await fireEvents(valid.entry, form2, util);
                await wait(async () => {
                  await expect(handleFinalSuccess).toHaveBeenCalled();
                });
              });
            });
          });
        });
      });
    });
  });
});
