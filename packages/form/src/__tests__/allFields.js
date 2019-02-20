import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form, { StepForm, Accordion } from '../index';
import Button from '@rtm-ui/button';
import { Header } from '@rtm-ui/typography';
import { formInputs } from './fieldSetup';
import { FormError } from '../formError';

const fireFieldEvents = (field, value, fireEvent, getByLabelText) => {
  let input;
  if (field.type === 'radio' || field.type === 'checkbox') {
    input = getByLabelText(field.options[0].label);
    fireEvent.click(input);
    fireEvent.click(input);
    fireEvent.click(input);
  } else {
    input = getByLabelText(field.label);
    fireEvent.change(input, {
      target: { value: value },
    });
  }
};

const renderForm = (form, handleSubmit) => {
  return render(<Form onSubmit={handleSubmit} {...form} />);
};

const renderStepForm = (
  form,
  handleSubmit,
  handleStepSubmit,
  handleFinalSubmit
) => {
  const stepInputs = { steps: [form, { ...form, id: '2' }] };
  return render(
    <StepForm
      onEachSuccess={handleStepSubmit}
      onFinalSuccess={handleFinalSubmit}
      {...stepInputs}
      renderForm={formProps => formProps}
    >
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
              return <Form onSubmit={handleSubmit} {...item} />;
            }}
          />
        );
      }}
    </StepForm>
  );
};

const fireSubmitEvent = (fireEvent, formId, getByTestId) => {
  const submit = getByTestId(`submit-${formId}`);
  fireEvent.click(submit);
};

const setup = (
  value,
  form,
  handleSubmit,
  handleStepSubmit,
  handleFinalSubmit,
  asStepForm = false
) => {
  const { getByLabelText, getByTestId, ...rest } = asStepForm
    ? renderStepForm(form, handleSubmit, handleStepSubmit, handleFinalSubmit)
    : renderForm(form, handleSubmit);

  const field = form.fields[0];
  fireFieldEvents(field, value, fireEvent, getByLabelText);
  fireSubmitEvent(fireEvent, form.id, getByTestId);

  return { ...rest };
};

formInputs.map(({ valid: validEntry, invalid: invalidEntry = [], form }) => {
  const { type, validator, mask = null } = form.fields[0];

  const validatorDescription =
    validator === 'mask' ? `${mask} mask` : validator;
  describe(`For an input of type ${type} and ${validatorDescription} validator`, async () => {
    const validEntries = Array.isArray(validEntry) ? validEntry : [validEntry];
    validEntries.map(valid => {
      describe(`with valid input of ${valid.entry}`, async () => {
        describe(`for regular forms`, async () => {
          it(`handles invalid handler responses`, async () => {
            const handleSubmit = jest.fn(fields => {
              return fields;
              return 'invalid format';
            });
            const handleStepSubmit = jest.fn();
            const handleFinalSubmit = jest.fn();

            setup(
              valid.entry,
              form,
              handleSubmit,
              handleStepSubmit,
              handleFinalSubmit,
              false
            );
            await wait(() => {
              expect(handleSubmit).toHaveBeenCalled();
            });
          });
        });

        describe(`for step forms`, async () => {
          it(`handles server errors`, async () => {
            const handleSubmit = jest.fn(fields => {
              throw new FormError({
                formErrors: 'Alert',
                fieldErrors: [{ ...fields[0], error: 'Oh no' }],
              });
            });
            const handleStepSubmit = jest.fn();
            const handleFinalSubmit = jest.fn();

            setup(
              valid.entry,
              form,
              handleSubmit,
              handleStepSubmit,
              handleFinalSubmit,
              true
            );
            await wait(() => {
              expect(handleStepSubmit).not.toHaveBeenCalled();
            });
          });

          it(`it's expected value of ${valid.expect ||
            valid.entry} are in submit payload`, async () => {
            const handleSubmit = jest.fn(fields => {
              return fields;
            });
            const handleStepSubmit = jest.fn();
            const handleFinalSubmit = jest.fn();

            setup(
              valid.entry,
              form,
              handleSubmit,
              handleStepSubmit,
              handleFinalSubmit,
              true
            );
            await wait(() => {
              expect(handleStepSubmit).toHaveBeenCalled();
              // expect(handleFinalSubmit).toHaveBeenCalled();
              expect(handleSubmit).toHaveBeenCalledWith(
                [
                  {
                    ...form.fields[0],
                    value: valid.expect || valid.entry,
                  },
                ],
                expect.anything()
              );
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
        it(`the submit handler is not called`, async () => {
          const handleSubmit = jest.fn();

          setup(invalid.entry, form, handleSubmit);

          await wait(() => {
            expect(handleSubmit).not.toHaveBeenCalled();
          });
        });

        it(`an error message is shown`, async () => {
          const { queryAllByTestId, container, debug } = setup(
            invalid.entry,
            form,
            () => {}
          );

          const errorContainers = queryAllByTestId('fieldError');
          await wait(() => {
            expect(errorContainers[0]).toHaveTextContent(invalid.expect);
          });
        });
      });
    });
  });
});
