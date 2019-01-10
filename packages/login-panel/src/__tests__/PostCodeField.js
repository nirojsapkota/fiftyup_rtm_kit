import React from 'react';
// eslint-disable-next-line import/named
import {
  render,
  // eslint-disable-next-line import/named
  fireEvent,
  // eslint-disable-next-line import/named
  wait,
  // eslint-disable-next-line import/named
  cleanup,
} from '../../../bootstrap/setup/testSetup';
import PostCodeField from '../PostCodeField';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<PostCodeField />', () => {
  it('props getAutoCompletePostcode was fired when input change', async () => {
    const form = {
      setFieldValue: jest.fn(),
    };

    const field = {
      name: 'dropdowninput',
      placeholder: 'dropdowninput',
    };

    const getAutoCompletePostcode = jest.fn();

    const Input = props => <input {...props} />;
    const { getByPlaceholderText } = render(
      <React.Fragment>
        <PostCodeField
          inputComponent={Input}
          options={[{ value: '5000, ADELAIDE', label: '5000, ADELAIDE' }]}
          form={form}
          field={field}
          getAutoCompletePostcode={getAutoCompletePostcode}
        />
      </React.Fragment>
    );

    const dropdowninput = getByPlaceholderText('dropdowninput');
    fireEvent.change(dropdowninput, {
      target: { value: '5000' },
    });

    await wait(() => {
      expect(form.setFieldValue).toBeCalled();
      expect(getAutoCompletePostcode).toBeCalled();
    });
  });
});
