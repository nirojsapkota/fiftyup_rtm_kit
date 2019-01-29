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
import DropdownSelect from '../SelectField/DropdownSelect';
import Popover from '../SelectField/popover';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<DropdownSelect />', () => {
  it('input change when select dropdown value', async () => {
    const form = {
      setFieldValue: jest.fn(),
    };
    const field = {
      name: 'dropdowninput',
      placeholder: 'dropdowninput',
    };

    const Input = props => <input {...props} />;
    const { getByText, getByPlaceholderText, container } = render(
      <React.Fragment>
        <DropdownSelect
          inputComponent={Input}
          options={[{ value: '5000, ADELAIDE', label: '5000, ADELAIDE' }]}
          form={form}
          field={field}
        />
      </React.Fragment>
    );
    const dropdowninput = getByPlaceholderText('dropdowninput');
    fireEvent.click(dropdowninput);

    await wait(() => {
      expect(container).toHaveTextContent('5000, ADELAIDE');
      const selected = getByText('5000, ADELAIDE');
      fireEvent.click(selected);
      expect(form.setFieldValue).toBeCalled();
    });
  });

  it('Popup is open by props', async () => {
    const form = {
      setFieldValue: jest.fn(),
    };
    const field = {
      name: 'dropdowninput',
      placeholder: 'dropdowninput',
    };

    const Input = props => <input {...props} />;
    const { container } = render(
      <React.Fragment>
        <DropdownSelect
          inputComponent={Input}
          options={[{ value: '5000, ADELAIDE', label: '5000, ADELAIDE' }]}
          form={form}
          field={field}
          popoverProps={{ isOpen: true }}
        />
      </React.Fragment>
    );

    await wait(() => {
      expect(container).toHaveTextContent('5000, ADELAIDE');
    });
  });

  it('Popup is open by props and fire and event on outside el', async () => {
    const form = {
      setFieldValue: jest.fn(),
    };
    const field = {
      name: 'dropdowninput',
      placeholder: 'dropdowninput',
    };

    const Input = props => <input {...props} />;
    const { container, getByPlaceholderText } = render(
      <React.Fragment>
        <Input name="test" placeholder="test" />
        <DropdownSelect
          inputComponent={Input}
          options={[
            { value: '5000, ADELAIDE', label: '5000, ADELAIDE' },
            { value: '5000, ADELAIDE BC', label: '5000, ADELAIDE BC' },
          ]}
          form={form}
          field={field}
          popoverProps={{ isOpen: true }}
        />
      </React.Fragment>
    );

    expect(container).toHaveTextContent('5000, ADELAIDE');

    const testEl = getByPlaceholderText('test');
    fireEvent.mouseDown(testEl);
    fireEvent.mouseUp(testEl);

    // expect popup will be closed
    await wait(() => {
      expect(container).not.toHaveTextContent('5000, ADELAIDE');
    });
  });
});

describe('<Popover />', () => {
  it('input anchor is not a func', async () => {
    const { getByPlaceholderText } = render(
      <React.Fragment>
        <Popover
          display="block"
          anchor={<input type="text" name="testEl" placeholder="testHolder" />}
        />
      </React.Fragment>
    );

    const el = getByPlaceholderText('testHolder');
    expect(el).toBeInTheDocument();
  });

  it('children is not a func', async () => {
    const { getByPlaceholderText } = render(
      <React.Fragment>
        <Popover display="block" {...{ isOpen: true }}>
          <input type="text" name="testEl" placeholder="testHolder" />
        </Popover>
      </React.Fragment>
    );

    const el = getByPlaceholderText('testHolder');
    expect(el).toBeInTheDocument();
  });

  it('popover does not show when options props blank', async () => {
    const form = {
      setFieldValue: jest.fn(),
    };
    const field = {
      name: 'dropdowninput',
      placeholder: 'dropdowninput',
    };

    const Input = props => <input {...props} />;
    const { container, getByPlaceholderText } = render(
      <React.Fragment>
        <DropdownSelect
          inputComponent={Input}
          options={[]}
          form={form}
          field={field}
        />
      </React.Fragment>
    );

    const el = getByPlaceholderText('dropdowninput');
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {
      target: { value: '3000' },
    });

    await wait(() => {
      expect(container).not.toHaveTextContent('3000');
    });
  });
});
