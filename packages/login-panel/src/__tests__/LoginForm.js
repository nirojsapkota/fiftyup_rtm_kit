import React from 'react';
import axios from 'axios';
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
import LoginForm from '../LoginForm';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const mockDefaultAxios = () => {
  axios.get.mockResolvedValueOnce({ data: [] });
  axios.post.mockResolvedValueOnce({ data: { redirectPath: '/' } });
};

describe('<LoginForm />', () => {
  it('matches expected output', async () => {
    // set Up
    mockDefaultAxios();

    // initial hidden fields
    const hiddenFields = {
      jump_path: 'test_value',
    };

    const { getByText, getByPlaceholderText, getByValue } = render(
      <LoginForm hiddenFields={hiddenFields} />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    // expect hidden fields
    const hiddenJumpPath = getByValue('test_value');
    expect(hiddenJumpPath.name).toEqual('jump_path');

    const submit = getByText('See the offer');
    fireEvent.click(submit);

    // expect event was fired
    await wait(() => {
      expect(submit).toBeDisabled();
    });
  });

  it('matches expected output with handleSuccess func prop', async () => {
    // set Up
    mockDefaultAxios();

    const handleSuccess = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <LoginForm handleSuccess={handleSuccess} />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText('See the offer');
    fireEvent.click(submit);

    // expect props event was fired
    await wait(() => {
      expect(handleSuccess).toHaveBeenCalled();
    });
  });

  // FIXME: html5 validation doesn't work with jest
  xit("doesn't not allow empty email", async () => {
    // set Up
    mockDefaultAxios();

    const { getByText, getByPlaceholderText } = render(<LoginForm />);

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: '' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText('See the offer');
    fireEvent.click(submit);

    await wait(() => {
      expect(submit).not.toBeDisabled();
    });
  });

  // FIXME: html5 validation doesn't work with jest
  xit("doesn't not allow empty postcode", async () => {
    // set Up
    mockDefaultAxios();

    const { getByText, getByPlaceholderText } = render(<LoginForm />);

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '' },
    });

    const submit = getByText('See the offer');
    fireEvent.click(submit);

    await wait(() => {
      expect(submit).not.toBeDisabled();
    });
  });

  // FIXME: html5 validation doesn't work with jest
  xit("doesn't not allow invalid email", async () => {
    // set Up
    mockDefaultAxios();

    const { getByText, getByPlaceholderText } = render(<LoginForm />);

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText('See the offer');
    fireEvent.click(submit);

    await wait(() => {
      expect(submit).not.toBeDisabled();
    });
  });

  it('Get internal errors from server when submit login', async () => {
    // setup
    axios.get.mockResolvedValueOnce({ data: [] });

    axios.post.mockRejectedValue({
      response: {
        status: 500,
        data: { errors: ['Random error'] },
      },
    });

    const { getByText, getByPlaceholderText, container } = render(
      <LoginForm />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test@gmail.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText('See the offer');
    fireEvent.click(submit);

    await wait(() => {
      expect(submit).not.toBeDisabled();
      expect(container).toHaveTextContent('Login was unsuccessful.');
    });
  });

  it('Get unauthorize errors from server when submit login', async () => {
    // setup
    axios.get.mockResolvedValueOnce({ data: [] });

    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { errors: ['Email is not valid'] },
      },
    });

    const { getByText, getByPlaceholderText, container } = render(
      <LoginForm />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test@gmail.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText('See the offer');
    fireEvent.click(submit);

    await wait(() => {
      expect(submit).not.toBeDisabled();
      expect(container).toHaveTextContent('Email is not valid');
    });
  });

  it('Auto complete not run when input postcode length < 1', async () => {
    // setup
    axios.get.mockResolvedValue({
      data: ['5000, ADELAIDE', '5000, ADELAIDE BC'],
    });

    const { getByPlaceholderText, container } = render(<LoginForm />);
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '5' },
    });

    fireEvent.click(postcode);

    await wait(() => {
      expect(container).not.toHaveTextContent('5000, ADELAIDE');
    });
  });

  it('Auto complete run when input postcode', async () => {
    // setup
    axios.get.mockResolvedValue({
      data: ['5000, ADELAIDE', '5000, ADELAIDE BC', '5000, CITY WEST CAMPUS'],
    });

    const { getByPlaceholderText, container } = render(<LoginForm />);
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '5000' },
    });

    fireEvent.click(postcode);

    await wait(() => {
      expect(container).toHaveTextContent('5000, ADELAIDE');
      expect(container).toHaveTextContent('5000, ADELAIDE BC');
      expect(container).toHaveTextContent('5000, CITY WEST CAMPUS');
    });
  });

  it('Input change when select value in autocomplete', async () => {
    // setup
    axios.get.mockResolvedValue({
      data: ['5000, ADELAIDE', '5000, ADELAIDE BC'],
    });

    const { getByText, getByPlaceholderText, container } = render(
      <LoginForm />
    );
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '5000' },
    });

    fireEvent.click(postcode);

    await wait(() => {
      expect(container).toHaveTextContent('5000, ADELAIDE');
      const selected = getByText('5000, ADELAIDE');
      fireEvent.click(selected);

      expect(postcode.value).toEqual('5000, ADELAIDE');
    });
  });

  it('Error when get value in autocomplete', async () => {
    // setup
    axios.get.mockRejectedValue({
      response: {
        status: 500,
        data: { errors: ['error'] },
      },
    });

    const { getByPlaceholderText, container } = render(<LoginForm />);
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '5000' },
    });

    fireEvent.click(postcode);

    await wait(() => {
      expect(container).not.toHaveTextContent('5000, ADELAIDE');
    });
  });

  it(`Require gdpr agreement checkbox when submmit login`, async () => {
    const GdprProps = {
      showGdprAgreement: true,
    };
    const { container } = render(<LoginForm {...GdprProps} />);
    const chkbAgreement = container.querySelector(`[id="ckb_agreement"]`);
    expect(chkbAgreement).toBeInTheDocument();
  });

  it('Hidden gdpr agreement checkbox in layout', async () => {
    const GdprProps = {
      showGdprAgreement: false,
    };
    const { container } = render(<LoginForm {...GdprProps} />);
    const chkbAgreement = container.querySelector(`[id="ckb_agreement"]`);
    expect(chkbAgreement).not.toBeInTheDocument();
  });
});
