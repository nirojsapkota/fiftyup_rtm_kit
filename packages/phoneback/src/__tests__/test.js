import React from 'react';
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { PhonebackBox, Phoneback } from '../index';
import Sample from '../../sample';

const setup = phonebackProps => {
  const rendered = render(<PhonebackBox {...phonebackProps} />);
  const callbackButton = rendered
    .getByText(/request a callback/i)
    .closest('button');
  fireEvent.click(callbackButton);

  // when phoneback has been submited, will show thankyou page only
  if (!phonebackProps.isPhonebacked) {
    const firstNameField = rendered.getByLabelText(/First Name:/i);
    const lastNameField = rendered.getByLabelText(/Last Name/i);
    const phoneNumberField = rendered.getByLabelText(/Phone Number:/i);

    fireEvent.change(firstNameField, {
      target: { value: 'Tony' },
    });
    fireEvent.change(lastNameField, {
      target: { value: 'Toe' },
    });
    fireEvent.change(phoneNumberField, {
      target: { value: '0422058679' },
    });

    const formSubmitButton = rendered
      .getByText(Sample.submitText)
      .closest('button');
    fireEvent.click(formSubmitButton);
  }

  return rendered;
};

describe('<Phoneback />', () => {
  const { form, ...rest } = Sample;

  describe('with a valid callback handler', () => {
    it('calls the onSubmit and onSuccess handlers', async () => {
      const onSubmit = jest.fn(async fields => fields);
      const onSuccess = jest.fn(async () => {});
      const formProps = {
        ...form,
        onSubmit,
        onSuccess,
      };

      const { getByText } = setup({
        form: formProps,
        ...rest,
      });

      await wait(async () => {
        expect(
          getByText('Thank you for requesting a call back.')
        ).toBeInTheDocument();
      });

      expect(onSubmit).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  describe('with an invalid callback handler', () => {
    it('shows an error', async () => {
      const onSubmit = jest.fn(async () => {});
      const onSuccess = jest.fn(async () => {});
      const formProps = { ...form, onSubmit, onSuccess };

      const { getByText } = setup({
        form: formProps,
        ...rest,
        isPhonebacked: false,
      });

      await wait(async () => {
        expect(onSubmit).toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();
        await wait(() => {
          expect(getByText(/something went wrong/i)).toBeInTheDocument();
        });
      });
    });
  });

  describe('should thankyou page', () => {
    it('when isPhonebacked true', async () => {
      const onSubmit = jest.fn(async fields => fields);
      const onSuccess = jest.fn(async () => {});
      const formProps = {
        ...form,
        onSubmit,
        onSuccess,
      };
      const { getByText } = setup({
        form: formProps,
        ...rest,
        isPhonebacked: true,
      });

      await wait(() => {
        expect(
          getByText('Thank you for requesting a call back.')
        ).toBeInTheDocument();
      });
    });

    it('when form has been summited', async () => {
      const onSubmit = jest.fn(async fields => fields);
      const onSuccess = jest.fn(async () => {});
      const formProps = {
        ...form,
        onSubmit,
        onSuccess,
      };
      const { getByText } = setup({
        form: formProps,
        ...rest,
      });

      const btnsubmit = getByText(Sample.submitText).closest('button');
      fireEvent.click(btnsubmit);

      await wait(() => {
        expect(
          getByText('Thank you for requesting a call back.')
        ).toBeInTheDocument();
      });
    });
  });

  describe('With renderTriger as a component', () => {
    it('Should display element from trigger', async () => {
      const onSubmit = jest.fn(async fields => {
        return fields;
      });
      const onSuccess = jest.fn(async () => {});
      const renderTrigger = open => (
        <a onClick={open}>
          <h2>Click to display phone back</h2>
        </a>
      );
      const formProps = {
        ...form,
        onSubmit,
        onSuccess,
      };

      const { getByText } = render(
        <Phoneback form={formProps} {...rest} renderTrigger={renderTrigger} />
      );
      const submitLink = getByText(/Click to display phone back/i);
      expect(submitLink).toBeInTheDocument();
      fireEvent.click(submitLink.closest('a'));
      await wait(() => {
        expect(getByText(Sample.header)).toBeInTheDocument();
      });
    });
  });
});
