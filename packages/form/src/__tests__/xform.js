import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Xform } from '../index';

describe('xform', () => {
  it('allows automatic submissions', async () => {
    const mockSubmit = jest.fn();
    const mockFieldGroupSubmit = jest.fn();

    const simple = {
      onSubmit: async values => console.log('gottt it', values),
      options: {
        autoComplete: true,
      },
      form: {
        onSubmit: mockFieldGroupSubmit,
        fields: [
          {
            label: 'Do you have solar',
            config: {
              machine: 'radio',
              component: 'panelRadio',
              validator: 'requiredRadio',
            },
            hint: 'Select for some reason',
            name: 'solar',
            value: '',
            type: 'radio',
            options: [
              { label: 'SOLAR', value: 'solar', icon: 'electricity' },
              { label: 'NON-SOLAR', value: 'nonsolar', icon: 'electricity' },
            ],
          },
        ],
        nextFn: async () => ({
          fields: [
            {
              label: 'Choose your fuel type',
              config: {
                machine: 'radio',
                component: 'panelRadio',
                validator: 'requiredRadio',
              },
              hint: 'Select for some reason',
              name: 'fuel',
              value: '',
              type: 'radio',
              options: [
                { label: 'ELECTRICITY', value: 'e', icon: 'electricity' },
                { label: 'GAS & ELEC', value: 'eg', icon: 'electricity' },
              ],
            },
          ],
          next: {
            fields: [
              {
                label: 'Enter your email',
                config: {
                  machine: 'text',
                  validator: 'email',
                },
                name: 'email',
                value: '',
                type: 'text',
              },
            ],
            next: {
              fields: [
                {
                  label: 'What is your household size',
                  config: {
                    machine: 'radio',
                    component: 'panelRadio',
                    validator: 'requiredRadio',
                  },
                  hint: 'Select for some reason',
                  name: 'household',
                  value: '',
                  type: 'radio',
                  options: [
                    // { label: 'SMALL', value: 'small', icon: 'electricity' },
                    { label: 'MEDIUM', value: 'medium', icon: 'electricity' },
                  ],
                },
              ],
            },
          },
        }),
      },
    };
    const util = render(
      <>
        <Xform {...simple} onSubmit={mockSubmit} />
        <div onClick={() => console.log('im focused')}>Click away</div>
      </>
    );
    // util.debug();

    await fireEvent.click(util.getByText('SOLAR'));

    await wait(async () => {
      expect(util.getByText('Choose your fuel type'));
      await fireEvent.click(util.getByText('ELECTRICITY'));
      await wait(async () => {
        const emailInput = await util.getByLabelText('Enter your email');
        await emailInput.focus();
        await fireEvent.change(emailInput, {
          target: { value: 'user@example.com' },
        });
        await emailInput.blur();
        await wait(
          async () => {
            expect(mockFieldGroupSubmit).toHaveBeenCalled();
            expect(mockSubmit).toHaveBeenCalled();
            // recall the form
            await fireEvent.click(util.getByText('GAS & ELEC'));
          },
          { timeout: 5000 }
        );
      });
    });
  });
  it('handles error messages', async () => {
    // const mockSubmit = async () => console.log('submitted');
    const mockSubmit = jest.fn();
    const mockFieldGroupSubmit = jest.fn();

    const simple = {
      onSubmit: async values => console.log('gottt it', values),
      options: {
        autoComplete: true,
      },
      form: {
        onSubmit: mockFieldGroupSubmit,
        fields: [
          {
            label: 'Enter your email',
            config: {
              machine: 'text',
              validator: 'email',
            },
            name: 'email',
            value: '',
            type: 'text',
          },
        ],
      },
    };
    const util = render(
      <>
        <Xform {...simple} onSubmit={mockSubmit} />
        <div onClick={() => console.log('im focused')}>Click away</div>
      </>
    );

    const emailInput = await util.getByLabelText('Enter your email');
    await emailInput.focus();
    await fireEvent.change(emailInput, {
      target: { value: 'user@example' },
    });
    await emailInput.blur();
    await wait(
      async () => {
        expect(util.getByText('Invalid email address'));
      },
      { timeout: 5000 }
    );
  });
});
